import { createContext, useContext, useState, useEffect } from 'react';
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

    useEffect(() => {
        // 1. Check active session on mount
        const getInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                await fetchUserProfile(session.user.id, session.user.email!);
            }
            setIsLoading(false);
        };

        getInitialSession();

        // 2. Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                await fetchUserProfile(session.user.id, session.user.email!);
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const fetchUserProfile = async (id: string, email: string) => {
        try {
            // Attempt to get role from profiles table
            const { data, error } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', id)
                .single();

            if (error) {
                // Fallback for demo: if no profile exists, check email
                const role = email.includes('admin') ? 'admin' : 'employee';
                setUser({ id, email, role });
            } else {
                setUser({ id, email, role: data.role });
            }
        } catch (err) {
            console.error('Error fetching profile:', err);
            setUser({ id, email, role: 'employee' });
        }
    };

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
        // User will be set by the onAuthStateChange listener
        setIsLoading(false);
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
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
