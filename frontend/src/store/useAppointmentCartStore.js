import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppointmentCartStore = create(
  persist(
    (set) => ({
      appointmentCart: [],

      addToCart: (item) =>
        set((state) => {
          /*const exists = state.appointmentCart.find(
            (i) => i.schedulesId === item.schedulesId
          );

          if (exists) return state;*/

          return {
            appointmentCart: [...state.appointmentCart, item],
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          appointmentCart: state.appointmentCart.filter(
            (item) => item.scheduleTimeId !== id
          ),
        })),

      clearCart: () => set({ appointmentCart: [] }),
    }),
    {
      name: "appointment-cart", 
    }
  )
);