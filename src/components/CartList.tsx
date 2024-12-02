'use client'

import { formatTimeSlot, formatSeats } from "@/lib/sisUtils";

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

    let details;
    let showDetails;

    function setDetails(value: SectionDisplayInfo) {
        details = value;
    }

    function setShowDetails(value: boolean) {
        showDetails = value;
    }

    return(
        <div className="pl-10">
            <Dialog open={showDetails} onOpenChange={setShowDetails}>
                <Table className="w-full">
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

                <SectionDetailDialog sectionInfo={details}/>
            </Dialog>
        </div>
    )
}