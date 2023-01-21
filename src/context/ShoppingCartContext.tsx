import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};
type ShoppingCartContext = {
  cartQuantity: number;
  cartItems: CartItem[];
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
};

export type CartItem = {
  id: number;
  quantity: number;
};

export const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart',[]);
  const [IsOpen, setIsOpen] = useState<boolean>(false);

  const openCart = () => {
    setIsOpen(true)
  }
  const closeCart = () => {
    setIsOpen(false)
  }

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseCartQuantity = (id: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) === undefined) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCartQuantity = (id: number) => {
    setCartItems((prevState) => {
      if (prevState.find((item) => item.id === id)?.quantity === 1) {
        return prevState.filter((item) => item.id !== id);
      } else {
        return prevState.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevState) => {
      return prevState.filter((item) => item.id !== id);
    });
  };

  const cartQuantity = cartItems.reduce(
    (accumulator, item) => accumulator + item.quantity,0
  );
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems: cartItems,
        cartQuantity:cartQuantity,
        openCart,
        closeCart

      }}
    >
      {children}
      <ShoppingCart isOpen={IsOpen} cartItems={cartItems}/>
    </ShoppingCartContext.Provider>
  );
}
