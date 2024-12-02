'use client'

import { validateCart } from "@/app/cart/enrollment"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"

export default function CartControls() {
    return (
        <Card className="h-20 flex flex-col justify-center">
            <CardContent className="flex flex-col justify-center">
                <Button onClick={() => validateCart()}>Validate</Button>
            </CardContent>
        </Card>
    )
}