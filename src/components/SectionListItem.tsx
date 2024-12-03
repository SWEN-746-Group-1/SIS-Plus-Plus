'use client'

import { addToCart, removeFromCart } from "@/app/cart/addToCart";
import { Button } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import { ShoppingCart, Trash } from "lucide-react";

export interface SectionListItemProps {
    sectionId: string;
    sectionName: string;
    sectionTime: string;
    sectionSeats: string;
    sectionInstructor: string;
    sectionLocation: string;
    inCart: boolean | null;
}

export function SectionListItem(props: SectionListItemProps) {
    return(
        <TableRow>
            <TableCell className="font-medium">{props.sectionName}</TableCell>
            <TableCell>{props.sectionTime}</TableCell>
            <TableCell>{props.sectionSeats}</TableCell>
            <TableCell>{props.sectionInstructor}</TableCell>
            <TableCell>{props.sectionLocation}</TableCell>
            {
                
            }
            {props.inCart !== null ? props.inCart ? (
                <TableCell className="text-right"><Button variant={"outline"} onClick={() => removeFromCart(props.sectionId, '/search')}><Trash /></Button></TableCell>
            ) : (
                <TableCell className="text-right"><Button onClick={() => addToCart(props.sectionId, '/search')}><ShoppingCart /></Button></TableCell>
            ) : null}
          </TableRow>
    )
}