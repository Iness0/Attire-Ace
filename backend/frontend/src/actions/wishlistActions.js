import axios from '../axiosSettings'
import {
    ADD_TO_WISHLIST_REQUEST,
    REMOVE_FROM_WISHLIST,
    ADD_TO_WISHLIST_FAIL,
    ADD_TO_WISHLIST_SUCCESS,
    UPDATE_WISHLIST
} from "../constants/wishlistConstants";


export const addToWishlist = (id, size='') => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADD_TO_WISHLIST_REQUEST,
        })
        const {data} = await axios.get(`/api/products/${id}/`)
        dispatch({
            type: ADD_TO_WISHLIST_SUCCESS,
            payload: {
                product: data.product._id,
                name: data.product.name,
                image: data.product.image,
                price: data.product.price,
                sizes: data.product.sizes,
                size,
                size_id: data.product._id + size
            },
        })
        localStorage.setItem('wishlist', JSON.stringify(getState().wishlist.wishlist))

    } catch
        (error) {
        dispatch({
            type: ADD_TO_WISHLIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
        console.log(error.message)
    }
}


export const removeFromWishlist = (size_id) => (dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_WISHLIST,
        payload: {size_id}
    })
    localStorage.setItem('wishlist', JSON.stringify(getState().wishlist.wishlist))
}

export const updateWishlist = (id, old_size_id, size) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}/`)
    dispatch({
        type: UPDATE_WISHLIST,
        payload: {
            product: data.product._id,
            name: data.product.name,
            image: data.product.image,
            price: data.product.price,
            sizes: data.product.sizes,
            size,
            size_id: data.product._id + size,
            old_size_id,
        }
    });
    localStorage.setItem('wishlist', JSON.stringify(getState().wishlist.wishlist))
};