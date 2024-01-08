import React from "react";
import UseAnimations from "react-useanimations";
import menu2 from 'react-useanimations/lib/menu2';
import { useTheme } from "next-themes";

const MenuIcon = () => {
  const { theme } = useTheme();

  return (
    <UseAnimations
    animation={menu2}
    size={32}
    strokeColor="currentColor"
  />
  )
}

export default MenuIcon;