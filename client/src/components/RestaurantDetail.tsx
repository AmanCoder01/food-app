import { Timer } from "lucide-react"
import Image from "../assets/hero_pizza.png"
import { Badge } from "./ui/badge"
import { AvailableMenu } from "./AvailableMenu"

export const RestaurantDetail = () => {
    return (
        <div className="max-w-6xl mx-auto my-6 md:my-10">
            <div className="w-full">
                <div className="relative w-full h-32 md:h-64 lg:h-72">
                    <img src={Image} alt=""
                        className="object-cover w-full h-full rounded-lg shadow-lg"
                    />
                </div>

                <div className="flex flex-col my-2">
                    <h1 className="text-xl font-medium">Tandoori Tadka</h1>
                    <div className="my-2 flex gap-2">
                        {["jalebi", "Pizza", "Egg"].map(
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
                        <h1>Delivery Time : {" "}<span className="text-[#d19254]">35 mins</span></h1>
                    </div>
                </div>


                <AvailableMenu />
            </div>
        </div>
    )
}
