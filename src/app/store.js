import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import cartSlice from "../features/cart/cartSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export default store;