'use client';

import { SectionListItem, SectionListItemProps } from './SectionListItem';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from './ui/button';

import { Table, TableBody, TableHead, TableHeader, TableRow } from './ui/table';
import { useState } from 'react';

interface CourseListItemProps {
    courseId: string;
    courseName: string;
    prereqsMet: boolean;
    sections: SectionListItemProps[];
}

export default function CourseListItem(props: CourseListItemProps) {
    const [showSections, setShowSections] = useState(false);
    return (
        <Card className="p-4 w-full">
            <CardHeader>
                <CardTitle>{props.courseId}</CardTitle>
                <CardDescription>{props.courseName}</CardDescription>
            </CardHeader>
            <CardContent>

                { props.sections.length === 0 ? (
                    <p>
                        No sections available this semester
                    </p>
                ) : (
                    <Collapsible open={showSections}>
                        <CollapsibleContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">
                                            Section
                                        </TableHead>
                                        <TableHead>Time</TableHead>
                                        <TableHead>Capacity</TableHead>
                                        <TableHead>Instructor</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead className="text-right">
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {props.sections.map((s, i) => {
                                        return (
                                            <SectionListItem
                                                key={i}
                                                sectionId={s.sectionId}
                                                sectionName={s.sectionName}
                                                sectionTime={s.sectionTime}
                                                sectionSeats={s.sectionSeats}
                                                sectionInstructor={s.sectionInstructor}
                                                sectionLocation={s.sectionLocation}
                                                inCart={s.inCart}
                                            />
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </CollapsibleContent>
                        <CollapsibleTrigger asChild>
                            {showSections ? (
                                <Button variant={'outline'} onClick={() => setShowSections(false)}>Hide Sections</Button>
                            ) : (
                            <Button onClick={() => setShowSections(true)}>View Sections</Button>
                            )}
                        </CollapsibleTrigger>
                    </Collapsible>
                )}

            </CardContent>
        </Card>
    );
}
