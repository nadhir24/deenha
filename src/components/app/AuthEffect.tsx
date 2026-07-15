import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { supabase } from '../../lib/supabase';
import { setUser, setLoading } from '../../store/authSlice';

/** Handles Supabase auth lifecycle and syncs to Redux */
export default function AuthEffect() {
    const dispatch = useDispatch();
    const mounted = useRef(true);

    useEffect(() => {
        mounted.current = true;

        const fetchProfile = async (id: string, email: string) => {
            const timeout = new Promise<{ timeout: true }>((r) => setTimeout(() => r({ timeout: true }), 5000));
            try {
                const result = await Promise.race([
                    supabase.from('profiles').select('role').eq('id', id).single(),
                    timeout,
                ]);
                if (!mounted.current) return;
                if ('timeout' in result) {
                    dispatch(setUser({ id, email, role: 'employee' }));
                } else {
                    const { data, error } = result;
                    dispatch(setUser({ id, email, role: error ? 'employee' : data.role }));
                }
            } catch {
                if (mounted.current) dispatch(setUser({ id, email, role: 'employee' }));
            }
        };

        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user && mounted.current) {
                fetchProfile(session.user.id, session.user.email!);
            } else if (mounted.current) {
                dispatch(setLoading(false));
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (!mounted.current) return;
            if (event === 'SIGNED_IN' && session?.user) {
                await fetchProfile(session.user.id, session.user.email!);
            } else if (event === 'SIGNED_OUT') {
                dispatch(setUser(null));
            } else if (event === 'INITIAL_SESSION' && !session) {
                dispatch(setLoading(false));
            }
        });

        return () => {
            mounted.current = false;
            subscription.unsubscribe();
        };
    }, [dispatch]);

    return null;
}
