import { useEffect } from "react";
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { useRestaurantStore } from "../store/useRestaurantStore"

export const Orders = () => {

    const { restaurantOrder, getRestaurantOrders, updateRestaurantOrder } =
        useRestaurantStore();

    const handleStatusChange = async (id: string, status: string) => {
        await updateRestaurantOrder(id, status);
    };
    useEffect(() => {
        getRestaurantOrders();
    }, []);


    return (
        <div className="w-full px-4 md:max-w-6xl mx-auto py-10">
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-10">
                Orders Overview
            </h1>
            <div className="space-y-8">
                {restaurantOrder.map((order: any) => (
                    <div key={order._id} className="flex flex-col md:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
                        <div className="flex-1 mb-6 sm:mb-0">
                            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                {order.deliveryDetails.name}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                <span className="font-semibold">Address: </span>
                                {order.deliveryDetails.address}  {order.deliveryDetails.city}
                            </p>
                            <div className="text-gray-600 dark:text-gray-400 mt-2 flex flex-col justify-center ">

                                <div className="flex items-center gap-1">
                                    <h1>Orders :</h1>
                                    <div className="flex items-center gap-2">
                                        {
                                            order.cartItems.map((item: any) => (
                                                <div key={item._id} className="flex items-center gap-1">
                                                    <img src={item.image} alt={item.name} className="w-8 h-8 rounded-full " />
                                                    <p className="text-gray-600 dark:text-gray-400">{item.name}</p>
                                                    <p className="text-gray-600 dark:text-gray-400">x{item.quantity}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                                <div className="flex items-center gap-1">
                                    <h1>Amounts :</h1>
                                    <div className="flex items-center gap-2">
                                        {
                                            order.cartItems.map((item: any) => (
                                                <div key={item._id} className="flex items-center gap-1">
                                                    <p className="text-gray-600 dark:text-gray-400">{item.price}</p>
                                                    <p className="text-gray-600 dark:text-gray-400">x{item.quantity}</p>
                                                </div>
                                            ))
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="w-full sm:w-1/3">
                            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Order Status
                            </Label>
                            <Select
                                onValueChange={(newStatus) =>
                                    handleStatusChange(order._id, newStatus)
                                }
                                defaultValue={order.status}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {[
                                            "Pending",
                                            "Confirmed",
                                            "Preparing",
                                            "OutForDelivery",
                                            "Delivered",
                                        ].map((status: string, index: number) => (
                                            <SelectItem key={index} value={status.toLowerCase()}>
                                                {status}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    )
}
