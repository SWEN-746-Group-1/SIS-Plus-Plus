import { prisma } from '@/lib/prisma';
import { formatTimeSlot } from '@/lib/sisUtils';

const getCourses = async (search: string, userId: string | null = null) => {
    let fullSearch = search;

    if (!search) {
        fullSearch = '';
    }

    fullSearch = fullSearch.trim();

    const trimmedSearch = fullSearch.trim().replace(/ /g, '-').toLowerCase();

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
                    },
                },
            ],
        },
        include: {
            sections: {
                include: {
                    timeSlot: true,
                    classlist: true,
                },
            },
        },
    });

    let cart;

    if (!userId) {
        cart = null;
    } else {

        cart = await prisma.cart.upsert({
            where: {
                userId,
            },
            update: {},
            create: {
                userId,
            },
            include: {
                courseSections: true,
            }
        })
    }

    return courses.map((course) => ({
        id: course.id,
        department: course.department,
        code: course.code,
        credits: course.credits,
        honorsOnly: course.honorsOnly,
        title: course.title,
        description: course.description,
        sections: course.sections.map((section) => ({
            sectionId: section.id,
            sectionName: section.section,
            sectionTime:
                (section.timeSlot?.endTime &&
                    section.timeSlot?.startTime &&
                    formatTimeSlot(section.timeSlot)) ||
                'TBA',
            sectionSeats: `${
                section.classlist.filter(
                    (student) => student.status === 'ENROLLED'
                ).length
            }/${section.capacity} (${
                section.classlist.filter(
                    (student) => student.status === 'WAITLISTED'
                ).length
            } waitlisted)`,
            sectionInstructor: section.instructor,
            sectionLocation: section.location,
            inCart: cart
                ? cart?.courseSections.some(
                      (cartSection) => cartSection.id === section.id
                  ) || false
                : null,
        })),
    }));
};

export default getCourses;
