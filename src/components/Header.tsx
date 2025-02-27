import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Header = () => {

    const { user, logout } = useAuth();
    return (
        <header>
            <ul>
                <li><NavLink to="/">Startsida</NavLink></li>
                <li><NavLink to="/admin">Admin</NavLink></li>
                <li>
                    {
                        !user ? <NavLink to="/login">Login</NavLink> : <button onClick={logout}>Logga ut</button>
                    }
                </li>
            </ul>
            <p>Inloggad som: {user ? user.username : "!"}</p>
        </header>
    )
}

export default Header