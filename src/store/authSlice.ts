import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '../lib/supabase';

interface User {
    id: string;
    email: string;
    role: 'admin' | 'employee';
}

interface AuthState {
    user: User | null;
    isLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    isLoading: true,
};

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return rejectWithValue(error.message);
        return undefined; // session handled by onAuthStateChange
    }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
    await supabase.auth.signOut();
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
            state.isLoading = false;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => { state.isLoading = true; })
            .addCase(loginUser.rejected, (state) => { state.isLoading = false; })
            .addCase(logoutUser.fulfilled, (state) => { state.user = null; state.isLoading = false; });
    },
    selectors: {
        selectAuth: (state) => state,
        selectUser: (state) => state.user,
    },
});

export const { setUser, setLoading } = authSlice.actions;
export const { selectAuth, selectUser } = authSlice.selectors;
export default authSlice.reducer;
