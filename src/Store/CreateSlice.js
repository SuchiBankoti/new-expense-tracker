import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";

const api = "https://expense-tracker-25d4f-default-rtdb.asia-southeast1.firebasedatabase.app/";
const loginApi ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvMhMxDWfRmYEbmRy4ORKoiOLsxpVokq0"
const signupApi = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvMhMxDWfRmYEbmRy4ORKoiOLsxpVokq0";

const initialState = {
    allExpenses: [],
    totalAmount:0,
    isLoading: true,
    trackdata: 0,
    editmode: false,
    editableItemId: null,
    token:null
}
export const authExpenseLogin = createAsyncThunk(
    "expense/login", (payload)=>{
        return fetch(loginApi, {
          method: "POST",
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(res => {
            if (res.ok) {
                return res.json();
            }else {
                return Promise.reject("Request failed with status: " + res.status);
              }
        })
    }
)
export const authExpenseSignUp = createAsyncThunk(
    "expense/signUp", (payload) => {
        if (payload.email && payload.password && payload.confirmPassword) {
            return fetch(signupApi, {
                method: "POST",
                body: JSON.stringify({
                    email: payload.email,
                    password:payload.password,
                    returnSecureToken: true,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject("Request failed with status: " + res.status);
                }
            }).catch(e => {
                console.log(e)
                return Promise.reject(e);
            });
        }
    }
)
export const getAllExpenses = createAsyncThunk(
    "expense/getAllExpenses",
        () => {
        return fetch(`${api}/data/allExpenses.json`).then(data=>data.json()).catch(e=>console.log(e))
    }
)
export const addExpenseData = createAsyncThunk(
    "expense/addExpenseData",
    (payload) => {
        return fetch(`${api}/data/allExpenses.json`, {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(payload)
          }).then((res) => {
              if (res.ok) {
                return res.json();
            }else {
                return Promise.reject("Request failed with status: " + res.status);
              }
          }).catch(e => {
              console.log(e)
              return Promise.reject(e);
          });
    }
)
export const removeExpenseData = createAsyncThunk(
    "expense/removeExpenseData",
    (payload) => {
        return fetch(`${api}/data/allExpenses/${payload}.json`, {
            method: "DELETE"
          }).then((res) => {
            if (res.ok) {
                return res.json();
            }else {
                return Promise.reject("Request failed with status: " + res.status);
              }
          }).catch(e => {
            console.log(e)
            return Promise.reject(e);
        });
       
    }
)
export const updateExpenseData = createAsyncThunk(
    "expense/updateExpenseData",
    (payload) => {
        return fetch(`${api}/data/allExpenses/${payload.id}.json`, {
            method: "PUT",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              cost: payload.formdata.cost,
              detail:payload.formdata.detail,
              category:payload.formdata.category
            })
          }).then((res) => {
              if (res.ok) {
                return res.json();
            }else {
                return Promise.reject("Request failed with status: " + res.status);
              }
          }).catch(e => {
              console.log(e)
              return Promise.reject(e);
          });
    }
)
const expenseSlice = createSlice({
    name: "expenses",
    initialState,
    reducers: {
        activateEdit: (state, action) => {
            state.editmode = true
            state.editableItemId=action.payload
        },
        activateToken: (state) => {
            state.token=localStorage.getItem("token")
        },
        logoutUser:(state)=>{
            localStorage.removeItem("token");
    }
    },
    extraReducers: {
        [getAllExpenses.pending]: (state) => {
            state.isLoading=true
        },
        [getAllExpenses.fulfilled]: (state, action) => {
            state.isLoading = false
            console.log('payload', action.payload)
            const a = Object.entries(action.payload);
            const allExpenseData = a.map((e) => {
              return { ...e[1], id: e[0] };
            });
            state.allExpenses=allExpenseData
        },
        [getAllExpenses.rejected]: (state) => {
            state.isLoading=false
        },
        [addExpenseData.pending]: (state) => {
            state.isLoading=true
        },
        [addExpenseData.fulfilled]: (state, action) => {
            state.isLoading = false
            console.log('payloadforpost', action.payload)
            state.trackdata=state.trackdata+1
        },
        [addExpenseData.rejected]: (state) => {
            state.isLoading=false
        },
        [removeExpenseData.pending]: (state) => {
            state.isLoading=true
        },
        [removeExpenseData.fulfilled]: (state, action) => {
            state.isLoading = false
            console.log('payloadfordelete', action.payload)
            state.trackdata=state.trackdata-1
        },
        [removeExpenseData.rejected]: (state) => {
            state.isLoading=false
        },
        [updateExpenseData.pending]: (state) => {
            state.isLoading=true
        },
        [updateExpenseData.fulfilled]: (state, action) => {
            state.isLoading = false
            console.log('payloadforupdate', action.payload)
            state.editmode =false
            state.trackdata=state.trackdata+1
            state.editableItemId=null
        },
        [updateExpenseData.rejected]: (state) => {
            state.isLoading=false
        },
    },
    authReducer: {
        [authExpenseLogin.pending]: (state) => {
            state.isLoading=true
        },
        [authExpenseLogin.fulfilled]: (state, action) => {
            state.isLoading = false
            console.log('payloadforlogin', action.payload)
            localStorage.setItem("token", action.payload.idToken);
            state.token=localStorage.getItem("token")
        },
        [authExpenseLogin.rejected]: (state) => {
            state.isLoading=false
        },
        [authExpenseSignUp.pending]: (state) => {
            state.isLoading=true
        },
        [authExpenseSignUp.fulfilled]: (state, action) => {
            state.isLoading = false
            console.log('payloadforsignup', action.payload)
            localStorage.setItem("token", action.payload.idToken);
            state.token=localStorage.getItem("token")
        },
        [authExpenseSignUp.rejected]: (state) => {
            state.isLoading=false
        },
    }

});

export const{activateEdit, activateToken, logoutUser}=expenseSlice.actions

export default expenseSlice.reducer






