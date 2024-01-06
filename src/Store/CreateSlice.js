import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";

const api = "https://expense-tracker-25d4f-default-rtdb.asia-southeast1.firebasedatabase.app/";
const loginApi ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVCqLAhTyXyQ5ZA_q0AqV-dtjxAbu5-Zc"
const signupApi = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBVCqLAhTyXyQ5ZA_q0AqV-dtjxAbu5-Zc";
const getProfileApi = "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBVCqLAhTyXyQ5ZA_q0AqV-dtjxAbu5-Zc"
const updateProfileApi = "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBVCqLAhTyXyQ5ZA_q0AqV-dtjxAbu5-Zc";



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
        photoUrl: "",
        emailVerified: false
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
        console.log('signup',payload)
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

export const getUserProfile = createAsyncThunk("expense/getProfile", (payload) => {
    if (payload) {
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
            } else {
                return Promise.reject("Request failed with status: " + res.status);
            }
        }).catch(e => {
            console.log(e)
            return Promise.reject(e);
        });
    }
})

export const updateUserProfile = createAsyncThunk(
    "expense/updateProfile",
    (payload) => {
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
            state.username = null
            state.premium = false
            state.theme="light"
            state.allExpenses = []
            state.totalAmount = 0
            state.token = null
             state.trackdata=false
          state.editmode=false
            state.editableItemId=null
         state.isUserVerified=false
          state.profileInfo= {
        name: "",
        photoUrl: "",
        emailVerified: false
             }
           state.completeProfile=false
            state.premium=false
                
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
    },
    extraReducers: {
        [getAllExpenses.pending]: (state) => {
            state.isLoading=true
        },
        [getAllExpenses.fulfilled]: (state, action) => {
            state.isLoading = false
            if (action.payload && !action.payload.error) {
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
            } else {
                state.allExpenses = []
                state.totalAmount = 0
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
            state.trackdata=!state.trackdata
        },
        [addExpenseData.rejected]: (state) => {
            state.isLoading=false
        },
        [removeExpenseData.pending]: (state) => {
            state.isLoading=true
        },
        [removeExpenseData.fulfilled]: (state, action) => {
            state.isLoading = false
            state.trackdata = !state.trackdata
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
            state.trackdata=!state.trackdata
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
       
        [getUserProfile.pending]: (state) => {
            state.isLoading=true
        },
        [getUserProfile.fulfilled]: (state, action) => {
            state.isLoading = false
            const data=action.payload?action.payload.users[0]:""
            if (data) {
                state.profileInfo.emailVerified=data.emailVerified
                    state.profileInfo.name=data.displayName
                    state.profileInfo.photoUrl=data.photoUrl
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
                state.profileInfo.name=action.payload.displayName
                state.profileInfo.photoUrl=action.payload.photoUrl
            
        },
        [updateUserProfile.rejected]: (state) => {
            state.isLoading = false
            alert("profile update failed")
        },
    }

});

export const{switchTheme,activatePremium,activateEdit, activateToken, logoutUser,setUsername, getTotalAmount,activateCompleteProfile}=expenseSlice.actions

export default expenseSlice.reducer






