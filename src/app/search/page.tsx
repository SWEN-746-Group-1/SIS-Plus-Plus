import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { redirect } from 'next/navigation';
import Search from './Search';

const courses = [
    {
        id: 1,
        name: 'SWEN 746',
        description: 'Software Architecture',
        credits: 15,
        level: 7,
        semester: 2,
        year: 2021,
        department: 'Computer Science',
        prerequisites: [],
        corequisites: [],
    },
    {
        id: 2,
        name: 'SWEN 742',
        description: 'Software Testing',
        credits: 15,
        level: 7,
        semester: 1,
        year: 2021,
        department: 'Computer Science',
        prerequisites: [],
        corequisites: [],
    },
];

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q: string }>;
}) {
    const params = await searchParams;
    const query = params.q;
    const filteredCourses = query
        ? courses.filter((course) =>
              course.name.toLowerCase().includes(query.toLowerCase())
          )
        : null;

    return (
        <div className="flex items-center mt-5 flex-col gap-5">
            <h1 className="text-3xl font-semibold">Search for a Course</h1>
            <Search />

            {filteredCourses
                ? filteredCourses.map((course) => (
                      <div key={course.id}>{course.name}</div>
                  ))
                : null}
        </div>
    );
}
