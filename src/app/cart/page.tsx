import CourseListItem from '@/components/CourseListItem';
import SectionDetailCard from '@/components/SectionDetailCard';
import { useState } from 'react';

export default function Cart() {

    const [showDetails, setShowDetails] = useState(false);

    const sections = [
        {sectionName: "01", sectionTime: "Tue Thu 12:30 PM - 1:45 PM", sectionSeats: "27/30(+0)"},
        {sectionName: "02", sectionTime: "Tue Thu 2:00 PM - 3:15 PM", sectionSeats: "23/30(+4)"},
        {sectionName: "03", sectionTime: "Tue Thu 11:00 AM - 11:50 AM", sectionSeats: "12/20(+1)"},
    ]

    function openDetails() {
        setShowDetails(true);
    }

    return (
        <div className="flex items-center mt-5 flex-col gap-5">
            <div className={showDetails ? "" : "hidden"}>
                <SectionDetailCard />
            </div>
            <ol>
                <CourseListItem courseId='SWEN 746' courseName='Model-Driven Development' prereqsMet={true} sections={sections}/>
            </ol>
        </div>
    );
}
