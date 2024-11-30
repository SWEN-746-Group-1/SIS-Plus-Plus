'use client'

import { removeFromCart } from "@/app/cart/addToCart";
import { Button } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import { Trash } from "lucide-react";
// import { DialogTrigger } from "./ui/dialog";

export interface CartItemProps {
    sectionId: string;
    sectionName: string;
    sectionTime: string;
    sectionSeats: string;
    sectionInstructor: string;
    onClick: any
    // credits: number;
}

export function CartItem(props: CartItemProps) {

    return(
        <TableRow onClick={props.onClick}>
            <TableCell className="w-2/12 font-medium">{props.sectionName}</TableCell>
            <TableCell className="w-3/12">{props.sectionTime}</TableCell>
            <TableCell className="w-3/12">{props.sectionInstructor}</TableCell>
            {/* <TableCell className="w-1/12">{props.credits}</TableCell> */}
            <TableCell className="w-2/12">{props.sectionSeats}</TableCell>
            <TableCell className="w-1/12 text-right">
                <Button variant={"outline"} className="hover:bg-red-600" onClick={() => removeFromCart(props.sectionId)}>
                    <Trash />
                </Button>
            </TableCell>
        </TableRow>
    )
}