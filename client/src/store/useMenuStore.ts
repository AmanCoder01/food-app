import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useRestaurantStore } from "./useRestaurantStore";

const API_END_POINT = "http://localhost:8000/api/v1/menu";
axios.defaults.withCredentials = true;

type MenuState = {
    loading: boolean,
    menu: null,
    createMenu: (formData: FormData, setOpen: any, setInput: any) => Promise<void>;
    editMenu: (menuId: string, formData: FormData, setEditOpen: any) => Promise<void>;
}

export const useMenuStore = create<MenuState>()(persist((set) => ({
    loading: false,
    menu: null,
    createMenu: async (formData: FormData, setOpen: any, setInput: any) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success(response.data.message);
            set({ loading: false, menu: response.data.menu });
            setOpen(false);
            setInput({
                name: "",
                description: "",
                price: 0,
                image: undefined,
            })

            // update restaurant 
            useRestaurantStore.getState().addMenuToRestaurant(response.data.menu);
        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    editMenu: async (menuId: string, formData: FormData, setEditOpen: any) => {
        try {
            set({ loading: true });
            const response = await axios.put(`${API_END_POINT}/${menuId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success(response.data.message);
            set({ loading: false, menu: response.data.menu });
            setEditOpen(false);

            // update restaurant menu
            useRestaurantStore.getState().updateMenuToRestaurant(response.data.menu);
        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
}), {
    name: "menu-name",
    storage: createJSONStorage(() => localStorage)
}))