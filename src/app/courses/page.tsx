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

export default async function Page() {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        await signIn();
        return;
    }

    const courses = await getCourses(session.user.id);
    return (
        <div className="flex w-full items-center mt-5 flex-col gap-5">
            <h1 className="text-3xl font-semibold">Course History</h1>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Course</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>

                    {courses.map((course, i) => (
                        <TableRow key={i}>
                            <TableCell>{course.code}</TableCell>
                            <TableCell className="text-right">{course.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
