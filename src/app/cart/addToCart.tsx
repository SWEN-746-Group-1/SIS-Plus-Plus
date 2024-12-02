'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addToCart(sectionId: string) {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        throw new Error('You must be logged in to add to cart');
    }


    await prisma.cart.upsert({
        create: {
            userId: session.user.id,
            courseSections: {
                connect: {
                    id: sectionId,
                },
            },
        },
        update: {
            courseSections: {
                connect: {
                    id: sectionId,
                },
            },
        },
        where: {
            userId: session.user.id,
        },
    });

    revalidatePath('/search');
}

export async function removeFromCart(sectionId: string) {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        throw new Error('You must be logged in to remove from cart');
    }

    await prisma.cart.update({
        where: {
            userId: session.user.id,
        },
        data: {
            courseSections: {
                disconnect: {
                    id: sectionId,
                },
            },
        },
    });

    revalidatePath('/search');
    revalidatePath('/cart');
}
