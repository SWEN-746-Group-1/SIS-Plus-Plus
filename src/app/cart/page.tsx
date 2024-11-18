import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const example_courses = [
    {name: "A", id: 0, prof:"Bob",date:"MWF"},
    {name: "B", id: 1, prof:"Bob",date:"TR"},
    {name: "C", id: 2, prof:"Bob",date:"MWF"}
];

export default function Cart() {
    return (
        <div className="flex items-center mt-5 flex-col gap-5">
            <h1 className="text-3xl font-semibold">Your Cart</h1>
            <div className="flex w-full max-w-sm items-center space-x-2">
                <ul>
                    {example_courses.map((course) => (
                        <li key={course.id}>{course.name},{course.prof},{course.date}</li>))}
                </ul>
            </div>
        </div>
    );
}