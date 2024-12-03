import { CartList } from '@/components/CartList';
import CartControls from '@/components/CartControls';
import { auth, signIn } from '@/lib/auth';
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
        <div className='flex flex-row'>
            <CartList {...cart}/>
            
            <CartControls />
        </div>
    );
}
