import { TimeSlot, Enrolled, EnrollmentStatus } from "@prisma/client";

export function formatTimeSlot(ts: TimeSlot | null): string {
    if(ts === null) {
        return "TBD"
    }
    const days = ts.daysOfTheWeek.join("");
    const startHours = `${Math.round(ts.startTime/60)}`
    const startMinutes = `${String("0"+ts.startTime%60).slice(-2)}`
    const endHours = `${Math.round(ts.endTime/60)}`
    const endMinutes = `${String("0"+ts.endTime%60).slice(-2)}`
    return `${days} ${startHours}:${startMinutes} - ${endHours}:${endMinutes}`
}

export function formatSeats(classlist: Enrolled[], capacity: number) {
    const numEnrolled = classlist.filter((enrollment) => {return enrollment.status === EnrollmentStatus.ENROLLED}).length;
    const numWaitlisted = classlist.length - numEnrolled;
    return `${numEnrolled}/${capacity} (+${numWaitlisted})`;
}