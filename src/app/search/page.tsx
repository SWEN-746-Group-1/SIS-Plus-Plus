import Search from './Search';
import CourseListItem from '@/components/CourseListItem';
import { auth } from '@/lib/auth';
import getCourses from './searchData';

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q: string }>;
}) {
    const { q: search } = await searchParams;
    const session = await auth();

    let userId

    if (!session || !session.user || !session.user.id) {
        userId = null;
    } else {
        userId = session.user.id;
    }

    const courses = await getCourses(search, userId);


    return (
        <div className="flex w-full items-center mt-5 flex-col gap-5">
            <h1 className="text-3xl font-semibold">Search for a Course</h1>
            <Search />

            <div className='w-full p-4 flex flex-col gap-5 items-center'>
                {courses.map((course) => (
                    <CourseListItem courseId={`${course.department}-${course.code}`} courseName={course.title} prereqsMet={true} key={course.id} sections={course.sections} />
                ))}
            </div>
        </div>
    );
}
