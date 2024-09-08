import { useState } from 'react'
import { Input } from '../components/ui/input'
import { Loader2, Mail } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'

export const ForgotPassword = () => {
    const [email, setEmail] = useState<string>("");

    const { forgotPassword, loading } = useUserStore();

    return (
        <div className="flex items-center justify-center h-screen">
            <form className="md:p-8 w-full max-w-md shadow-lg  md:border text-center  border-gray-200 rounded-lg mx-4">
                <div className="mb-7">
                    <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
                    <p className='text-sm text-gray-600'>Enter your email address to reset your password</p>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="relative">
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="pl-10 focus-visible:ring-1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Mail className="absolute top-2 left-2 text-gray-500 pointer-events-none" size={22} />
                        {/* {errors && <p className="text-[13px] text-red-500 pl-10 text-start">{errors.email}</p>} */}

                    </div>
                    <div className="py-2 w-full ">
                        {loading ? <Button disabled className="bg-orange w-full hover:bg-hoverOrange"><Loader2 className="mr-2 animate-spin h-4 w-4" />Please wait...</Button> :
                            <Button onClick={() => forgotPassword(email)} className="bg-orange w-full hover:bg-hoverOrange">Send Reset Link</Button>
                        }
                    </div>
                    <span>Back to <Link to="/login" className='text-orange hover:underline'>Login</Link></span>
                </div>
            </form>
        </div>
    )
}
