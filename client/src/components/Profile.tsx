import { Loader2, LocateIcon, Mail, MapPin, MapPinnedIcon, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { FormEvent, useRef, useState } from "react"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useUserStore } from "../store/useUserStore";

export const Profile = () => {
    const [selectedProfilePicture, setSelectedProfilePicture] = useState<string>("");
    const { user } = useUserStore();



    const [profileData, setProfileData] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        address: user?.address || "",
        city: user?.city || "",
        country: user?.country || "",
        profilePicture: user?.profilePicture || "",
    });

    const { updateProfile, loading } = useUserStore();


    const imageRef: any = useRef(null);

    const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setProfileData((prev: any) => ({
            ...prev,
            profilePicture: file
        }))

        const reader = new FileReader();

        reader.onloadend = () => {
            const result = reader.result as string;
            setSelectedProfilePicture(result);

        }

        reader.readAsDataURL(file);
    }


    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value })
    }


    const updateProfileHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        const formData = new FormData();
        formData.append('profilePicture', profileData.profilePicture);
        formData.append('fullname', profileData.fullname);
        formData.append('email', profileData.email);
        formData.append('address', profileData.address);
        formData.append('city', profileData.city);
        formData.append('country', profileData.country);

        updateProfile(formData);

    }

    return (
        <form className="w-full px-4 md:max-w-7xl mx-auto my-5" onSubmit={updateProfileHandler}>
            <div className="flex items-center">
                <div className="flex items-center gap-2">
                    <Avatar className="relative w-20 h-20 md:w-28 md:h-28">
                        <AvatarImage src={selectedProfilePicture ? selectedProfilePicture : profileData?.profilePicture} />
                        <AvatarFallback>AM</AvatarFallback>

                        <input ref={imageRef} type="file" className="hidden" accept="image/*"
                            onChange={fileChangeHandler}
                        />

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-opacity-50 rounded-full cursor-pointer bg-black"
                            onClick={() => imageRef.current?.click()}
                        >
                            <Plus className="text-white w-8 h-8" />
                        </div>
                    </Avatar>

                    <Input
                        type="text"
                        name="fullname"
                        value={profileData.fullname}
                        onChange={changeHandler}
                        className="font-bold text-xl md:text-2xl outline-none border-none focus-visible:ring-transparent "
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10">
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
                    <Mail className="text-gray-500" />
                    <div className="w-full">
                        <Label>Email</Label>
                        <input
                            disabled
                            name="email"
                            value={profileData.email}
                            onChange={changeHandler}
                            className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
                    <LocateIcon className="text-gray-500" />
                    <div className="w-full">
                        <Label>Address</Label>
                        <input
                            name="address"
                            value={profileData.address}
                            onChange={changeHandler}
                            className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
                    <MapPin className="text-gray-500" />
                    <div className="w-full">
                        <Label>City</Label>
                        <input
                            name="city"
                            value={profileData.city}
                            onChange={changeHandler}
                            className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
                    <MapPinnedIcon className="text-gray-500" />
                    <div className="w-full">
                        <Label>Country</Label>
                        <input
                            name="country"
                            value={profileData.country}
                            onChange={changeHandler}
                            className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
                        />
                    </div>
                </div>

            </div>

            <div className="text-center">
                {loading ? (
                    <Button disabled className="bg-orange hover:bg-hoverOrange">
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Please wait
                    </Button>
                ) : (
                    <Button type="submit" className="bg-orange hover:bg-hoverOrange">Update</Button>
                )}
            </div>
        </form>
    )
}
