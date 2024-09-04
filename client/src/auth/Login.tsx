import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Loader2, LockKeyhole, Mail } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { LoginInputState, userLoginSchema } from "../schema/userSchema"
import { useUserStore } from "../store/useUserStore"

// interface LoginInputState {
//     email: string;
//     password: string;
// }

// type LoginInputState = {
//     email: string;
//     password: string;
// }

export const Login = () => {
    const [errors, setErrors] = useState<Partial<LoginInputState>>({});
    const [input, setInput] = useState<LoginInputState>({
        email: "",
        password: ""
    });

    const { login, loading } = useUserStore();
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value })
    }


    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();

        const result = userLoginSchema.safeParse(input);

        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            setErrors(fieldErrors as Partial<LoginInputState>);
            return;
        }

        await login(input, navigate);
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={submitHandler} className="md:p-8 w-full max-w-md md:shadow-lg  md:border text-center border-gray-200 rounded-lg mx-4">
                <div className="mb-5">
                    <h1 className="text-2xl font-bold">HungerHub</h1>
                </div>

                <div className="flex flex-col gap-3">
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

                    <div className="mt-2 w-full ">
                        {loading ? <Button disabled className="bg-orange w-full hover:bg-hoverOrange"><Loader2 className="mr-2 animate-spin h-4 w-4" />Please wait...</Button> :
                            <Button className="bg-orange w-full hover:bg-hoverOrange">Login</Button>
                        }
                    </div>

                    <Link to="/forgot-password" className="hover:text-blue-500 hover:underline">Forgot Password</Link>

                    <div className="border w-11/12 bg-gray-200 mx-auto"></div>
                </div>


                <p className="mt-3">Don't have an account? {" "}
                    <Link to="/signup" className="text-orange hover:underline">Signup</Link> </p>

            </form>
        </div>
    )
}
