'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma'
import { EnrollmentStatus } from '@prisma/client';

interface Interval {
    start: number;
    end: number;
}

interface Schedule {
    m: Interval[];
    t: Interval[];
    w: Interval[];
    r: Interval[];
    f: Interval[];
}

export interface ValidationResponse {
    status: string;
    notes: string[];
}

function getDay(week: Schedule, day: string) {
    switch (day) {
        case "m": return week.m;
        case "t": return week.t;
        case "w": return week.w;
        case "r": return week.r;
        case "f": return week.f;
        default: return null
    }
}

export async function validateCart(enroll: boolean = false) {
    const session = await auth();

    let userId: string | null;
    if (!session || !session.user || !session.user.id) {
        userId = null;
        throw new Error('You must be logged in to validate a cart')
    } else {
        userId = session.user.id;
    }

    let cart;
    if (!userId) {
        cart = null;
        throw new Error('No user to get cart for')
    } else {
        cart = await prisma.cart.findFirst({
            where: {
                userId,
            },
            include: {
                courseSections: {
                    include: {
                        course: {
                            include: {
                                prerequisites: true,
                            }
                        },
                        timeSlot: true,
                        classlist: true,
                    }
                }
            }
        })
    }

    const id = userId;
    const fullUser = await prisma.user.findFirst({
        where: {
            id
        },
        include: {
            completedCourses: true
        }
    })

    const schedule: Schedule = {
        m: [],
        t: [],
        w: [],
        r: [],
        f: [],
    }

    const res: ValidationResponse = {
        status: "valid",
        notes: []
    }

    const toEnroll = []

    cart?.courseSections.map((section, cartIndex) => {
        section.timeSlot?.daysOfTheWeek.map((day) => {
            let valid = true;
            getDay(schedule, day)?.map((interval) => {
                if(section.timeSlot !== null) {

                    if(section.timeSlot?.startTime < interval.end && 
                        section.timeSlot.endTime > interval.start
                    ) {
                        if(res.status !== "invalid") {
                            res.status = "invalid"
                        }
                        valid = false;
                        res.notes.push(`Scheduling conflict for ${section.course.fullCode}.${section.section}`);
                    }

                    section.course.prerequisites.map((prereq) => {
                        if(!fullUser?.completedCourses.some((completed) => {return(completed.code == prereq.code)})) {
                            if(res.status !== "invalid") {
                                res.status = "invalid"
                            }
                            valid = false;
                            res.notes.push(`Unmet prerequisite "${prereq.fullCode}" for ${section.course.fullCode}`);
                        }
                    })
                }
            })
            if(valid && section.timeSlot !== null) {
                getDay(schedule, day)?.push({start: section.timeSlot.startTime, end: section.timeSlot.endTime})

                if(enroll) {
                    toEnroll.push({
                        studentId: userId,
                        sectionId: section.id,
                        status: section.classlist.length >= section.capacity ? EnrollmentStatus.WAITLISTED : EnrollmentStatus.ENROLLED,
                        order: cartIndex
                    })
                }
            }
        })
    })

    if(enroll) {
        console.log(toEnroll)
    }

    return res;
}