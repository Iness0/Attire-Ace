import {
    ADD_TO_WISHLIST_REQUEST,
    ADD_TO_WISHLIST_SUCCESS,
    REMOVE_FROM_WISHLIST,
    UPDATE_WISHLIST
} from "../constants/wishlistConstants";
import React from "react";


export const wishlistReducer = (
    state = {wishlist: []}, action) => {
    switch (action.type) {
        case ADD_TO_WISHLIST_REQUEST:
            return {...state};

        case ADD_TO_WISHLIST_SUCCESS:
            const item = action.payload
            const existItem = state.wishlist.find((x) => x.size_id === item.size_id
            );

            if (existItem) {
                return {
                    ...state,
                    wishlist: state.wishlist.map((x) =>
                        x.size_id === existItem.size_id ? item : x
                    ),
                };

            } else {
                return {
                    ...state,
                    wishlist: [...state.wishlist, item]
                };
            }


        case UPDATE_WISHLIST:
            const updatedLoad = action.payload
            const itemToUpdate = state.wishlist.find((x) => x.size_id === action.payload.old_size_id)
            const copyItem = state.wishlist.find((x) => x.size_id === action.payload.size_id)
            if (copyItem) {
                return {
                    ...state,
                    wishlist: state.wishlist.filter((x) => x.size_id !== itemToUpdate.size_id)
                };
            } else {
                return {
                    ...state,
                    wishlist: state.wishlist.map((x) =>
                        x.size_id === itemToUpdate.size_id ? updatedLoad : x)
                };
            }

        case REMOVE_FROM_WISHLIST:
            return {
                ...state,
                wishlist: state.wishlist.filter((x) => x.size_id !== action.payload.size_id)
            };

        default:
            return state
    }
};