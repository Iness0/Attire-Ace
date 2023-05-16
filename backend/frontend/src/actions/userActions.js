import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_REQUEST,
    USER_REGISTER_FAIL,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_REQUEST,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_DETAILS_RESET,
    USER_LIST_RESET,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_UPDATE_REQUEST,
    USER_UPDATE_FAIL,
    USER_UPDATE_SUCCESS,
    USER_ADDRESS_REQUEST,
    USER_ADDRESS_FAIL,
    USER_ADDRESS_CREATE_REQUEST,
    USER_ADDRESS_CREATE_SUCCESS,
    USER_ADDRESS_CREATE_FAIL,
    USER_ADDRESS_SUCCESS,
    USER_ADDRESS_DELETE_REQUEST,
    USER_ADDRESS_DELETE_SUCCESS,
    USER_ADDRESS_DELETE_FAIL,
    USER_ADDRESS_UPDATE_REQUEST,
    USER_ADDRESS_UPDATE_SUCCESS,
    USER_ADDRESS_UPDATE_FAIL,
    USER_INFO_GET_REQUEST,
    USER_INFO_GET_FAIL,
    USER_INFO_GET_SUCCESS,
    USER_INFO_GET_RESET,
} from "../constants/userConstants";
import axios from '../axiosSettings'
import {ORDER_LIST_MY_RESET} from "../constants/orderConstants";


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });


        const {data} = await axios.post(
            '/api/users/login/',
            {'username': email, 'password': password})

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data.user
        })

        // localStorage.setItem('userInfo', JSON.stringify(data.user))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}

export const getUserInfo = () => async (dispatch) => {
    try {
        dispatch({type: USER_INFO_GET_REQUEST});
        const {data} = await axios.get('/api/users/profile/')
        dispatch({
            type: USER_INFO_GET_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_INFO_GET_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}


export const logout = () => async (dispatch) => {
    try {
        const response = await axios.post('/api/users/logout/', {}, {
            withCredentials: true,
        });
        if (response.status === 200) {
            dispatch({type: USER_LOGOUT})
            dispatch({type: USER_DETAILS_RESET})
            dispatch({type: ORDER_LIST_MY_RESET})
            dispatch({type: USER_LIST_RESET})
            dispatch({type: USER_INFO_GET_RESET})
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
}


export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        });

        const {data} = await axios.post(
            '/api/users/register/',
            {'name': name, 'email': email, 'password': password})

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}


export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        });


        const {data} = await axios.get(
            `/api/users/${id}/`,
        );

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}


export const updateUserProfile = (user) => async (dispatch) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        });

        const {data} = await axios.put(
            `/api/users/profile/update/`,
            user)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}


export const listUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST,
        });


        const {data} = await axios.get(
            `/api/users/`,
        )

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};


export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST,
        });

        const {data} = await axios.delete(
            `/api/users/delete/${id}/`)

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}


export const updateUser = (user) => async (dispatch) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST,
        });



        const {data} = await axios.put(
            `/api/users/update/${user._id}/`,
            user)

        dispatch({
            type: USER_UPDATE_SUCCESS,
        })

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}

export const getAddress = () => async (dispatch) => {
    try {
        dispatch({
            type: USER_ADDRESS_REQUEST,
        })


        const {data} = await axios.get(
            `/api/users/address/`,
        )

        dispatch({
            type: USER_ADDRESS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_ADDRESS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}


export const createAddress = (address) => async (dispatch) => {
    try {
        dispatch({
            type: USER_ADDRESS_CREATE_REQUEST,
        })


        const {data} = await axios.post(
            `/api/users/address/create/`,
            address)

        dispatch({
            type: USER_ADDRESS_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_ADDRESS_CREATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}


export const deleteAddress = (pk) => async (dispatch) => {
    try {
        dispatch({
            type: USER_ADDRESS_DELETE_REQUEST,
        })


        const {data} = await axios.delete(
            `/api/users/address/delete/${pk}/`,
        )

        dispatch({
            type: USER_ADDRESS_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_ADDRESS_DELETE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}


export const updateAddress = (address) => async (dispatch) => {
    try {
        dispatch({
            type: USER_ADDRESS_UPDATE_REQUEST,
        })


        const {data} = await axios.put(
            `/api/users/address/update/`,
            address,
        )

        dispatch({
            type: USER_ADDRESS_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_ADDRESS_UPDATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}