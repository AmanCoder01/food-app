import { Minus, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table"
import { CheckoutConfirmPage } from "./CheckoutConfirmPage"
import { useState } from "react"

export const Cart = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="flex flex-col max-w-7xl mx-auto my-10">
            <div className="flex justify-end">
                <Button variant="link">Clear All</Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Items</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="text-right">Remove</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Avatar>
                                <AvatarImage />
                                <AvatarFallback>AM</AvatarFallback>
                            </Avatar>
                        </TableCell>

                        <TableCell>
                            Tandoori Biryani
                        </TableCell>

                        <TableCell>
                            100
                        </TableCell>

                        <TableCell>
                            <div className="w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                                <Button size={"icon"} variant={"outline"} className="rounded-full bg-gray-200   ">
                                    <Minus />
                                </Button>
                                <span className="text-lg px-3 font-medium">
                                    1
                                </span>
                                <Button size={"icon"} variant={"outline"} className="rounded-full bg-gray-200   ">
                                    <Plus />
                                </Button>
                            </div>
                        </TableCell>

                        <TableCell>
                            100
                        </TableCell>

                        <TableCell className="text-right">
                            <Button className="bg-orange hover:bg-hoverOrange">Remove</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>

                <TableFooter>
                    <TableRow className="text-2xl font-bold">
                        <TableCell colSpan={5}>Total</TableCell>
                        <TableCell>100</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>

            <div className="flex justify-end my-5 mt-7">
                <Button
                    onClick={() => setOpen(true)}
                    className="bg-orange hover:bg-hoverOrange"
                >
                    Proceed To Checkout
                </Button>
            </div>
            <CheckoutConfirmPage open={open} setOpen={setOpen} />
        </div>
    )
}
