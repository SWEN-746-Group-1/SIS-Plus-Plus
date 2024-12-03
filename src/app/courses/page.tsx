import { auth, signIn } from '@/lib/auth';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import getCourses from './coursesData';
import { Check, CircleDot, X } from 'lucide-react';

export default async function Page() {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        await signIn();
        return;
    }

    const courses = await getCourses(session.user.id);
    return (
        <div className="flex max-w-7xl m-auto items-center mt-5 flex-col gap-5 p-10">
            <h1 className="text-3xl font-semibold">Course History</h1>

            <Table>
                <TableHeader>
                    <TableRow className="flex justify-between">
                        <TableHead className="">Course</TableHead>
                        <TableHead className="">Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {courses.map((course, i) => (
                        <TableRow className="flex justify-between" key={i}>
                            <TableCell>{course.code}</TableCell>
                            <TableCell className="text-right">
                                {course.status === 'COMPLETE' ? (
                                    <Check className="text-green-500 text-right" />
                                ) : course.status === 'IN_PROGRESS' ? (
                                    <CircleDot className="text-yellow-500 text-right" />
                                ) : (
                                    <X className="text-red-500 text-right" />
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
