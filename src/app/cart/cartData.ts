import { prisma } from "@/lib/prisma";

export async function getCart(userId: string) {
    const cart = await prisma.cart.findFirst({
        where: {
            userId,
        },
        include: {
            courseSections: {
                include: {
                    course: {
                        include: {
                            prerequisites: {
                                select: {
                                    id: true,
                                    fullCode: true,
                                }
                            }
                        }
                    },
                    timeSlot: true,
                    classlist: true
                }
            },
            user: {
                include: {
                    completedCourses: {
                        select: {
                            id: true,
                        }
                    },
                    enrolled: {
                        include: {
                            courseSection: {
                                include: {
                                    course: {
                                        select: {
                                            id: true,
                                        }
                                    }
                                }
                            }
                        },
                    }
                }
            }
        },
    });

    return {
        cartItems: cart?.courseSections || [],
        completedCourses: cart?.user.completedCourses ?? [],
        enrolledCourses: cart?.user.enrolled.map(enrolled => enrolled.courseSection.course.id) ?? []
    }
}