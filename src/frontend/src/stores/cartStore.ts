import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BookingDetails {
  devoteeName: string;
  email: string;
  phone: string;
  preferredDate: string;
  location?: string;
  specialRequests?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  variantName?: string;
  // Extended for service bookings
  type?: "product" | "service";
  bookingDetails?: BookingDetails;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => {
        // Service bookings always create a new cart line (each booking is unique)
        if (item.type === "service") {
          set((state) => ({
            items: [...state.items, { ...item, quantity: 1 }],
          }));
          return;
        }

        const itemKey = item.variantName
          ? `${item.id}__${item.variantName}`
          : item.id;
        const existing = get().items.find((i) => {
          const iKey = i.variantName ? `${i.id}__${i.variantName}` : i.id;
          return iKey === itemKey;
        });
        if (existing) {
          set((state) => ({
            items: state.items.map((i) => {
              const iKey = i.variantName ? `${i.id}__${i.variantName}` : i.id;
              return iKey === itemKey ? { ...i, quantity: i.quantity + 1 } : i;
            }),
          }));
        } else {
          set((state) => ({
            items: [...state.items, { ...item, quantity: 1 }],
          }));
        }
      },
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }));
      },
      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setCartOpen: (open) => set({ isOpen: open }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: "spiritual-cart" },
  ),
);
