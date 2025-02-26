import { useState } from "react"
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Reset error msg
        setError("");

        // Validering
        if (!username || !password) {
            setError("Användarnamn och lösenord krävs");
            return;
        }

        console.log("inloggning försökt med: ", { username, password });

        try {
            await login({ username, password });
            navigate("/admin");

        } catch (error) {
            console.error("Login error:", error);
            setError("Inloggningen misslyckades. Kontrollera användarnamn och lösenord.")
        }
    }

    return (
        <div>
            <h1>Logga in</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
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