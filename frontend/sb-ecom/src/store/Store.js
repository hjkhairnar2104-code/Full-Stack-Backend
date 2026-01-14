import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./reducers/ProductReducer";
import errorReducer from "./reducers/errorReducer";
import cartReducer from "./reducers/cartReducer";
import { authReducer } from "./reducers/authReducer";

const user=localStorage.getItem("auth")
            ?JSON.parse(localStorage.getItem("auth"))
            :null;

const cartItem=localStorage.getItem("cartItem")
                ?JSON.parse(localStorage.getItem("cartItem"))
                :[];

const initialState={
    auth:{user:user},
    carts:{cart:cartItem}
}

export const Store=configureStore(
    {
        reducer:{
            product:ProductReducer,
            errors:errorReducer,
            carts:cartReducer,
            auth:authReducer,
        },
        preloadedState:initialState
    }
)

export default Store;