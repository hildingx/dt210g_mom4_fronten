// Inloggningssida där användaren kan ange sina uppgifter för att logga in

// Import av React hooks och nödvändiga funktioner
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    // State för användarnamn, lösenord och felmeddelanden
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Hämtar login-funktion och användarinfo från AuthContext
    const { login, user } = useAuth();
    const navigate = useNavigate();

    // Kontrollera om användaren redan är inloggad och skicka till startsida
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    // Hanterar inloggningsformulärets submit-händelse
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Återställ felmeddelande
        setError("");

        // Validering av inmatade fält
        if (!username || !password) {
            setError("Användarnamn och lösenord krävs");
            return;
        }

        try {
            // Anropar login-funktion med användaruppgifter
            await login({ username, password });
            navigate("/");

        } catch (error) {
            console.error("Login error:", error);
            setError("Inloggningen misslyckades. Kontrollera användarnamn och lösenord.")
        }
    }

    return (
        <div className="login-page">
            <h1>Logga in</h1>

            {/* Visar eventuella felmeddelanden */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Inloggningsformulär */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Användarnamn:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Lösenord:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Logga in</button>
            </form>
        </div>
    )
}

export default LoginPage