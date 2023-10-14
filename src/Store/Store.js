import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./CreateSlice"

export const store = configureStore({
    reducer: {
        expense:expenseReducer
    }
})

