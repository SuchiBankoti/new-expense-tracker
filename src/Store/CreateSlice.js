import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";

const api= "https://expense-tracker-25d4f-default-rtdb.asia-southeast1.firebasedatabase.app/";
const initialState = {
    allExpenses: [],
    totalAmount:0,
    isLoading: true
}
export const getAllExpenses = createAsyncThunk(
    "expense/getAllExpenses",
     () => {
        return fetch(`${api}/data/allExpenses.json`).then(data=>data.json()).catch(e=>console.log(e))
    }
)
const expenseSlice = createSlice({
    name: "expenses",
    initialState,
    reducers: {
        getExpenseData: (state,action) => {
            state.allExpenses = [{ name: "suchi" }]
            console.log(action.payload)
        }
    },
    extraReducers: {
        [getAllExpenses.pending]: (state) => {
            state.isLoading=true
        },
        [getAllExpenses.fulfilled]: (state, action) => {
            state.isLoading = false
            state.allExpenses=action.payload
        },
        [getAllExpenses.rejected]: (state) => {
            state.isLoading=false
        }
    }
});

export const{getExpenseData}=expenseSlice.actions

export default expenseSlice.reducer