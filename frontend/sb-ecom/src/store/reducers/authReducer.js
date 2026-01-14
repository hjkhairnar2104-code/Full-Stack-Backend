
const initialstate={
    user:null,
    address:[],
    selectUserCheckoutAddress:null
}

export const authReducer=(state=initialstate,action)=>{
    switch (action.type) {
        case "LOGIN_USER":
            return {...state,user:action.payload};

        case "USER_ADDRESS":
            return {...state,address:action.payload};

      case "SELECTED_CHECKOUT_ADDRESS":
            return { ...state, selectedCheckoutAddress: action.payload };

      case "REMOVE_CHECKOUT_ADDRESS":
            return {...state,selectUserCheckoutAddress:null};
                
        case "LOG_OUT":
            return {...state ,user:null,address:[]};

        default:
            return state;
    }
}

