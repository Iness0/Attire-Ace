import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_FAIL,
    SET_GENDER,
    PRODUCT_LIST_APPEND
} from "../constants/productConstants";
import axios from '../axiosSettings'


export const listProducts = (gender = 'men',
                             category = null,
                             sort = null,
                             queryObj
) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})
        const baseUrl = category
            ? `/api/products/${gender}/cat/${category}/`
            : `/api/products/${gender}/cat/`;

        const queryParams = new URLSearchParams();
        queryObj && Object.keys(queryObj).forEach(key => {
            if (queryObj[key]) {
                queryParams.append(key, queryObj[key])
            }
        });
        sort && queryParams.append('sort', sort)

        const url = `${baseUrl}?${queryParams.toString()}`;
        const {data} = await axios.get(url)
        if (queryObj.page && parseInt(queryObj.page) > 1) {
            dispatch({
                type: PRODUCT_LIST_APPEND,
                payload: data,
            });
        } else {

            dispatch({
                type: PRODUCT_LIST_SUCCESS,
                payload: data
            })
        }
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const searchProducts = (keyword, page) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})

        const queryParams = new URLSearchParams();
        queryParams.append("keyword", keyword);
        queryParams.append("page", page);
        const url = `/api/products/search/?${queryParams.toString()}`;

        const {data} = await axios.get(url)

        if (parseInt(page) > 1) {
            dispatch({
                type: PRODUCT_LIST_APPEND,
                payload: data,
            });
        } else {
            dispatch({
                type: PRODUCT_LIST_SUCCESS,
                payload: data
            })

        }
    } catch
        (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const setGender = (gender) => async (dispatch, getState) => {
    dispatch({
        type: SET_GENDER,
        payload: {gender}
    });
    localStorage.setItem('preferences', JSON.stringify(getState().preferences))
};


export const listProductdetails = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST});

        const {data} = await axios.get(`/api/products/${id}/`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};


export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        });

        const {data} = await axios.delete(
            `/api/products/delete/${id}/`
        )

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}


export const createProduct = () => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST,
        });

        const {data} = await axios.post(
            `/api/products/create/`,
            {})

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}


export const updateProduct = (product) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST,
        });


        const {data} = await axios.put(
            `/api/products/update/${product._id}/`,
            product)

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}


export const createProductReview = (productId, review) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST,
        });


        const {data} = await axios.post(
            `/api/products/${productId}/reviews/`,
            review)

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}
