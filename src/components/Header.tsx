// Navmeny

import { NavLink } from "react-router-dom"
// Importera autentiseringskontexten för att hantera inloggning och utloggning
import { useAuth } from "../context/AuthContext"

const Header = () => {
    // Hämtar användarinformation och logout-funktionen från AuthContext
    const { user, logout } = useAuth();
    return (
        <header>
            <nav>
                <ul>
                    <li><NavLink to="/">Startsida</NavLink></li>
                    <li><NavLink to="/admin">Admin</NavLink></li>
                    {/* Visa "Logga in" om ingen användare är inloggad */}
                    {!user && <li><NavLink to="/login">Logga in</NavLink></li>}
                </ul>
            </nav>
            {/* Visa information om inloggad användare samt logga ut-knapp */}
            {user && (
                <div className="user-info">
                    <p>Inloggad som: {user.username}</p>
                    <button onClick={logout}>Logga ut</button>
                </div>
            )}
        </header>
    )
}

export default Header