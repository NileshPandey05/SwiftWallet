"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode,
  onClick: () => void
}

export const Button = ({ children, onClick}: ButtonProps) => {
  return (
    <button
      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-6 py-3 text-center transition-all duration-200 transform hover:scale-105"
      onClick={onClick}
    >
      {children}
    </button>
  );
};