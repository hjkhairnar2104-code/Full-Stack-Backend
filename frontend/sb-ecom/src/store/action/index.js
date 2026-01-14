import { data } from "react-router-dom";
import Api from "../../api/Api";
import toast from "react-hot-toast";
import AddAddressForm from "../../Components/checkout/AddAddressForm";

export const fetchProduct = (querystring) => async (dispatch) => {

    try {
        dispatch({ type: "IS_FETCHING" })
        const response = await Api.get(`/public/products?${querystring}`);
        console.log("FULL RESPONSE --->", response.data);
        const data = response.data;

        dispatch({
            type: "FETCH_TYPE",
            payload: data.productList,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalpages: data.totalpages,
            lastPage: data.lastPage
        })
        dispatch({
            type: "PRODUCT_SUCCESS",
        });

    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to Fetch a Data",
        })
    }

}




export const fetchCategories = () => async (dispatch) => {

    try {
        dispatch({ type: "CATEGORY_LOADER" })
        const response = await Api.get(`/public/categories`);
        console.log("FULL RESPONSE --->", response.data);
        const data = response.data;

        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalpages: data.totalpages,
            lastPage: data.lastPage

        })
        dispatch({
            type: "CATEGORY_SUCCESS",
        });

    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to Fetch a categories",
        })
    }

};

export const addToCart = (data, qty = 1,toast) =>
    (dispatch, getState) => {

        const { products } = getState().product;


        const getProduct = products.find(
            item => item.productId === data.productId
        );

        const isQuantityExist = getProduct.quantity >= qty;

        if (isQuantityExist) {
            dispatch({
                type: "ADD_CART",
                payload: { ...data, quantity: qty }
            
            })
            toast.success(`${data?.productName} added to cart successfully`)
            localStorage.setItem(
                "cartItem",
                JSON.stringify(getState().carts.cart)
            );
           

        }
        else{
              toast.error("Out of stock")
        }


    }


    export const increaseCartQuantity = 
    (data, toast, currentQuantity, setCurrentQuantity) =>
    (dispatch, getState) => {
        // Find the product
        const { products } = getState().product;
        
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );

        const isQuantityExist = getProduct.quantity >= currentQuantity + 1;

        if (isQuantityExist) {
            const newQuantity = currentQuantity + 1;
            setCurrentQuantity(newQuantity);

            dispatch({
                type: "ADD_CART",
                payload: {...data, quantity: newQuantity + 1 },
            });
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        } else {
            toast.error("Quantity Reached to Limit");
        }

    };

     export const decreaseCartQuantity = (data,newQuantity)=>(dispatch,getState)=>{
        dispatch({
             type: "ADD_CART",
             payload: {...data, quantity: newQuantity},
        })
          localStorage.setItem(
                "cartItem",
                JSON.stringify(getState().carts.cart)
            );

     }

     export const removeItemFromCart=(data,toast)=>(dispatch,getState)=>{
        dispatch({
            type:"REMOVE_CART",
            payload:data,
        })
        toast.success(`${data.productName} remove from cart successfully`);
        localStorage.setItem(
                "cartItem",
                JSON.stringify(getState().carts.cart)
        );

    }

    export const authenticateSignUser=(sendData,toast,reset,navigate,setLoader)=>async(dispatch)=>{
        try {
            setLoader(true);
            const {data}= await Api.post("/auth/signin",sendData);
            dispatch({type:"LOGIN_USER",payload:data});
            localStorage.setItem("auth",JSON.stringify(data));
            reset();
            toast.success("Login Success");
            navigate("/");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Internal server error")
            
        } finally{
            setLoader(false);
        }

    }


        export const registerNewUser=(sendData,toast,reset,navigate,setLoader)=>async(dispatch)=>{
        try {
            setLoader(true);
            const {data}= await Api.post("/auth/signup",sendData);
            reset();
            toast.success(data?.message||"User Registered Successfully");
            navigate("/login");
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.response?.data?.password || "Internal server error")
            
        } finally{
            setLoader(false);
        }

    }

    export const logOutUser=(navigate)=>(dispatch)=>{
        dispatch({type:"LOG_OUT"});
        localStorage.removeItem("auth");
        navigate("/login")
    }

    export const addUpdateUserAddress=(sendData,toast,addressId,setOpenAddressModal)=>async(dispatch,getState)=>{
        // const {user}=getState().auth

        dispatch({type:"BUTTON_LOADER"});
        try {
            if(addressId){
                await Api.put(`/addresses/${addressId}`,sendData);
            }
            else{
                 const {data}=await Api.post("/addresses",sendData);
            }
            toast.success("Address registered Successfully");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Error Registered Successfully");
            dispatch({type:"IS_ERROR",payload:null})
        } finally{
            setOpenAddressModal(false)
        }

    }


    export const getUserAddress = () => async (dispatch,getState) => {

    try {
        dispatch({ type: "IS_FETCHING" })
        const response = await Api.get(`/addresses`);
        dispatch({type:"USER_ADDRESS",payload:response.data})
        dispatch({
            type: "IS_SUCCESS",
        });

    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to Fetch a Addresses",
        })
    }

};

   export const deleteUserAddress = (toast,addressId,setOpenDeleteModal) => async (dispatch,getState) => {

    try {
        dispatch({ type: "BUTTON_LOADER" })
        await Api.delete(`/addresses/${addressId}`);

        dispatch({
            type: "IS_SUCCESS",
        });
        dispatch(getUserAddress())
        dispatch(clearCheckOutAddresses())
        toast.success("Address Deleted Successfully")

    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to Delete a Address",
        })
    }finally{
        setOpenDeleteModal(false);
    }

};

export const clearCheckOutAddresses=()=>{
    return{
        type:"REMOVE_CHECKOUT_ADDRESS",
    }
}



export const setSelectedCheckoutAddress = (address) => {
    return {
        type: "SELECTED_CHECKOUT_ADDRESS",
        payload: address
    };
};
