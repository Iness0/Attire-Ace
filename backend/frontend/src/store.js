import { configureStore } from '@reduxjs/toolkit'
import {
    productTopRatedReducer,
    productCreateReviewReducer,
    productDeleteReducer,
    productListReducer,
    productDetailsReducer,
    productCreateReducer,
    productUpdateReducer,
    setPreferencesReducer
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {
    userUpdateReducer,
    userDeleteReducer,
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    getAddressesReducer, createAddressesReducer, deleteAddressesReducer, updateAddressesReducer, userInfoReducer
} from "./reducers/userReducers";
import {
    orderListReducer,
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
    orderDeliverReducer
} from "./reducers/orderReducers";
import { wishlistReducer } from "./reducers/wishlistReducers";
import {categoryReducer} from "./reducers/categoryReducers";


const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {};

const wishlistItems = localStorage.getItem('wishlist')
    ? JSON.parse(localStorage.getItem('wishlist'))
    : [];

const preferencesFromStorage = localStorage.getItem('preferences')
    ? JSON.parse(localStorage.getItem('preferences'))
    : [];

const paymentFromStorage = localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : [];

const initialState = {
    preferences: preferencesFromStorage,
    cart:{
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentFromStorage},
    wishlist:{
        wishlist: wishlistItems},
    };


const store = configureStore({ reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productUpdate: productUpdateReducer,
    productCreate: productCreateReducer,
    productReviewCreate: productCreateReviewReducer,
    productTopRated: productTopRatedReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userList: userListReducer,
    userInfo: userInfoReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderList: orderListReducer,
    orderListMy: orderListMyReducer,
    orderDeliver: orderDeliverReducer,
    preferences: setPreferencesReducer,
    categories: categoryReducer,
    addresses: getAddressesReducer,
    addressesCreate: createAddressesReducer,
    addressesDelete: deleteAddressesReducer,
    addressesUpdate: updateAddressesReducer,
    },
    preloadedState: initialState,
    })


export default store