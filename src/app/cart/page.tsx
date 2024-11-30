import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { CartItem } from '@/components/CartItem';
import { Table, TableBody, TableRow, TableHead, TableHeader } from '@/components/ui/table'
import { Enrolled, EnrollmentStatus, TimeSlot } from '@prisma/client';
import { CartList } from '@/components/CartList';
// import { Dialog } from '@/components/ui/dialog';
// import SectionDetailDialog from '@/components/SectionDetailDialog';
// import SectionDetailCard from '@/components/SectionDetailCard';

export default async function CartPage() {
    const session = await auth();

    console.log("authenticated");

    let userId
    if (!session || !session.user || !session.user.id) {
        userId = null;
    } else {
        userId = session.user.id;
    }

    let cart;
    if (!userId) {
        cart = null;
    } else {
        cart = await prisma.cart.findFirst({
            where: {
                userId,
            },
            include: {
                courseSections: {
                    include: {
                        course: true,
                        timeSlot: true,
                        classlist: true
                    }
                }
            },
        });
    }

    console.log(cart);

    return (
        <div>
            <CartList cartItems={cart ? cart.courseSections : []}/>
        </div>
    );
}
