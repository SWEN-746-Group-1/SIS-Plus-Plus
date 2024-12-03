'use server';

import { getCart } from './cartData';
import { auth, signIn } from '@/lib/auth';
import { prisma } from '@/lib/prisma'
import { Enrolled, EnrollmentStatus } from '@prisma/client';
import { ValidationStatus } from '@/lib/sisUtils';
import { revalidatePath } from 'next/cache';

interface Interval {
    start: number;
    end: number;
    sectionName: string;
}

interface Schedule {
    m: Interval[];
    t: Interval[];
    w: Interval[];
    r: Interval[];
    f: Interval[];
}

interface PreEnrolled {
    studentId: string;
    sectionId: string;
    status: EnrollmentStatus;
    order: number;
}

export interface ValidationResponse {
    status: ValidationStatus;
    notes: Set<string>;
}

function getDay(week: Schedule, day: string) {
    switch (day.toLowerCase()) {
        case "m": return week.m;
        case "t": return week.t;
        case "w": return week.w;
        case "r": return week.r;
        case "f": return week.f;
        default: return null
    }
}

function addInterval(week: Schedule, day: string, interval: Interval) {
    switch (day.toLowerCase()) {
        case "m": 
            week.m.push(interval);
            return week;
        case "t": 
            week.t.push(interval);
            return week;
        case "w": 
            week.w.push(interval);
            return week;
        case "r": 
            week.r.push(interval);
            return week;
        case "f": 
            week.f.push(interval);
            return week;
        default: return week;
    }
}

export async function validateCart(enroll: boolean = false) {
    
    const session = await auth();

    console.log("authenticated");

    if (!session || !session.user || !session.user.id) {
        await signIn();
        return;
    }

    const userId = session.user.id;
    const cart = await getCart(userId);

    const id = userId;
    const userCurrent = await prisma.user.findFirst({
        where: {
            id
        },
        include: {
            completedCourses: true,
            enrolled: true
        }
    })

    let schedule: Schedule = {
        m: [],
        t: [],
        w: [],
        r: [],
        f: [],
    }

    const res: ValidationResponse = {
        status: ValidationStatus.VALID,
        notes: new Set()
    }

    const enrollingCourses: Set<string> = new Set()
    const toEnroll: PreEnrolled[] = []

    // Check possible sources of cart problems
    cart?.cartItems.map((section) => {
        let valid = true;

        // Duplicate courses
        if(enrollingCourses.has(section.course.id)) {
            valid = false
            res.status = ValidationStatus.INVALID
            res.notes.add(`Multiple sections of ${section.course.fullCode}`)
        } else {
            // Prerequisites unmet
            section.course.prerequisites.map((prereq) => {
                if(!userCurrent?.completedCourses.some((completed) => {return(completed.code == prereq.code)})) {
                    res.status = ValidationStatus.INVALID
                    valid = false;
                    res.notes.add(`Unmet prerequisite "${prereq.fullCode}" for ${section.course.fullCode}`);
                }
            })
        }

        // Schedule collision
        if (section.timeSlot?.daysOfTheWeek.some((day) => {
            return(getDay(schedule, day)?.some((interval) => {
                if(section.timeSlot !== null) {
                    if(section.timeSlot?.startTime < interval.end && 
                        section.timeSlot.endTime > interval.start
                    ) {
                        res.status = ValidationStatus.INVALID
                        res.notes.add(`${section.course.fullCode}.${section.section} conflicts with ${interval.sectionName}`);
                        return true;
                    }
                }
                return false;
            }))
        })) {
            valid = false;
        }
        
        if(valid && section.timeSlot !== null) {
            section.timeSlot.daysOfTheWeek.map((day) => {schedule = addInterval(schedule, day, {start: section.timeSlot.startTime, end: section.timeSlot.endTime, sectionName: section.course.fullCode+"."+section.section})})
            enrollingCourses.add(section.course.id)
            if(enroll) {
                toEnroll.push({
                    studentId: userId,
                    sectionId: section.id,
                    status: section.classlist.length >= section.capacity ? EnrollmentStatus.WAITLISTED : EnrollmentStatus.ENROLLED,
                    order: section.classlist.length
                })
            }
        }
    })

    console.log(schedule)

    console.log(res);

    if (enroll) {
        if (res.status === ValidationStatus.VALID) {

            // transfer current enrollments to completed
            cart.completedCourses.map(async (course) => {
                await prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        completedCourses: {
                            connect: {
                                id: course.id
                            }
                        }
                    }
                })
            })

            const newEnrollments = await prisma.enrolled.createManyAndReturn({
                data: toEnroll.map((enrollmentData) => ({
                    status: enrollmentData.status,
                    studentId: enrollmentData.studentId,
                    sectionId: enrollmentData.sectionId,
                    order: enrollmentData.order,
                }))
            })
            
            await prisma.cart.update({
                where: {
                    userId
                },
                data: {
                    courseSections: {
                        set: []
                    }
                }
            })

            res.status = ValidationStatus.ENROLLED;
        }
    }

    revalidatePath("/cart");

    return res;
}