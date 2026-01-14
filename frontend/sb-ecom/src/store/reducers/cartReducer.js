const initialstate={
    cart:[],
    totalPrice:0,
    cartItem:null,
}


const cartReducer=(state=initialstate,action)=>{
    switch (action.type) {
        case "ADD_CART":
            const productToAdd=action.payload;
            const existingProduct=state.cart.find((item)=>item.productId===productToAdd.productId);
            if(existingProduct) {
                const updatedCart = state.cart.map((item) => {
                    if (item.productId === productToAdd.productId) {
                        return productToAdd;
                    } else {
                        return item;
                    }
                });
                

                return {
                    ...state,
                    cart: updatedCart,
                };
            }
            else{
                const newcart=[...state.cart,productToAdd];
                return{
                    ...state,
                    cart:newcart,
                };
            }
        
        case "REMOVE_CART":
            return{
                ...state,
                cart:state.cart.filter(
                    (item)=>item.productId!==action.payload.productId
                )
            };
    
        default:
            return state;
    }
}

export default cartReducer;