'use client';

import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from '@/components/ui/dialog';

import {
    Collapsible,
} from '@/components/ui/collapsible';
import Link from 'next/link';
import { Check, CircleDot, X } from 'lucide-react';

// import { Button } from "./ui/button";

export interface SectionDisplayInfo {
    fullCode: string;
    section: string;
    title: string;
    credits: string;
    sectionTime: string;
    description: string;
    location: string;
    instructor: string;
    prereqs: {
        code: string;
        status: 'COMPLETE' | 'INCOMPLETE' | 'IN_PROGRESS';
    }[];
}

export function SectionDetailDialog({
    fullCode,
    section,
    title,
    credits,
    sectionTime,
    description,
    location,
    instructor,
    prereqs,
}: SectionDisplayInfo) {
    return (
        <DialogContent className="flex flex-col max-w-4xl">
            <DialogHeader className="flex flex-row justify-between">
                <div className="space-y-2">
                    <DialogTitle>
                        {fullCode}.{section}
                    </DialogTitle>
                    <DialogDescription>{title}</DialogDescription>
                </div>
                <div className="flex flex-row justify-evenly space-x-8 m-x-12 my-0 p-0 pr-8">
                    <div className="space-y-2">
                        <DialogDescription>Open 27/30(+0)</DialogDescription>
                    </div>
                    <div className="space-y-2">
                        <DialogDescription>{credits}</DialogDescription>
                    </div>
                    <div className="space-y-2">
                        <DialogDescription>
                            {sectionTime}
                        </DialogDescription>
                    </div>
                </div>
            </DialogHeader>
            <div>
                <DialogTitle>Course Description</DialogTitle>
                <Collapsible className="my-2">
                    <DialogDescription>{description}</DialogDescription>
                </Collapsible>
            </div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-col justify-between min-w-4xl">
                    <DialogTitle className="my-2">Section Details</DialogTitle>
                    <DialogDescription className="flex min-w-48 flex-col">
                        <div className="flex flex-row justify-between">
                            <p>Location</p>
                            <p>{location}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Instructor</p>
                            <p>{instructor}</p>
                        </div>
                    </DialogDescription>
                </div>
                <div>
                    <DialogTitle className="my-2">Prerequisites</DialogTitle>
                    <DialogDescription className="flex min-w-48 flex-col">
                        <div className="flex flex-col justify-between">
                            {prereqs.map((prereq, i) => (
                                <Link href={`/search?q=${prereq.code}`} key={i}>
                                <div className="flex items-center gap-5">
                                    <p key={i}>{prereq.code}</p>
                                    {
                                        prereq.status === 'COMPLETE' ? (
                                            <Check className='text-green-500' />
                                        ) : prereq.status === 'IN_PROGRESS' ? (
                                            <CircleDot className='text-yellow-500' />
                                        ) : (
                                            <X className='text-red-500' />
                                        )
                                    }
                                </div>
                                </Link>
                            ))}
                        </div>
                    </DialogDescription>
                </div>
            </div>

            <DialogFooter></DialogFooter>
        </DialogContent>
    );
}
