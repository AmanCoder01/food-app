import { useRef, useState } from 'react'
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';


export const VerifyEmail = () => {
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);


    const inputRef = useRef<any>([]);

    const { verifyEmail, loading } = useUserStore();

    const navigate = useNavigate();


    const handleChange = (index: number, value: string) => {
        if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
            const newOtp = [...otp];

            newOtp[index] = value;
            setOtp(newOtp);
        }

        //move to next field if digit entered
        if (value !== "" && index < 5) {
            inputRef.current[index + 1].focus()
        }
    }


    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRef.current[index - 1].focus();
        }
    };


    const handleSubmit = (e: any) => {
        e.preventDefault();

        verifyEmail(otp.join(""), navigate);
    }



    return (
        <div className="flex items-center justify-center h-screen">
            <div className="md:p-8 w-full max-w-md md:shadow-lg  md:border text-center  border-gray-200 rounded-lg mx-4">
                <div className="mb-7">
                    <h1 className="text-2xl font-bold mb-2">Verify Email</h1>
                    <p className='text-sm text-gray-600'>Enter 6 digit code sent to your email</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='flex items-center  justify-between'>
                        {
                            otp.map((letter: string, idx: number) => (
                                <Input
                                    key={idx}
                                    ref={(element) => (inputRef.current[idx] = element)}
                                    type='text'
                                    value={letter}
                                    maxLength={1}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(idx, e.target.value)}
                                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                                        handleKeyDown(idx, e)
                                    }
                                    className='md:w-12 border-gray-500 md:h-12 rounded-lg w-10 h-10 text-sm md:text-xl font-normal md:font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center'
                                />
                            ))
                        }
                    </div>

                    <div className="mt-6 w-full ">
                        {loading ? <Button disabled className="bg-orange w-full hover:bg-hoverOrange"><Loader2 className="mr-2 animate-spin h-4 w-4" />Please wait...</Button> :
                            <Button className="bg-orange w-full hover:bg-hoverOrange">Verify</Button>
                        }
                    </div>
                </form>

            </div>
        </div>
    )
}
