import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthData{
    email: string;
    accessToken: string;
    role: string;
}

const AUTH_DATA_KEY = "authData";

const authDataString = localStorage.getItem(AUTH_DATA_KEY);

const initialState = {
    authData: authDataString ? JSON.parse(authDataString) : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<AuthData>) => {
            localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(action.payload));
            state.authData = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem(AUTH_DATA_KEY);
            state.authData = null;
        }
    }
});

export const { setAuthData, logout } = authSlice.actions; 
export default authSlice.reducer;