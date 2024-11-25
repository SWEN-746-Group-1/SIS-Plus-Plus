'use client'

import { removeFromCart } from "@/app/cart/addToCart";
import { Button } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import { Trash } from "lucide-react";

export interface CartItemProps {
    sectionId: string;
    sectionName: string;
    sectionTime: string;
    sectionSeats: string;
    // sectionInstructor: string;
    // sectionLocation: string;
}

export function CartItem(props: CartItemProps) {
    return(
        <TableRow>
            <TableCell className="font-medium">{props.sectionName}</TableCell>
            <TableCell>{props.sectionTime}</TableCell>
            <TableCell>{props.sectionSeats}</TableCell>
            {/* <TableCell>{props.sectionInstructor}</TableCell>
            <TableCell>{props.sectionLocation}</TableCell> */}
            <TableCell className="text-right"><Button variant={"outline"} onClick={() => removeFromCart(props.sectionId)}><Trash /></Button></TableCell>
          </TableRow>
    )
}