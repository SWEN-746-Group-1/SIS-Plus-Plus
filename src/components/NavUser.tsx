'use client';

import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogIn,
    LogOut,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { signIn, signOut, useSession } from 'next-auth/react';

const defaults = {
    name: 'Not Signed In',
};

export default function NavUser() {
    const { isMobile } = useSidebar();
    const { data: session } = useSession();
    const user = session?.user;

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                {session ? (
                                    user?.image && user.name ? (
                                        <AvatarImage src={user.image} alt={user.name} />
                                    ) : null
                                ) : null}
                                <AvatarFallback className="rounded-lg">
                                    CN
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {user?.name ?? defaults.name}
                                </span>
                                {user ? (
                                    <span className="truncate text-xs">
                                        {user.email}
                                    </span>
                                ) : (
                                    <span className="truncate text-xs"></span>
                                )}
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? 'bottom' : 'right'}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarFallback className="rounded-lg">
                                        CN
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {user?.name ?? defaults.name}
                                    </span>
                                    {user ? (
                                        <span className="truncate text-xs">
                                            {user.email}
                                        </span>
                                    ) : (
                                        <span className="truncate text-xs"></span>
                                    )}
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <BadgeCheck />
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard />
                                Billing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Bell />
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        {session ? (
                            <DropdownMenuItem onClick={() => signOut()}>
                                <LogOut />
                                Log Out
                            </DropdownMenuItem>
                        ) : (
                            <DropdownMenuItem onClick={() => signIn('google')}>
                                <LogIn />
                                Log In
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}