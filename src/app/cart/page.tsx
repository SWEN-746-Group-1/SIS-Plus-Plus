import { auth, signIn } from '@/lib/auth';
import { CartList } from '@/components/CartList';
import { getCart } from './cartData';
// import { Dialog } from '@/components/ui/dialog';
// import SectionDetailDialog from '@/components/SectionDetailDialog';
// import SectionDetailCard from '@/components/SectionDetailCard';

export default async function CartPage() {
    const session = await auth();

    console.log("authenticated");

    if (!session || !session.user || !session.user.id) {
        await signIn();
        return;
    }

    const userId = session.user.id;
    const cart = await getCart(userId);


    return (
        <div>
            <CartList {...cart}/>
        </div>
    );
}
