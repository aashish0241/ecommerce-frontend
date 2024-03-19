import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
  isLoggedIn: false,
  user: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

// Register user data
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await authService.register(userData);
    return response.data; // Assuming the response contains user data
  } catch (error) {
    throw error; // Throw the error to be handled by Redux Toolkit
  }
});

// Login user data
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const response = await authService.login(userData);
    return response.data; // Assuming the response contains user data
  } catch (error) {
    throw error; // Throw the error to be handled by Redux Toolkit
  }
});

// Logout user data
export const logout = createAsyncThunk('auth/logout', async (userData, thunkAPI) => {
  try {
    const response = await authService.logout(userData);
    return response.data; // Assuming the response contains user data
  } catch (error) {
    throw error; // Throw the error to be handled by Redux Toolkit
  }
});

// Get login status
export const getLoginStatus = createAsyncThunk('auth/getloginstatus', async (userData, thunkAPI) => {
  try {
    const response = await authService.getLoginStatus(userData);
    return response.data; // Assuming the response contains user data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Get user
export const getuser = createAsyncThunk('auth/getuser', async (_, thunkAPI) => {
  try {
    return await authService.getuser();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Update user
export const updateuser = createAsyncThunk('auth/updateuser', async (userData, thunkAPI) => {
  try {
    return await authService.updateuser(userData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Update photo
export const updatephoto = createAsyncThunk('auth/updatephoto', async (userData, thunkAPI) => {
  try {
    return await authService.updatephoto(userData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const createProduct = createAsyncThunk('auth/createproduct' , async(userData , thunkAPI) =>{
  try {
    return await authService.createproduct(userData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    RESET_AUTH(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message || 'Registration failed';
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message || 'Login failed';
        state.user = null;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.isSuccess = true;
        state.message = action.payload?.message || 'Logout successful';
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message || 'Logout failed';
      })
      .addCase(getLoginStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoginStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = action.payload;
        state.isSuccess = true;

        // Assuming that action.payload is a boolean
        if (!action.payload) {
          state.isLoggedIn = false;
        }
      })
      .addCase(getLoginStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getuser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getuser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isSuccess = true;
        state.user = action.payload;
        console.log(action.payload)
      })
      .addCase(getuser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isError(action.payload);
      })
      .addCase(updateuser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateuser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = action.payload;
        state.isSuccess = true;
        state.user = action.payload;
        state.success("user updated");
      })
      .addCase(updateuser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        
      })
      .addCase(updatephoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatephoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = action.payload;
        state.isSuccess = true;
        state.user = action.payload;
        state.success("user Photo updated");
      })
      .addCase(updatephoto.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = action.payload;
        state.isSuccess = true;
        state.user = action.payload;
        state.success("Product Created sucessfully");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        
      });
  },
});

export const { RESET_AUTH } = authSlice.actions;

export default authSlice.reducer;
