'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma'
// import { revalidatePath } from 'next/cache'

export async function validateCart() {
    const session = await auth();

    let userId;
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

    cart?.courseSections.map((section) => {
        console.log(section.course.fullCode + "." + section.section)
    })
}