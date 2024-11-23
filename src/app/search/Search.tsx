'use client';

import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Search() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function search(keywords: string) {
        const params = new URLSearchParams(searchParams);

        if (keywords) {
            params.set('q', keywords);
        } else {
            params.delete('q');
        }

        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="SWEN 746" defaultValue={searchParams.get('q')?.toString()} onChange={(e) => search(e.target.value)} />
        </div>
    );
}
