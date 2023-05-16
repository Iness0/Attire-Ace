import axios from '../axiosSettings'
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD, CART_UPDATE_ITEM,
} from "../constants/cartConstants";


export const addToCart = (id, size, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}/`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data.product._id,
            name: data.product.name,
            image: data.product.image,
            price: data.product.price,
            sale_price: data.product.sale_price,
            sizes: data.product.sizes,
            size,
            qty,
            availableQty: data.product.sizes.find((sizeItem) => sizeItem.size === size).countInStock,
            size_id: data.product._id + size
        },
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};


export const removeFromCart = (id, size) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: {id, size}
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const updateCartItem = (id, old_size_id, size, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}/`)

    dispatch({
        type: CART_UPDATE_ITEM,
        payload: {
            product: data.product._id,
            name: data.product.name,
            image: data.product.image,
            price: data.product.price,
            sizes: data.product.sizes,
            size,
            qty,
            size_id: data.product._id + size,
            availableQty: data.product.sizes.find((sizeItem) => sizeItem.size === size).countInStock,
            old_size_id,
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}