'use client'

import { TimeSlot, Enrolled, EnrollmentStatus, Course } from "@prisma/client";

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody
} from "@/components/ui/table"

import { CartItem } from "./CartItem"
import {SectionDetailDialog, SectionDisplayInfo} from "./SectionDetailDialog";
import { Dialog, DialogTrigger } from "./ui/dialog";

export interface CartListProps {
    cartItems: Array<SectionDisplayInfo>
}

export function CartList(props: CartListProps) {

    var details: SectionDisplayInfo | null
    var showDetails

    function setDetails(value: SectionDisplayInfo) {
        details = value;
    }

    function setShowDetails(value: boolean) {
        showDetails = value;
    }

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

    return(
        <div className="pl-10">
            <Dialog open={showDetails} onOpenChange={setShowDetails}>
                <Table className="w-3/4">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Section</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Instructor</TableHead>
                            <TableHead>Seats (+Waitlisted)</TableHead>
                            <TableHead className="text-right">Remove</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {props.cartItems.map((section) => {
                            return (
                                    <DialogTrigger asChild key={section.id}>
                                        <CartItem 
                                            onClick={() => {setDetails(section)}}
                                            sectionId={section.courseId} 
                                            sectionName={`${section.course?.fullCode}.${section.section}`} 
                                            sectionTime={formatTimeSlot(section.timeSlot)} 
                                            sectionInstructor={section.instructor}
                                            sectionSeats={formatSeats(section.classlist, section.capacity)}
                                        />
                                    </DialogTrigger>
                                )
                        })}
                    </TableBody>
                </Table>

                <SectionDetailDialog />
            </Dialog>
        </div>
    )
}