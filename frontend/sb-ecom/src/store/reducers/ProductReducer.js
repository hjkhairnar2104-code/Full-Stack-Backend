const initialState = {
    products: null,
    categories: null,
    pagination: {},
};

export const ProductReducer = (state = initialState, action) => {

    switch (action.type) {
        case "FETCH_TYPE":
            return {
                ...state,
                products: action.payload,
                pagination: {
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalElements: action.totalElements,
                    totalpages: action.totalpages,
                    lastPage: action.lastPage,
                }
            }

        case "FETCH_CATEGORIES":
            return {
                ...state,
                categories: action.payload,
            
            }


        default:
            return state;

    }

};

export default ProductReducer;