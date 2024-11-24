//import { prisma } from '@/lib/prisma';
import { CourseSection } from '@prisma/client'
import {auth} from "@/lib/auth";
const example_courses = [
    {name: "A", id: 0, prof:"Bob",date:"MWF"},
    {name: "B", id: 1, prof:"Bob",date:"TR"},
    {name: "C", id: 2, prof:"Bob",date:"MW"}
];

export default async function YourCart() {
    //const session = await auth()

    if(!session) {
        return (
            <div className="flex items-center mt-5 flex-col gap-5">
                <h1 className="text-3xl font-semibold">Your Cart</h1>
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <ul>
                        {example_courses.map((course) => (
                            <li key={course.id}
                                className="divide-orange-400 border-solid border-orange-500 p-2 bg-gray-500">
                                {course.name}, {course.prof}, {course.date}
                                <br/></li>))}
                    </ul>
                </div>
            </div>
        );
    }
    else{
        // add when account system is sorted out
        /*
        const courses = await prisma.cart.findMany({
            where: {
                userID: user_id
            },
            include: {
                courseSections: true
            }
        })

        Display fetched courses
         */
    }
}
