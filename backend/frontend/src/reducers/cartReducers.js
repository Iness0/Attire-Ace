import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_CLEAR_ITEMS, CART_UPDATE_ITEM,
} from "../constants/cartConstants";
import React from "react";


export const cartReducer = (
    state= { cartItems: [], shippingAddress: {} }, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find((x) => x.product === item.product && x.size === item.size
            );

            if(existItem) {
                return  {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.product === existItem.product && x.size === existItem.size ? item : x
                    ),
                };

            }else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                };
            }
        case CART_REMOVE_ITEM:
            return{
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload.id || x.size !== action.payload.size)
            }

        case CART_UPDATE_ITEM:
            const updatedLoad = action.payload
                const itemToUpdate = state.cartItems.find((x) => x.size_id === action.payload.old_size_id)
                const copyItem = state.cartItems.find((x) => x.size_id === action.payload.size_id)
                if (copyItem) {
                    return {
                        ...state,
                        cartItems: state.cartItems.filter((x) => x.size_id !== itemToUpdate.size_id)
                    };
                } else {
                    return {
                        ...state,
                        cartItems: state.cartItems.map((x) =>
                            x.size_id === itemToUpdate.size_id ? updatedLoad : x)
                    };
                }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }

        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: []
            }


        default:
            return state
    }
};