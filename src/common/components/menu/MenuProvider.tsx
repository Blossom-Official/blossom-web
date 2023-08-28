"use client";
import { createContext, PropsWithChildren, useContext } from "react";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuContext = createContext<MenuProps | null>(null);
export const useMenuContext = () => {
  const context = useContext(MenuContext);

  if (context == null) {
    throw new Error("useMenuContext is only available within MenuProvider.");
  }

  return context;
};

export const MenuProvider = ({
  isOpen,
  onClose,
  children,
}: PropsWithChildren<MenuProps>) => {
  return (
    <MenuContext.Provider value={{ isOpen, onClose }}>
      {children}
    </MenuContext.Provider>
  );
};
