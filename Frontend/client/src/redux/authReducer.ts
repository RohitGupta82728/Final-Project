import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit"


interface AuthState {
    token: string;
    loading: boolean;
    error: string;
    isLoggedIn:boolean,
    successMessage:string
  }

const initialState:AuthState ={
    token:"",
    loading:false,
    error:"",
    isLoggedIn:false,
    successMessage:"",
}


const fetchData = async (api: string, body: any, token: string=""): Promise<any> => {
    const res = await fetch(api, {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    return await res.json();
  }
  
 export const signUpUser = createAsyncThunk(
    'signupuser',
    async (body: any) => {
      const result = await fetchData('/auth/register', body, "");
      return result;
    }
  );
 export const signInUser = createAsyncThunk(
    'signinuser',
    async (body: any) => {
      const result = await fetchData('/auth/login', body, "");
      return result;
    }
  );


const authReducer = createSlice({
    name:"user",
    initialState,
    reducers:{
        addToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
          },
          logoutUser: (state) => {
            state.token = "";
            localStorage.removeItem("token");
            state.isLoggedIn=false;
          },
    },
    extraReducers: (builder) => {
        builder.addCase(signUpUser.fulfilled, (state, action: PayloadAction<{ error: string; message: string }>) => {
          state.loading = false;
          if (action.payload.error) {
            state.error = action.payload.error;
          }else{
            state.successMessage = action.payload.message;
          }
        });
        builder.addCase(signUpUser.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(signInUser.pending, (state) => {
          state.loading = true;
          state.error = ''; 
        });
        builder.addCase(signInUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error?.message || "An error occurred"; 
        });
        builder.addCase(signInUser.fulfilled, (state, action: PayloadAction<{ error: string;message: string; accessToken: string }>) => {
          state.loading = false;
          if (action.payload.error) {
            state.error = action.payload.error;
            //console.log("Error:", action.payload.error);
            // console.log("hi");
          } else {
            state.token = action.payload.accessToken;
            localStorage.setItem('token', action.payload.accessToken);
            state.error = action.payload.message;
            state.isLoggedIn=true;
            // console.log('Token:', action.payload.accessToken);
            // console.log('hello');
          }
          // console.log('state.error:', state.error);
        });
        // builder.addCase(signInUser.pending, (state) => {
        //   state.loading = true;
        // });
        // builder.addCase(signInUser.fulfilled, (state, action: PayloadAction<{ error: string ;accessToken: string }>) => {
        //     state.loading = false;
        //     if (action.payload.error) {
        //       state.error = action.payload.error;
        //       console.log("Error:", action.payload.error);
              
        //     }else{
        //       state.token = action.payload.accessToken;
        //       localStorage.setItem('token',action.payload.accessToken);
        //     }
        //     console.log('state.error:', state.error);
        //   });
      },
})

export const {addToken,logoutUser} = authReducer.actions; 
export default authReducer.reducer; 









