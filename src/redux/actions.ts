import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './store';
import { Product } from '../types';

export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

export const setCartItems = (products: Product[]) => {
    return { type: 'SET_CART_ITEMS', payload: products.slice(0, 5) };
};


export const removeFromCart = (productId: number) => {
    return { type: REMOVE_FROM_CART, payload: productId };
};

export const updateQuantity = (productId: number, quantity: number) => {
    return { type: UPDATE_QUANTITY, payload: { productId, quantity } };
};
