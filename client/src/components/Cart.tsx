import { Minus, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table"
import { CheckoutConfirmPage } from "./CheckoutConfirmPage"
import { useState } from "react"
import { useCartStore } from "../store/useCartStore"

export const Cart = () => {
    const [open, setOpen] = useState<boolean>(false);

    const { clearCart, cart, removeFromTheCart, incrementQuantity, decrementQuantity } = useCartStore();

    let totalAmount = cart.reduce((acc: any, ele: any) => {
        return acc + ele.price * ele.quantity;
    }, 0);

    return (
        <div className="flex flex-col w-full px-4 md:max-w-7xl mx-auto my-10">
            <div className="flex justify-end">
                <Button onClick={clearCart} variant="link">Clear All</Button>
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
                    {
                        cart?.map((item: any) => (
                            <TableRow>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={item?.image} />
                                        <AvatarFallback>AM</AvatarFallback>
                                    </Avatar>
                                </TableCell>

                                <TableCell>
                                    {item?.name}
                                </TableCell>

                                <TableCell>
                                    {item?.price}
                                </TableCell>

                                <TableCell>
                                    <div className="w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                                        <Button onClick={() => decrementQuantity(item?._id)} size={"icon"} variant={"outline"} className="rounded-full bg-gray-200   ">
                                            <Minus />
                                        </Button>
                                        <span className="text-lg px-3 font-medium">
                                            {item?.quantity}
                                        </span>
                                        <Button onClick={() => incrementQuantity(item?._id)} size={"icon"} variant={"outline"} className="rounded-full bg-gray-200   ">
                                            <Plus />
                                        </Button>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    {item?.price * item?.quantity}
                                </TableCell>

                                <TableCell className="text-right">
                                    <Button onClick={() => removeFromTheCart(item._id)} size={"sm"} className="bg-orange hover:bg-hoverOrange">Remove</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>

                <TableFooter>
                    <TableRow className="text-2xl font-bold">
                        <TableCell colSpan={5}>Total</TableCell>
                        <TableCell>{totalAmount}</TableCell>
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
