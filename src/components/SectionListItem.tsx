'use client'

export interface SectionListItemProps {
    sectionName: string;
    sectionTime: string;
    sectionSeats: string;
}

export function SectionListItem(props: SectionListItemProps) {
    return(
        <div className="flex w-96">
            <p className="w-1/12">{props.sectionName}</p>
            <p className="w-7/12">{props.sectionTime}</p>
            <p className="w-2/6">{props.sectionSeats}</p>
        </div>
    )
}