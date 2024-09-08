import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { LoginInputState, SignupInputState } from "../schema/userSchema";
import { toast } from "sonner";

// const API_END_POINT = "http://localhost:8000/api/v1/user"
const API_END_POINT = "https://hungerhub-xbmp.onrender.com/api/v1/user"
axios.defaults.withCredentials = true;


type User = {
    fullname: string;
    email: string;
    contact: number;
    address: string;
    city: string;
    country: string;
    profilePicture: string;
    admin: boolean;
    isVerified: boolean;
    role?: string
}

type UserState = {
    user: User | null;
    isAuthenticated: boolean;
    isCheckingAuth: boolean;
    loading: boolean;
    signup: (input: SignupInputState, navigate: any) => Promise<void>;
    login: (input: LoginInputState, navigate: any) => Promise<void>;
    verifyEmail: (verificationCode: string, navigate: any) => Promise<void>;
    checkAuthentication: () => Promise<void>;
    logout: (navigate: any) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, password: string, navigate: any) => Promise<void>;
    updateProfile: (profileData: any) => Promise<void>;
}

export const useUserStore = create<UserState>()(persist((set) => ({
    user: null,
    isAuthenticated: false,
    isCheckingAuth: false,
    loading: false,

    //signup api implementation
    signup: async (input: SignupInputState, navigate: any) => {
        try {
            set({ loading: true });

            const res = await axios.post(`${API_END_POINT}/signup`, input);

            toast.success(res.data.message);
            set({ loading: false, user: res.data.user, isAuthenticated: true });
            navigate("/verify-email")

        } catch (error: any) {
            set({ loading: false });
            toast.success(error.response.data.message);
        }
    },
    verifyEmail: async (verificationCode: string, navigate: any) => {
        try {
            set({ loading: true });

            const res = await axios.post(`${API_END_POINT}/verify-email`, { verificationCode });

            toast.success(res.data.message);
            set({ loading: false, user: res.data.user, isAuthenticated: true });
            navigate("/")

        } catch (error: any) {
            set({ loading: false });
            toast.success(error.response.data.message);
        }
    },
    login: async (input: LoginInputState, navigate: any) => {
        try {
            set({ loading: true });

            const res = await axios.post(`${API_END_POINT}/login`, input);

            toast.success(res.data.message);
            set({ loading: false, user: res.data.user, isAuthenticated: true });
            navigate("/")

        } catch (error: any) {
            set({ loading: false });
            toast.success(error.response.data.message);
        }
    },
    checkAuthentication: async () => {
        try {
            set({ isCheckingAuth: true });
            const response = await axios.get(`${API_END_POINT}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            set({ isAuthenticated: false, isCheckingAuth: false });
        }
    },
    logout: async (navigate: any) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/logout`);
            toast.success(response.data.message);
            localStorage.clear();
            navigate("/login")
            set({ loading: false, user: null, isAuthenticated: false })
        } catch (error: any) {
            toast.error(error.response.data.message); set({ loading: false });
        }
    },
    forgotPassword: async (email: string) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/forgot-password`, { email });
            toast.success(response.data.message);
            set({ loading: false })
        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    resetPassword: async (token: string, password: string, navigate: any) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/reset-password/${token}`, { newPassword: password });
            toast.success(response.data.message);
            navigate("/login");
            set({ loading: false })
        } catch (error: any) {
            console.log(error);

            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    updateProfile: async (profileData: any) => {
        try {
            set({ loading: true });
            const response = await axios.put(`${API_END_POINT}/profile/update`, profileData);

            toast.success(response.data.message);
            set({ loading: false, user: response.data.user })
        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
}),
    {
        name: "user-name",
        storage: createJSONStorage(() => localStorage),
    }
))