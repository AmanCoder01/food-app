import { IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useOrderStore } from "../store/useOrderStore";
import { useEffect } from "react";

export const OrderSuccessPage = () => {

    const { orders, getOrderDetails } = useOrderStore();

    useEffect(() => {
        getOrderDetails();
    }, []);


    if (orders.length === 0)
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-300">
                    Order not found!
                </h1>
            </div>
        );


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50  dark:bg-gray-900 px-4">
            <div className="flex flex-col justify-center max-w-4xl mx-auto w-full">
                <h2 className="text-2xl text-center  font-bold text-gray-700 dark:text-gray-300 my-8">
                    Order Summary
                </h2>

                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 md:p-6 max-w-2xl w-full mx-auto ">
                    {orders.map((order: any, index: number) => (
                        <div key={index} className="w-full py-4 border-b-2 border-b-gray-100">
                            <div className="text-center mb-6">
                                <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                                    Order Status:{" "}
                                    <span className="text-[#FF5A5A]">{order.status.toUpperCase()}</span>
                                </h1>
                            </div>
                            {order.cartItems.map((item: any) => (
                                <div className="mb-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <img
                                                src={item.image}
                                                alt=""
                                                className="w-14 h-14 rounded-md object-cover"
                                            />
                                            <h3 className="ml-4 text-gray-800 dark:text-gray-200 font-medium">
                                                {item.name}
                                            </h3>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-gray-800 dark:text-gray-200 flex items-center">
                                                <IndianRupee />
                                                <span className="text-lg font-medium">{item.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                    <Link to="/">
                        <Button className="bg-orange hover:bg-hoverOrange w-full py-3 rounded-md shadow-lg">
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </div>

        </div>
    )
}
