import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: [],
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = {...action.payload};
            const index = state.cart.map(item => item._id).indexOf(product._id);
            if(index === -1) {
                product.quantity = 1;
                state.cart.push(product)
            } else {
                product.quantity = state.cart[index].quantity + 1;
                state.cart.splice(index, 1, product)
            }
        },
        removeFromCart: (state, action) => {
            const product = {...action.payload};
            const index = state.cart.map(item => item._id).indexOf(product._id);
            if(product.quantity > 1) {
                product.quantity = state.cart[index].quantity - 1;
                state.cart.splice(index, 1, product)
            } else {
                state.cart.splice(index, 1,)
            }
        },
    }
})

export const { addToCart, removeFromCart } =  cartSlice.actions;

export const selectCart = (state) => state.cart.cart; //selecting cart state

export default cartSlice.reducer;
