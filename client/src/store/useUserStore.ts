import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { LoginInputState, SignupInputState } from "../schema/userSchema";
import { toast } from "sonner";

const API_END_POINT = "http://localhost:8000/api/v1/user"
axios.defaults.withCredentials = true;

export const useUserStore = create<any>()(persist((set) => ({
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
            navigate("/login")
            set({ loading: false, user: null, isAuthenticated: false })
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