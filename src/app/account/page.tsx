import { auth, signIn } from '@/lib/auth';
import getAccount from './accountData';

export default async function Page() {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        await signIn();
        return;
    }

    const user = await getAccount(session.user.id)

    return (
        <div className="flex w-full items-center mt-5 flex-col gap-5">
            <h1 className="text-3xl font-semibold">Account</h1>

            <h2 className="text-xl">Major: {user?.major?.name}</h2>
        </div>
    );
}
