'use client';

import { formatTimeSlot, formatSeats } from "@/lib/sisUtils";

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
} from '@/components/ui/table';

import { CartItem } from './CartItem';
import { SectionDetailDialog, SectionDisplayInfo } from './SectionDetailDialog';
import { Dialog, DialogTrigger } from './ui/dialog';
import { useState } from 'react';

export interface CartListProps {
    cartItems: Array<CourseSection & {
        course?: Course & {
            prerequisites: {
                id: string;
                fullCode: string;
            }[];
        };
        timeSlot: TimeSlot | null;
        classlist: Enrolled[];
    }>;
    completedCourses: { id: string }[];
    enrolledCourses: string[];
}

export function CartList(props: CartListProps) {
    const [showDetails, setShowDetails] = useState(false);

    let details;

    function setSectionDetails(value: SectionDisplayInfo) {
        details = value;
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
                                        onClick={() => {
                                            setShowDetails(!showDetails);
                                            setSectionDetails({
                                                fullCode: section.course?.fullCode || '',
                                                section: section.section,
                                                title: section.course?.title || '',
                                                credits: section.course?.credits.toString() || '',
                                                daysOfTheWeek: section.timeSlot?.daysOfTheWeek.join(' ') || '',
                                                startTime: section.timeSlot?.startTime || '',
                                                endTime: section.timeSlot?.endTime || '',
                                                description: section.course?.description || '',
                                                location: section.location,
                                                instructor: section.instructor,
                                                prereqs: section.course?.prerequisites.map(
                                                    (prereq) => ({
                                                        code: prereq.fullCode,
                                                        status: props.completedCourses.find(
                                                            (course) =>
                                                                course.id === prereq.id
                                                        )
                                                            ? 'COMPLETE'
                                                            : props.enrolledCourses.includes(prereq.id) ? 'IN_PROGRESS' : 'INCOMPLETE'

                                                    })
                                                ) || [],
                                            });
                                        }}
                                        sectionId={section.id}
                                        sectionName={`${section.course?.fullCode}.${section.section}`}
                                        sectionTime={formatTimeSlot(
                                            section.timeSlot
                                        )}
                                        sectionInstructor={section.instructor}
                                        sectionSeats={formatSeats(
                                            section.classlist,
                                            section.capacity
                                        )}
                                    />
                                </DialogTrigger>
                            );
                        })}
                    </TableBody>
                </Table>

<<<<<<< HEAD
                <SectionDetailDialog sectionInfo={details}/>
=======
                {sectionDetails && (
                    <SectionDetailDialog {...sectionDetails} />
                )}

>>>>>>> main
            </Dialog>
        </div>
    );
}
