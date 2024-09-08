import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// const API_END_POINT: string = "http://localhost:8000/api/v1/order";
const API_END_POINT: string = "https://hungerhub-xbmp.onrender.com/api/v1/order";
axios.defaults.withCredentials = true;


export const useOrderStore = create<any>()(persist((set) => ({
    loading: false,
    orders: [],
    createCheckoutSession: async (checkoutSession: any) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/checkout/create-checkout-session`, checkoutSession, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            window.location.href = response.data.session.url;
            set({ loading: false });
        } catch (error) {
            console.log(error);
            set({ loading: false });
        }
    },
    getOrderDetails: async () => {
        try {
            set({ loading: true });
            const response = await axios.get(`${API_END_POINT}/`);

            set({ loading: false, orders: response.data.orders });
        } catch (error) {
            console.log(error);
            set({ loading: false });
        }
    }
}),
    {
        name: 'order-name',
        storage: createJSONStorage(() => localStorage)
    }
))