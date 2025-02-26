import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { User, LoginCredentials, AuthResponse, AuthContextType } from "../types/auth.types";

// Skapa kontext
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (credentials: LoginCredentials) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })

            if (!res.ok) throw new Error("Inloggningen misslyckades");

            const data = await res.json() as AuthResponse;

            localStorage.setItem("authToken", data.token);
            setUser(data.user);

            console.log("Inloggad användare:", data.user);

        } catch (error) {
            throw error;
        }
    }

    const logout = () => {
        localStorage.removeItem("authToken");

        setUser(null);
    }

    // Validera token
    const checkToken = async () => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            return
        }

        try {
            const res = await fetch("http://localhost:5000/api/auth/validate", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            }
        } catch (error) {
            console.error("Token error:", error);
            localStorage.removeItem("authToken");
            setUser(null);
        }
    }

    useEffect(() => {
        checkToken();
    }, [])

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth måste användas inom en AuthProvider");
    }

    return context;
}