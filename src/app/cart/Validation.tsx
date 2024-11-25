'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function Validation() {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        throw new Error('You must be logged in to validate your cart');
    }

   const courses= await prisma.cart.findMany({
        where: {
            userId: session.user.id,
        },
       include: {
            courseSections: true
       }
    })


}