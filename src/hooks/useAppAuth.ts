import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logoutUser, selectUser } from '../store/authSlice';
import type { RootState, AppDispatch } from '../store';

/** Drop-in replacement for useAuth() from AuthContext — uses Redux */
export function useAuth() {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector(selectUser);
    const isLoading = useSelector((state: RootState) => state.auth.isLoading);

    const login = useCallback(
        async (email: string, password: string) => {
            await dispatch(loginUser({ email, password })).unwrap();
        },
        [dispatch]
    );

    const logout = useCallback(
        async () => {
            await dispatch(logoutUser()).unwrap();
        },
        [dispatch]
    );

    return { user, login, logout, isLoading };
}
