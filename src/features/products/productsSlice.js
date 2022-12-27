import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchProducts, postProduct } from "./productsAPI"

const initialState = {
    products: [],
    isLoading: false,
    isError: false,
    postSuccess: false,
    error: "",
}

export const getProducts = createAsyncThunk("products/getProducts", async () => {
    const products = fetchProducts()
    return products;
})

export const addProduct = createAsyncThunk("products/addProduct", async (product) => {
    const result = postProduct(product);
    return result;
})

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        resetPostSuccess: (state) => {
            state.postSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading=true;
                state.isError=false;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.products = [];
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message
            })
            .addCase(addProduct.pending, (state) => {
                state.isLoading=true;
                state.isError=false;
            })
            .addCase(addProduct.fulfilled, (state) => {
                state.postSuccess = true;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.postSuccess = false;
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message
            })
    }
})

export const { resetPostSuccess } = productsSlice.actions;

export default productsSlice.reducer;