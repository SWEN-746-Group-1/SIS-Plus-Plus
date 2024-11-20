import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { auth } from '@/lib/auth';

export default async function Search() {
    const session = await auth();
    return (
        <div className="flex items-center mt-5 flex-col gap-5">
            <h1 className="text-3xl font-semibold">Search for a Course</h1>
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="text" placeholder="SWEN 746" />
                <Button type="submit">Search</Button>
            </div>
            {JSON.stringify(session)}
        </div>
    );
}
