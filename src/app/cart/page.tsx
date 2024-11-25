import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { CartItem } from '@/components/CartItem';
import { Table, TableBody, TableRow, TableHead, TableHeader } from '@/components/ui/table'
import { Enrolled, EnrollmentStatus, TimeSlot } from '@prisma/client';

export default async function CartPage() {
    const session = await auth();

    console.log("authenticated");

    let userId
    if (!session || !session.user || !session.user.id) {
        userId = null;
    } else {
        userId = session.user.id;
    }

    let cart;
    if (!userId) {
        cart = null;
    } else {
        cart = await prisma.cart.findFirst({
            where: {
                userId,
            },
            include: {
                courseSections: {
                    include: {
                        course: true,
                        timeSlot: true,
                        classlist: true
                    }
                }
            },
        });
    }

    console.log(cart?.courseSections[0].classlist);

    function formatTimeSlot(timeSlot: TimeSlot | null) {
        if(timeSlot === null) {
            return "TBD"
        }
        return `${timeSlot.daysOfTheWeek.join("")} ${timeSlot.startTime}-${timeSlot.endTime}`
    }

    function formatSeats(classlist: Enrolled[], capacity: number) {
        const numEnrolled = classlist.filter((enrollment) => {return enrollment.status === EnrollmentStatus.ENROLLED}).length;
        const numWaitlisted = classlist.length - numEnrolled;
        return `${numEnrolled}/${capacity} (+${numWaitlisted})`;
    }

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Section</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Seats (Waitlisted)</TableHead>
                        <TableHead className="text-right">Remove</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cart?.courseSections.map((section) => {
                        return (
                            <CartItem 
                                sectionId={section.courseId} 
                                sectionName={`${section.course.fullCode}.${section.section}`} 
                                sectionTime={formatTimeSlot(section.timeSlot)} 
                                sectionSeats={formatSeats(section.classlist, section.capacity)}
                                key={section.id}/>
                            )
                    })}
                </TableBody>
            </Table>
        </div>
        
    );
}
