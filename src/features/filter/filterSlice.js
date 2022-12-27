import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    inStock: false,
    filters: {
        brands: []
    },
    keywords: "" 
}

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        toggleStock: (state) => {
            state.inStock = !state.inStock
        },
        toggleBrand: (state, action) => {
            const index = state.filters.brands.indexOf(action.payload);
            if(index === -1) {
                state.filters.brands.push(action.payload)
            }
            else {
                state.filters.brands.splice(index, 1)
            }
        }
    }
})

export const { toggleStock, toggleBrand } = filterSlice.actions;

export default filterSlice.reducer;