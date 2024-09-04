import React, { useState } from 'react'
import { Input } from '../components/ui/input'
import { Loader2, Lock, Mail } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'

export const ResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState<string>("");

    return (
        <div className="flex items-center justify-center h-screen">
            <form className="md:p-8 w-full max-w-md md:shadow-lg  md:border text-center  border-gray-200 rounded-lg mx-4">
                <div className="mb-7">
                    <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
                    <p className='text-sm text-gray-600'>Enter your new password to reset your password</p>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="relative">
                        <Input
                            type="password"
                            name="password"
                            placeholder="Enter your new password"
                            className="pl-10 focus-visible:ring-1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Lock className="absolute top-2 left-2 text-gray-500 pointer-events-none" size={22} />
                        {/* {errors && <p className="text-[13px] text-red-500 pl-10 text-start">{errors.email}</p>} */}

                    </div>
                    <div className="py-2 w-full ">
                        {loading ? <Button disabled className="bg-orange w-full hover:bg-hoverOrange"><Loader2 className="mr-2 animate-spin h-4 w-4" />Please wait...</Button> :
                            <Button className="bg-orange w-full hover:bg-hoverOrange">Reset </Button>
                        }
                    </div>
                    <span>Back to <Link to="/login" className='text-orange hover:underline'>Login</Link></span>
                </div>
            </form>
        </div>
    )
}
