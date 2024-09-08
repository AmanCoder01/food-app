import { Timer } from "lucide-react"
import { Badge } from "./ui/badge"
import { AvailableMenu } from "./AvailableMenu"
import { useRestaurantStore } from "../store/useRestaurantStore"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

export const RestaurantDetail = () => {
    const params = useParams();

    const { singleRestaurant, getSingleRestaurant } = useRestaurantStore();


    useEffect(() => {
        getSingleRestaurant(params.id)
    }, [params.id])

    return (
        <div className="w-full px-4 md:max-w-6xl mx-auto my-6 md:my-10">
            <div className="w-full">
                <div className="relative w-full h-32 md:h-64 lg:h-72">
                    <img src={singleRestaurant?.imageUrl} alt=""
                        className="object-cover w-full h-full rounded-lg shadow-lg"
                    />
                </div>

                <div className="flex flex-col my-2">
                    <h1 className="text-xl font-medium">{singleRestaurant?.restaurantName}</h1>
                    <div className="my-2 flex gap-2">
                        {singleRestaurant?.cuisines?.map(
                            (cuisine: string, idx: number) => (
                                <Badge
                                    key={idx}
                                    className="font-medium px-2 py-1 rounded-full shadow-sm"
                                >
                                    {cuisine}
                                </Badge>
                            )
                        )}
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                        <Timer className="w-5 h-5" />
                        <h1>Delivery Time : {" "}<span className="text-[#d19254]">{singleRestaurant?.deliveryTime} mins</span></h1>
                    </div>
                </div>


                {singleRestaurant?.menus && <AvailableMenu menus={singleRestaurant?.menus} />}
            </div>
        </div>
    )
}
