import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { deleteProduct, fetchProducts, postProduct } from "./productsAPI"

const initialState = {
    products: [],
    isLoading: false,
    isError: false,
    postSuccess: false,
    deleteSuccess: false,
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

export const removeProduct = createAsyncThunk("products/removeProduct", async (productId, productAPI) => {
    const result = deleteProduct(productId);
    productAPI.dispatch(deleteLocalProduct(productId))
    return result;
})

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        resetPostSuccess: (state) => {
            state.postSuccess = false;
        },
        resetDeleteSuccess: (state) => {
            state.deleteSuccess = false;
        },
        deleteLocalProduct: (state, action) => {
            state.products = state.products.filter(product => product._id !== action.payload)
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
            .addCase(removeProduct.pending, (state) => {
                state.isLoading=true;
                state.isError=false;
            })
            .addCase(removeProduct.fulfilled, (state) => {
                state.deleteSuccess = true;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(removeProduct.rejected, (state, action) => {
                state.deleteSuccess = false;
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message
            })
    }
})

export const { resetPostSuccess, resetDeleteSuccess, deleteLocalProduct } = productsSlice.actions;

export default productsSlice.reducer;