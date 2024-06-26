"use client"

import { EllipsisVertical, Pen, Trash2 } from "lucide-react"
import Link from "next/link"
import { Coupon } from "@prisma/client"
import { format } from "date-fns"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

import { cn } from "@/lib/utils"
import { useCoupon } from "@/hooks/use-coupon"
import { Empty } from "@/components/empty"

interface Props {
    coupons: Coupon[];
}

export const CouponList = ({ coupons }: Props) => {
    const { onOpen } = useCoupon()
    
    return (
        <>
            {
                coupons.length < 1 ? (
                    <Empty title="No Coupon Found" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="px-1">Image</TableHead>
                            <TableHead className="px-1">Name</TableHead>
                            <TableHead className="px-1">Code</TableHead>
                            <TableHead className="px-1">Value</TableHead>
                            <TableHead className="px-1">Start</TableHead>
                            <TableHead className="px-1">End</TableHead>
                            <TableHead className="px-1">Status</TableHead>
                            <TableHead className="px-1">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                coupons.map(coupon => (
                                <TableRow key={coupon.id}>
                                    <TableCell className="px-1 py-2">
                                        <Avatar className="w-9 h-9">
                                            <AvatarImage src={coupon.imageUrl || ""} />
                                            <AvatarFallback>C</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="px-1 py-2">{coupon.name}</TableCell>
                                    <TableCell className="px-1 py-2 uppercase">{coupon.code}</TableCell>
                                    <TableCell className="px-1 py-2 uppercase">{coupon.value}</TableCell>
                                    <TableCell className="px-1 py-2 uppercase">{format(coupon.startDate, "dd MMMM yyyy")}</TableCell>
                                    <TableCell className="px-1 py-2 uppercase">{format(coupon.startDate, "dd MMMM yyyy")}</TableCell>
                                    <TableCell className="px-1 py-2 uppercase">
                                        <Badge className={cn("text-white bg-green-500", coupon.status === "inactive" && "bg-rose-500")}>{coupon.status}</Badge>    
                                    </TableCell>
                                    <TableCell className="px-1 py-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild> 
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <EllipsisVertical className="h-4 w-4" />
                                            </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/dashboard/coupon/edit/${coupon.id}`} className="flex items-center gap-x-3">
                                                        <Pen className="w-4 h-4" />
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="w-flex items-center gap-x-3" onClick={() => onOpen(coupon.id)}>
                                                    <Trash2 className="text-rose-500 w-4 h-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                )
            }
        </>
    )
}