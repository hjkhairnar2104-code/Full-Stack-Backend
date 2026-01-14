;

const initialState = {
    isLoading: false,
    errorMessage: null,
    categoryLoader: false,
    categoryError: null,
    btnloader: false

};

export const errorReducer = (state = initialState, action) => {

    switch (action.type) {

        case "IS_FETCHING":
            return {
                ...state,
                isLoading: true,
                errorMessage: null,

            };
        case "BUTTON_LOADER":
            return {
                ...state,
                btnloader: true,
                errorMessage: null,
                categoryError: null,
            };

        case "PRODUCT_SUCCESS":
            return {
                ...state,
                isLoading: false,
                errorMessage: null,

            };

        case "IS_SUCCESS":
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                btnLoader: false,
                categoryError: null,
                categoryLoader: false,
            };


        case "IS_ERROR":
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
                btnloader: false,
                categoryLoader: false,
            };

        case "CATEGORY_LOADER":
            return {
                ...state,
                categoryLoader: true,
                categoryError: null,
                errorMessage:null
            };
        case "CATEGORY_SUCCESS":
            return {
                ...state,
                categoryError: null,
                categoryLoader: false,
            }

        default:
            return state;
    }
};

export default errorReducer;
