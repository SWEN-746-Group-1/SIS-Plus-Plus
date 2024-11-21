import { prisma } from '@/lib/prisma';
import Search from './Search';
import CourseListItem from '@/components/CourseListItem';
import { auth } from '@/lib/auth';

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q: string }>;
}) {
    const { q: search } = await searchParams;

    let fullSearch = search;

    if (!search) {
        fullSearch = '';
    }

    fullSearch = fullSearch.trim()

    const trimmedSearch = fullSearch.trim().replace(/ /g, '-').toLowerCase();

    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        throw new Error('You must be logged in to search for courses');
    }

    const courses = await prisma.course.findMany({
        where: {
            OR: [
                {
                    code: {
                        contains: fullSearch,
                        mode: 'insensitive',
                    },
                },
                {
                    title: {
                        contains: fullSearch,
                        mode: 'insensitive',
                    },
                },
                {
                    department: {
                        contains: fullSearch,
                        mode: 'insensitive',
                    },
                },
                {
                    fullCode: {
                        contains: trimmedSearch,
                        mode: 'insensitive',
                    }
                }
            ],
        },
        include: {
            sections: {
                include: {
                    timeSlot: true,
                    classlist: true,
                }
            },
        }
    });

    const cart = await prisma.cart.findFirst({
        where: {
            userId: session.user.id,
        },
        include: {
            courseSections: true,
        },
    });

    console.log(cart);

    return (
        <div className="flex w-full items-center mt-5 flex-col gap-5">
            <h1 className="text-3xl font-semibold">Search for a Course</h1>
            <Search />

            <div className='w-full p-4 flex flex-col gap-5 items-center'>
                {courses.map((course) => (
                    <CourseListItem courseId={`${course.department}-${course.code}`} courseName={course.title} prereqsMet={true} key={course.id} sections={
                        course.sections.map((section) => ({
                            sectionId: section.id,
                            sectionName: section.section,
                            sectionTime: section.timeSlot?.endTime && section.timeSlot?.startTime && `${section.timeSlot?.startTime} - ${section.timeSlot?.endTime}` || 'TBA',
                            sectionSeats: `${section.classlist.filter((student) => student.status === 'ENROLLED').length}/${section.capacity} (${section.classlist.filter((student) => student.status === 'WAITLISTED').length} waitlisted)`,
                            sectionInstructor: section.instructor,
                            sectionLocation: section.location,
                            inCart: cart?.courseSections.some((cartSection) => cartSection.id === section.id) || false,
                        }))
                    } />
                ))}
            </div>
        </div>
    );
}
