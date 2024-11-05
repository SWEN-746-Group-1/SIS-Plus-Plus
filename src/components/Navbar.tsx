import { School } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Separator } from './ui/separator';
import { SidebarTrigger } from './ui/sidebar';

export default async function Navbar() {
    return (
        <>
            <nav className="flex items-center justify-between w-full p-4 text-foreground">
                <div className="flex items-center justify-start space-x-4 basis-0 grow">
                    <SidebarTrigger />
                </div>

                <div className="flex items-center justify-end space-x-4 basis-0 grow">
                    <ThemeToggle />
                    <School className="w-10" />
                </div>
            </nav>
            <Separator />
        </>
    );
}
