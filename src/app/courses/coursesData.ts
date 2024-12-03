import { prisma } from "@/lib/prisma"

type Courses = {
    code: string;
    status: 'COMPLETE' | 'INCOMPLETE' | 'IN_PROGRESS';
}

const getCourses = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            completedCourses: true,
            enrolled: {
                include: {
                    courseSection: {
                        include: {
                            course: true
                        }
                    }
                }
            },
            major: {
                include: {
                    courses: true
                }
            }
        }
    })

    const courses: Courses[] = [];

    const completed = user?.completedCourses.map((course): Courses => ({
        code: course.fullCode,
        status: 'COMPLETE'
    })) || [];

    courses.push(...completed);

    const inProgress = user?.enrolled.map((enrolled): Courses => ({
        code: enrolled.courseSection.course.fullCode,
        status: 'IN_PROGRESS'
    })) || [];

    courses.push(...inProgress);

    const majorCourses = user?.major?.courses.filter(e => {
        return !courses.map(e => e.code).includes(e.fullCode)
    }).map((course): Courses => ({
        code: course.fullCode,
        status: 'INCOMPLETE'
    })) || [];

    courses.push(...majorCourses);
    return courses;
}

export default getCourses