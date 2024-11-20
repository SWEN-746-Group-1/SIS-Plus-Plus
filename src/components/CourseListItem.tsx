'use client'

import {
    SectionListItem,
    SectionListItemProps
} from "./SectionListItem"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from "@/components/ui/collapsible"

interface CourseListItemProps {
    courseId: string;
    courseName: string;
    prereqsMet: boolean;
    sections: SectionListItemProps[];
}

export default function CourseListItem(props: CourseListItemProps) {
    return(
        <Card className="w-96">
            <CardHeader>
                <CardTitle>{props.courseId}</CardTitle>
                <CardDescription>{props.courseName}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className={props.sections.length === 0 ? "" : "hidden"}>No sections available this semester</p>
                <Collapsible className={props.sections.length === 0 ? "hidden" : ""}>
                    <CollapsibleContent>
                        {props.sections.map((s, i) => {
                            return(
                                <div key={i}>
                                    <SectionListItem sectionName={s.sectionName} sectionTime={s.sectionTime} sectionSeats={s.sectionSeats}/>
                                </div>
                            )
                        })}
                    </CollapsibleContent>
                    <CollapsibleTrigger>
                        <p>View Sections</p>
                    </CollapsibleTrigger>
                </Collapsible>
            </CardContent>
        </Card>
    )
}