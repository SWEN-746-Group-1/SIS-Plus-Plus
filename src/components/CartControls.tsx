'use client';

import { Card, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { MouseEventHandler } from 'react';

export interface CartControlProps {
    onValidate: MouseEventHandler;
    onEnroll: MouseEventHandler;
}

export default function CartControls(props: CartControlProps) {
    return (
        <Card className="m-8">
            <CardHeader className="">
                <div className="flex flex-row justify-center gap-20">
                    <Button onClick={props.onValidate}>Validate</Button>
                    <Button onClick={props.onEnroll}>Enroll</Button>
                </div>
            </CardHeader>
        </Card>
    );
}
