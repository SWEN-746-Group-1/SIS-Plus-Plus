'use client'

import { Card, CardHeader } from "./ui/card"
import { Button } from "./ui/button"
import { MouseEventHandler } from "react"

export interface CartControlProps {
    onValidate: MouseEventHandler;
    onEnroll: MouseEventHandler
}

export default function CartControls(props: CartControlProps) {
    return (
        <Card className="fixed flex flex-col justify-center m-8">
            <CardHeader className="flex flex-col justify-center">
                <Button onClick={props.onValidate}>Validate</Button>
                <Button onClick={props.onEnroll}>Enroll</Button>
            </CardHeader>
        </Card>
    )
}