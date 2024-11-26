'use client';

import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from "@/components/ui/collapsible"

// import { Button } from "./ui/button";

export default function SectionDetailDialog() {
    return(
        <div>
            <DialogHeader className="flex flex-row justify-between">
                <div className="space-y-2">
                    <DialogTitle>SWEN-746.01</DialogTitle>
                    <DialogDescription>Model-Driven Development</DialogDescription>
                </div>
                <div className="flex flex-row justify-evenly space-x-8 m-x-12 my-0 p-0">
                    <div className="space-y-2">
                        <DialogDescription>Open 27/30(+0)</DialogDescription>
                    </div>
                    <div className="space-y-2">
                        <DialogDescription>3 Credits</DialogDescription>
                    </div>
                    <div className="space-y-2">
                        <DialogDescription>Tue Thu 12:30 PM - 1:45 PM</DialogDescription>
                    </div>
                </div>
            </DialogHeader>
            <DialogContent className="flex max-w-4xl">
                <div>
                    <DialogTitle>Course Description</DialogTitle>
                    <Collapsible className="my-2">
                        <DialogDescription>
                            Software models help the software engineer to understand, specify, and analyze software requirements, designs, and implementations (code components, databases, support files, etc.). 
                            <span>
                                <CollapsibleContent>
                                    Model-driven development is a software engineering practice that uses tool-enabled transformation of requirements models to design models and then to code and associated implementation artifacts. Students will use the Unified Modeling Language (UML) and other modeling techniques to capture software requirements, designs, and implementations. Students will also use formal modeling methods to semi-automatically transform among the various models and to study the quality attributes of the modeled software, such as performance, reliability, security, and other qualities. 
                                </CollapsibleContent>
                            </span>
                        </DialogDescription>
                        <div className="">
                            <CollapsibleTrigger className="text-black/50">Read More</CollapsibleTrigger>
                        </div>
                    </Collapsible>
                </div>
            </DialogContent>
            <DialogContent className="flex flex-row justify-between min-w-4xl">
                <DialogContent>
                    <DialogTitle className="my-2">Section Details</DialogTitle>
                    <DialogDescription className="flex min-w-48 flex-col">
                        <div className="flex flex-row justify-between">
                            <p>Location</p>
                            <p>GOL-1550</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Instructor</p>
                            <p>Yiming Tang</p>
                        </div>
                    </DialogDescription>
                </DialogContent>
                <DialogContent>
                    <DialogTitle className="my-2">Course Details</DialogTitle>
                    <DialogDescription className="flex min-w-48 flex-col">
                        <div className="flex flex-row justify-between">
                            
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Instructor</p>
                            <p>Yiming Tang</p>
                        </div>
                    </DialogDescription>
                </DialogContent>
            </DialogContent>
            <DialogFooter>
            </DialogFooter>
        </div>
    )
}