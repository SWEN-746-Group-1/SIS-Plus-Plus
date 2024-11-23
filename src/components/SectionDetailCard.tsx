'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardFooter,
    CardTitle,
} from "@/components/ui/card"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from "@/components/ui/collapsible"

// import { Button } from "./ui/button";

export default function SectionDetailCard() {
    return(
        <Card>
            <CardHeader className="flex flex-row justify-between">
                <div className="space-y-2">
                    <CardTitle>SWEN-746.01</CardTitle>
                    <CardDescription>Model-Driven Development</CardDescription>
                </div>
                <div className="flex flex-row justify-evenly space-x-8 m-x-12 my-0 p-0">
                    <div className="space-y-2">
                        <CardDescription>Open 27/30(+0)</CardDescription>
                    </div>
                    <div className="space-y-2">
                        <CardDescription>3 Credits</CardDescription>
                    </div>
                    <div className="space-y-2">
                        <CardDescription>Tue Thu 12:30 PM - 1:45 PM</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex max-w-4xl">
                <div>
                    <CardTitle>Course Description</CardTitle>
                    <Collapsible className="my-2">
                        <CardDescription>
                            Software models help the software engineer to understand, specify, and analyze software requirements, designs, and implementations (code components, databases, support files, etc.). 
                            <span>
                                <CollapsibleContent>
                                    Model-driven development is a software engineering practice that uses tool-enabled transformation of requirements models to design models and then to code and associated implementation artifacts. Students will use the Unified Modeling Language (UML) and other modeling techniques to capture software requirements, designs, and implementations. Students will also use formal modeling methods to semi-automatically transform among the various models and to study the quality attributes of the modeled software, such as performance, reliability, security, and other qualities. 
                                </CollapsibleContent>
                            </span>
                        </CardDescription>
                        <div className="">
                            <CollapsibleTrigger className="text-black/50">Read More</CollapsibleTrigger>
                        </div>
                    </Collapsible>
                </div>
            </CardContent>
            <CardContent className="flex flex-row justify-between min-w-4xl">
                <CardContent>
                    <CardTitle className="my-2">Section Details</CardTitle>
                    <CardDescription className="flex min-w-48 flex-col">
                        <div className="flex flex-row justify-between">
                            <p>Location</p>
                            <p>GOL-1550</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Instructor</p>
                            <p>Yiming Tang</p>
                        </div>
                    </CardDescription>
                </CardContent>
                <CardContent>
                    <CardTitle className="my-2">Course Details</CardTitle>
                    <CardDescription className="flex min-w-48 flex-col">
                        <div className="flex flex-row justify-between">
                            
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Instructor</p>
                            <p>Yiming Tang</p>
                        </div>
                    </CardDescription>
                </CardContent>
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}