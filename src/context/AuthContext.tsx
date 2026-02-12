
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

interface User {
    id: string;
    email: string;
    role: 'admin' | 'employee';
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    const fetchUserProfile = async (id: string, email: string) => {
        const timeoutPromise = new Promise<{ timeout: true }>((resolve) =>
            setTimeout(() => resolve({ timeout: true }), 5000)
        );

        try {
            const result = await Promise.race([
                supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', id)
                    .single(),
                timeoutPromise
            ]);

            if (!isMounted.current) return;

            if ('timeout' in result) {
                console.warn('Profile fetch timed out after 5s');
                const role = email.includes('admin') ? 'admin' : 'employee';
                setUser({ id, email, role });
            } else {
                const { data, error } = result;

                if (error) {
                    const role = email.includes('admin') ? 'admin' : 'employee';
                    setUser({ id, email, role });
                } else {
                    setUser({ id, email, role: data.role });
                }
            }
        } catch (err) {
            console.error('Exception fetching profile:', err);
            if (isMounted.current) {
                const role = email.includes('admin') ? 'admin' : 'employee';
                setUser({ id, email, role });
            }
        } finally {
            if (isMounted.current) {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (session?.user && isMounted.current) {
                    await fetchUserProfile(session.user.id, session.user.email!);
                } else if (isMounted.current) {
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Auth init error:', error);
                if (isMounted.current) setIsLoading(false);
            }
        };

        initializeAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (!isMounted.current) return;

            if (event === 'SIGNED_IN' && session?.user) {
                await fetchUserProfile(session.user.id, session.user.email!);
            } else if (event === 'SIGNED_OUT') {
                if (isMounted.current) {
                    setUser(null);
                    setIsLoading(false);
                }
            } else if (event === 'INITIAL_SESSION') {
                if (!session && isMounted.current) {
                    setIsLoading(false);
                }
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setIsLoading(false);
            throw error;
        }
    };

    const logout = async () => {
        setIsLoading(true);
        await supabase.auth.signOut();
        if (isMounted.current) {
            setUser(null);
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
