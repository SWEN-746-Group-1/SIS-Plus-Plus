'use client'

import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'

import { ValidationResponse } from '@/app/cart/enrollment';
import { ValidationStatus } from '@/lib/sisUtils';
import { Button } from './ui/button';
import { useState } from 'react';

function formatTitle(status: ValidationStatus) {
    switch(status) {
        case ValidationStatus.ENROLLED:
            return "Enrolled Successfully";
        case ValidationStatus.VALID:
            return "Validated Successfully";
        case ValidationStatus.INVALID:
            return "Cart Not Valid"
    }
}

export function ValidationResultsDialog({status, notes}: ValidationResponse) {
    const [listOpen, setListOpen] = useState(false);

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{formatTitle(status)}</DialogTitle>
            </DialogHeader>
            {status === ValidationStatus.INVALID &&
                <Collapsible open={listOpen} onOpenChange={setListOpen}>
                    <DialogDescription>
                        Found {notes.size} problems
                    </DialogDescription>
                    <CollapsibleContent>
                        <div className='flex flex-col pl-8'>
                            {Array.from(notes).map((note, index) => {
                                return(
                                    <li key={index}>{note}</li>
                                )
                            })}
                        </div>
                    </CollapsibleContent>
                    <CollapsibleTrigger asChild>
                        <DialogDescription className='cursor-pointer'>{listOpen ? "Collapse" : "Expand"}</DialogDescription>
                    </CollapsibleTrigger>
                </Collapsible>
            }
            <DialogFooter>
                <DialogTrigger>
                    <Button>Ok</Button>
                </DialogTrigger>
            </DialogFooter>
        </DialogContent>
    )
}