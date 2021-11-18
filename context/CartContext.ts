import React from 'react';
import { CartContextType } from '../types/context';

export const CartContext = React.createContext<CartContextType | undefined>(
  undefined
);
