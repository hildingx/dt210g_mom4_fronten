// Kontext för autentisering och användarhantering

// Importera nödvändiga React-funktioner och typer
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { User, LoginCredentials, AuthResponse, AuthContextType } from "../types/auth.types";

// Skapa kontext för autentisering
const AuthContext = createContext<AuthContextType | null>(null);

// Typ för props till AuthProvider-komponenten
interface AuthProviderProps {
    children: ReactNode
}

// Huvudkomponent för att hantera autentiseringstillstånd
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // State för inloggad användare och JWT-token
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem("authToken"));

    // Funktion för att logga in användaren
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
            setToken(data.token);
            setUser(data.user);

            console.log("Inloggad användare:", data.user);

        } catch (error) {
            throw error;
        }
    }

    // Funktion för att logga ut användaren
    const logout = () => {
        localStorage.removeItem("authToken");
        setToken(null);
        setUser(null);
    }

    // Funktion för att validera token vid sidladdning
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

    // Kör checkToken vid sidladdning för att se om användaren redan är inloggad
    useEffect(() => {
        checkToken();
    }, [])

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// Hook för att använda autentiseringskontexten i andra komponenter
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth måste användas inom en AuthProvider");
    }

    return context;
}