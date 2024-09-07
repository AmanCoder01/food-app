import { Card, CardContent, CardFooter } from "./ui/card"
import { Button } from "./ui/button";
import { AspectRatio } from "./ui/aspect-ratio";
import { useCartStore } from "../store/useCartStore";
import { useNavigate } from "react-router-dom";

export const AvailableMenu = ({ menus }: { menus: any }) => {

    const { addToCart } = useCartStore();
    const navigate = useNavigate();

    return (
        <div className="my-4 md:p-4">
            <h1 className="text-xl md:text-2xl mb-6 font-bold">Available Menu</h1>

            <div className="grid md:grid-cols-3  gap-y-6">
                {
                    menus?.length === 0 ? <div>Currently No Menus Found ..Check It Later.. </div> :
                        menus?.map((menu: any, idx: number) => (
                            <Card key={idx} className="md:max-w-xs  mx-auto shadow-lg rounded-lg overflow-hidden ">
                                <AspectRatio ratio={16 / 7}>
                                    <img src={menu?.image} alt="" className="h-full w-full object-cover" />
                                </AspectRatio>

                                <CardContent className="p-4">
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                        {menu?.name}
                                    </h2>
                                    <p className="text-sm text-gray-600 mt-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea, consequuntur.</p>
                                    <h3 className="text-lg font-semibold mt-4">
                                        Price: <span className="text-[#D19254]">₹ {menu?.price}</span>
                                    </h3>
                                </CardContent>
                                <CardFooter className="px-4">
                                    <Button
                                        onClick={() => {
                                            addToCart(menu);
                                            navigate("/cart");
                                        }}
                                        className="w-full bg-orange hover:bg-hoverOrange"
                                    >
                                        Add to Cart
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                }
            </div>
        </div >
    )
}
