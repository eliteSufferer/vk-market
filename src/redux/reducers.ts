import { FETCH_PRODUCTS_SUCCESS, ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY } from './actions';
import { Product, CartItem } from '../types';

interface ProductsState {
    products: Product[];
}

interface CartState {
    cart: CartItem[];
}

const initialProductsState: ProductsState = {
    products: [],
};

const initialCartState: CartState = {
    cart: [],
};

export const productsReducer = (
    state = initialProductsState,
    action: { type: string; payload: any }
): ProductsState => {
    switch (action.type) {
        case FETCH_PRODUCTS_SUCCESS:
            return { ...state, products: action.payload };
        default:
            return state;
    }
};

export const cartReducer = (
    state = initialCartState,
    action: { type: string; payload: any }
): CartState => {
    switch (action.type) {
        case 'SET_CART_ITEMS':
            return { ...state, cart: action.payload.map((product: any) => ({ ...product, quantity: 1 })) };
        case ADD_TO_CART:
            const item = state.cart.find((item) => item.id === action.payload.id);
            if (item) {
                return state;
            } else {
                return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
            }
        case REMOVE_FROM_CART:
            return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
        case UPDATE_QUANTITY:
            const itemToUpdate = state.cart.find((item) => item.id === action.payload.productId);
            if (itemToUpdate) {
                const newQuantity = Math.min(action.payload.quantity, 10);
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.id === action.payload.productId ? { ...item, quantity: newQuantity } : item
                    ),
                };
            }
            return state;
        default:
            return state;
    }
};