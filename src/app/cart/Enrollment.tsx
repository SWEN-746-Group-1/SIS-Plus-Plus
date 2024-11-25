'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function Enrollment() {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        throw new Error('You must be logged in to enroll in your cart items');
    }


    const courses= await prisma.cart.findMany({
        where: {
            userId: session.user.id,
        },
        include: {
            courseSections: true
        }
    })

    //Add loop through courseSections
    //Add validation within loop
    await prisma.enrolled.create({
            studentId: session.user.id,
            section: {

            }
    })
}