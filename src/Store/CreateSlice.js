import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";

const api = "https://expense-tracker-25d4f-default-rtdb.asia-southeast1.firebasedatabase.app/";
const loginApi ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvMhMxDWfRmYEbmRy4ORKoiOLsxpVokq0"
const signupApi = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvMhMxDWfRmYEbmRy4ORKoiOLsxpVokq0";
const getVerified="https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDvMhMxDWfRmYEbmRy4ORKoiOLsxpVokq0"
const getProfileApi = "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDvMhMxDWfRmYEbmRy4ORKoiOLsxpVokq0"
const updateProfileApi = "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDvMhMxDWfRmYEbmRy4ORKoiOLsxpVokq0";
const initialState = {
    allExpenses: [],
    totalAmount:0,
    isLoading: true,
    trackdata: 0,
    editmode: false,
    editableItemId: null,
    token: null,
    username: null,
    isUserVerified: false,
    profileInfo: {
        name: "",
        photoUrl:""
    },
    completeProfile: false,
    theme: "light",
    premium:false,
    
}
export const authExpenseLogin = createAsyncThunk(
    "expense/login", (payload) => {
        return fetch(loginApi, {
          method: "POST",
          body: JSON.stringify({
            email:payload.email,
            password:payload.password,
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
        }).catch(e => {
            console.log(e)
            return Promise.reject(e);
        });
    }
)
export const authExpenseSignUp = createAsyncThunk(
    "expense/signUp", (payload) => {
        if (payload.email && payload.password && payload.confirmPassword) {
            return fetch(signupApi, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: payload.email,
                    password:payload.password,
                    returnSecureToken: true,
                }),
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
export const verifyUserEmail = createAsyncThunk(
    "expense/verifyEmail", (payload) => {
        
            return fetch(getVerified, {
                method: "POST",
                body: JSON.stringify({
                    requestType:"VERIFY_EMAIL",
                    idToken:payload
                }),
                headers: {
                    "Content-Type": "application/json",
                }
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
    
)
export const getUserProfile = createAsyncThunk("expense/getProfile", (payload) => {
    return fetch(getProfileApi, {
        method: "POST",
        body: JSON.stringify({
            idToken: payload,
        }),
        headers: {
            "Content-Type": "application/json",
        }
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
})

export const updateUserProfile = createAsyncThunk("expense/updateProfile", (payload) => {
    return fetch(updateProfileApi, {
        method: "POST",
        body: JSON.stringify({
            idToken:payload.token,
            displayName:payload.formData.name,
            photoUrl:payload.formData.photoUrl,
            returnSecureToken: true,
        }),
        headers: {
            "Content-Type": "application/json",
        }
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
})

export const getAllExpenses = createAsyncThunk(
    "expense/getAllExpenses",
        (payload) => {
        return fetch(`${api}/data/${payload}/allExpenses.json`).then(data=>data.json()).catch(e=>console.log(e))
    }
)
export const addExpenseData = createAsyncThunk(
    "expense/addExpenseData",
    (payload) => {
        return fetch(`${api}/data/${payload.username}/allExpenses.json`, {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(payload.formdata)
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
        return fetch(`${api}/data/${payload.username}/allExpenses/${payload.id}.json`, {
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
        return fetch(`${api}/data/${payload.username}/allExpenses/${payload.id}.json`, {
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
            localStorage.removeItem("expenseUsername")
        },
        setUsername: (state, action) => {
            state.username = localStorage.getItem("expenseUsername")
            
        },
        getTotalAmount: (state, action) => {
            state.totalAmount=action.payload
        },
        activateCompleteProfile: (state,action) => {
            state.completeProfile=action.payload
        },
        activatePremium: (state, action) => {
            state.premium=true
            state.theme=action.payload
        },
        switchTheme: (state, action) => {
            state.theme=action.payload
        }
    },
    extraReducers: {
        [getAllExpenses.pending]: (state) => {
            state.isLoading=true
        },
        [getAllExpenses.fulfilled]: (state, action) => {
            state.isLoading = false
            if (action.payload) {
                const a = Object.entries(action.payload);
                const allExpenseData = a.map((e) => {
                    return { ...e[1], id: e[0] };
                });
                const total = allExpenseData.reduce((sum,e) => {
                    sum += Number(e.cost)
                    return sum
                },0)
                state.allExpenses = allExpenseData
                state.totalAmount = total
            }
        },
        [getAllExpenses.rejected]: (state) => {
            state.isLoading=false
        },
        [addExpenseData.pending]: (state) => {
            state.isLoading=true
        },
        [addExpenseData.fulfilled]: (state, action) => {
            state.isLoading = false
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
            state.editmode =false
            state.trackdata=state.trackdata+1
            state.editableItemId=null
        },
        [updateExpenseData.rejected]: (state) => {
            state.isLoading=false
        },
        [authExpenseLogin.pending]: (state) => {
            state.isLoading=true
        },
        [authExpenseLogin.fulfilled]: (state, action) => {
            state.isLoading = false
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
            localStorage.setItem("token", action.payload.idToken);
            state.token=localStorage.getItem("token")
        },
        [authExpenseSignUp.rejected]: (state) => {
            state.isLoading=false
        },
        [verifyUserEmail.pending]: (state) => {
            state.isLoading=true
        },
        [verifyUserEmail.fulfilled]: (state, action) => {
            state.isLoading = false
            alert("email verification mail sent")
            state.isUserVerified=true
        },
        [verifyUserEmail.rejected]: (state) => {
            state.isLoading = false
            alert("email verification failed")
        },
        [getUserProfile.pending]: (state) => {
            state.isLoading=true
        },
        [getUserProfile.fulfilled]: (state, action) => {
            state.isLoading = false
            const data=action.payload.users[0]
            if (data) {
                if (data.displayName) {
                    state.profileInfo.name=data.displayName
                }
                if (data.photoUrl) {
                    state.profileInfo.photoUrl=data.photoUrl
                }
            }
        },
        [getUserProfile.rejected]: (state) => {
            state.isLoading = false
        },
        [updateUserProfile.pending]: (state) => {
            state.isLoading=true
        },
        [updateUserProfile.fulfilled]: (state, action) => {
            state.isLoading = false
            if (action.payload.displayName) {
                state.profileInfo.name=action.payload.displayName
            }
            if (action.payload.photoUrl) {
                state.profileInfo.photoUrl=action.payload.photoUrl
            }
            
        },
        [updateUserProfile.rejected]: (state) => {
            state.isLoading = false
            alert("profile update failed")
        },
    }

});

export const{switchTheme,activatePremium,activateEdit, activateToken, logoutUser,setUsername, getTotalAmount,activateCompleteProfile}=expenseSlice.actions

export default expenseSlice.reducer






