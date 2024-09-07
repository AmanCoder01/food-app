import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCartStore = create<any>()(persist((set) => ({
    cart: [],

    addToCart: (item: any) => {
        set((state: any) => {
            const existingItem = state.cart.find((cartItem: any) => cartItem._id === item._id);

            if (existingItem) {
                return {
                    cart: state.cart.map((cartItem: any) => cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
                }
            } else {
                return {
                    cart: [...state.cart, { ...item, quantity: 1 }]
                }
            }
        })
    },
    clearCart: () => {
        set({ cart: [] })
    },
    removeFromTheCart: (id: string) => {
        set((state: any) => ({
            cart: state.cart.map((cartItem: any) => cartItem._id !== id)
        }))
    },
    incrementQuantity: (id: string) => {
        set((state: any) => ({
            cart: state.cart.map((cartItem: any) => cartItem._id === id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
        }))
    },
    decrementQuantity: (id: string) => {
        set((state: any) => ({
            cart: state.cart.map((cartItem: any) => cartItem._id === id && cartItem.quantity > 1 ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)
        }))
    }

}),
    {
        name: "cart-name",
        storage: createJSONStorage(() => localStorage)
    }
))