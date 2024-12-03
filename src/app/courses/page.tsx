import { auth, signIn } from '@/lib/auth';
import getAccount from './accountData';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export default async function Page() {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        await signIn();
        return;
    }

    const user = await getAccount(session.user.id);

    return (
        <div className="flex w-full items-center mt-5 flex-col gap-5">
            <h1 className="text-3xl font-semibold">Course History</h1>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Section</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Capacity</TableHead>
                        <TableHead>Instructor</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-right"></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">
                            {props.sectionName}
                        </TableCell>
                        <TableCell>{props.sectionTime}</TableCell>
                        <TableCell>{props.sectionSeats}</TableCell>
                        <TableCell>{props.sectionInstructor}</TableCell>
                        <TableCell>{props.sectionLocation}</TableCell>
                        {}
                        {props.inCart !== null ? (
                            props.inCart ? (
                                <TableCell className="text-right">
                                    <Button
                                        variant={'outline'}
                                        onClick={() =>
                                            removeFromCart(
                                                props.sectionId,
                                                '/search'
                                            )
                                        }
                                    >
                                        <Trash />
                                    </Button>
                                </TableCell>
                            ) : (
                                <TableCell className="text-right">
                                    <Button
                                        onClick={() =>
                                            addToCart(
                                                props.sectionId,
                                                '/search'
                                            )
                                        }
                                    >
                                        <ShoppingCart />
                                    </Button>
                                </TableCell>
                            )
                        ) : null}
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
