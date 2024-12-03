import { prisma } from "@/lib/prisma"

const getAccount = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            completedCourses: true,
            major: {
                include: {
                    courses: true
                }
            }
        }
    })

    return user;
}

export default getAccount