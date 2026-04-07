import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export interface User {
    id: string;
    email: string;
    name: string;
    role: "superadmin" | "admin";
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<{ error: string | null }>;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signIn: async () => ({ error: null }),
    signOut: () => { },
});

export const useAuth = () => useContext(AuthContext);

const STORAGE_KEY = "bahslides_user";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                localStorage.removeItem(STORAGE_KEY);
            }
        }
        setLoading(false);
    }, []);

    const logActivity = useCallback(async (userId: string, action: string, details: Record<string, any> = {}) => {
        try {
            await supabase.from("slides_activity_logs").insert({
                user_id: userId,
                action,
                details,
            });
        } catch {
            // silently fail
        }
    }, []);

    const signIn = useCallback(async (email: string, password: string) => {
        try {
            const { data, error } = await supabase
                .from("slides_users")
                .select("*")
                .eq("email", email.toLowerCase().trim())
                .eq("password", password)
                .single();

            if (error || !data) {
                return { error: "Credenciais inválidas" };
            }

            const foundUser: User = {
                id: data.id,
                email: data.email,
                name: data.name,
                role: data.role as "superadmin" | "admin",
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(foundUser));
            setUser(foundUser);

            logActivity(data.id, "login", { email: data.email });

            return { error: null };
        } catch {
            return { error: "Erro ao conectar com o servidor" };
        }
    }, [logActivity]);

    const signOut = useCallback(() => {
        if (user) {
            logActivity(user.id, "logout", { email: user.email });
        }
        localStorage.removeItem(STORAGE_KEY);
        setUser(null);
    }, [user, logActivity]);

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
