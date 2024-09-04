import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Loader2, LockKeyhole, Mail, Phone, User } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupInputState, userSignupSchema } from "../schema/userSchema"
import { useUserStore } from "../store/useUserStore"


// type SignupInputState = {
//     fullname: string,
//     email: string;
//     password: string;
//     contact: string
// }

export const Signup = () => {
    const [errors, setErrors] = useState<Partial<SignupInputState>>({});
    const [input, setInput] = useState<SignupInputState>({
        fullname: "",
        email: "",
        password: "",
        contact: ""
    });


    const { signup, loading } = useUserStore();
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value })
    }


    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();

        const result = userSignupSchema.safeParse(input);

        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            setErrors(fieldErrors as Partial<SignupInputState>);
            return;
        }

        //api implementation
        await signup(input, navigate);

    }

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={submitHandler} className="md:p-8 w-full text-center  max-w-md md:shadow-lg  md:border border-gray-200 rounded-lg mx-4">
                <div className="mb-5">
                    <h1 className="text-2xl font-bold">HungerHub</h1>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="relative">
                        <Input
                            type="text"
                            name="fullname"
                            placeholder="Fullname"
                            className="pl-10 focus-visible:ring-1"
                            value={input.fullname}
                            onChange={handleChange}
                        />
                        <User className="absolute top-2 left-2 text-gray-500 pointer-events-none" size={22} />
                        {errors && <p className="text-[13px] text-red-500 pl-10 text-start">{errors.fullname}</p>}
                    </div>

                    <div className="relative">
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="pl-10 focus-visible:ring-1"
                            value={input.email}
                            onChange={handleChange}
                        />
                        <Mail className="absolute top-2 left-2 text-gray-500 pointer-events-none" size={22} />
                        {errors && <p className="text-[13px] text-red-500 pl-10 text-start">{errors.email}</p>}

                    </div>

                    <div className="relative">
                        <Input
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="pl-10 focus-visible:ring-1"
                            value={input.password}
                            onChange={handleChange}
                        />
                        <LockKeyhole className="absolute top-2 left-2 text-gray-500 pointer-events-none" size={22} />
                        {errors && <p className="text-[13px] text-red-500 pl-10 text-start">{errors.password}</p>}

                    </div>

                    <div className="relative">
                        <Input
                            name="contact"
                            type="number"
                            placeholder="Contact"
                            className="pl-10 focus-visible:ring-1"
                            value={input.contact}
                            onChange={handleChange}
                        />
                        <Phone className="absolute top-2 left-2 text-gray-500 pointer-events-none" size={22} />
                        {errors && <p className="text-[13px] text-red-500 pl-10 text-start">{errors.contact}</p>}

                    </div>

                    <div className="py-2 w-full ">
                        {loading ? <Button disabled className="bg-orange w-full hover:bg-hoverOrange"><Loader2 className="mr-2 animate-spin h-4 w-4" />Please wait...</Button> :
                            <Button className="bg-orange w-full hover:bg-hoverOrange">Signup</Button>
                        }
                    </div>

                    <div className="border w-11/12 bg-gray-200 mx-auto"></div>
                </div>


                <p className="mt-3">Already have an account? {" "}
                    <Link to="/login" className="text-orange hover:underline">Login</Link> </p>

            </form>
        </div>
    )
}
