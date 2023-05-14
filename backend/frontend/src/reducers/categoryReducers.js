import {
    FETCH_SUBCATEGORIES_FAIL,
    FETCH_SUBCATEGORIES_REQUEST,
    FETCH_SUBCATEGORIES_SUCCESS
} from "../constants/filterConstants";

export const categoryReducer = (state = {subcategories: [], sizes: []}, action) => {
    switch (action.type) {
        case FETCH_SUBCATEGORIES_REQUEST:
            return {loading: true, subcategories: [], sizes: []};
        case FETCH_SUBCATEGORIES_SUCCESS:
            return {loading: false, subcategories: action.payload.categories, sizes: action.payload.sizes};
        case FETCH_SUBCATEGORIES_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}