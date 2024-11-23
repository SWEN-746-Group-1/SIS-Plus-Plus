"use client"

import { Book, ChevronRight } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

export default function SidebarNav() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Class Selection</SidebarGroupLabel>
      <SidebarMenu>
          <Collapsible
            asChild
            defaultOpen={true}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip="Search">
                  <Book />
                  <span>Search & Enroll</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/search">
                          <span>Search</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                </SidebarMenuSub>
                <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/cart">
                          <span>Cart</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  )
}
