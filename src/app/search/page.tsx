import { prisma } from "@/lib/prisma";
import Search from "./Search";

export default async function SearchPage({
    searchParams
}: {
    searchParams: Promise<{ q: string }>;
}) {

    const {q: string} = await searchParams;

    const courses = await prisma.course.findMany({
        where: {
            OR: [
                {
                    code: {
                        contains: string
                    }
                },
                {
                    title: {
                        contains: string
                    }
                }
            ]
        }
    });

    return (
        <div className="flex items-center mt-5 flex-col gap-5">
            <h1 className="text-3xl font-semibold">Search for a Course</h1>
            <Search />

            {JSON.stringify(courses)}
        </div>
    );
}
