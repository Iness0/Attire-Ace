import axios from '../axiosSettings'
import {
    FETCH_SUBCATEGORIES_FAIL, FETCH_SUBCATEGORIES_REQUEST, FETCH_SUBCATEGORIES_SUCCESS,
} from "../constants/filterConstants";


export const getCategories = (category, gender) => async (dispatch) => {
    try {
        dispatch({
            type: FETCH_SUBCATEGORIES_REQUEST})
        const {data} = await axios.get(`/api/products/category/${category}/?gender=${gender}`);

        dispatch({
            type: FETCH_SUBCATEGORIES_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: FETCH_SUBCATEGORIES_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
                : error.message,
        })
    }
}
