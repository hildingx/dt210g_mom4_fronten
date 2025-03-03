// Komponent för att skydda routes och endast tillåta inloggade användare

import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
    children: ReactNode
}

// Skydda sidor och omdirigerar ej inloggade användare
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useAuth();

    // Om användaren inte är inloggad, omdirigera till /login
    if (!user) {
        return <Navigate to="/login" replace />
    }

    // Om användaren är inloggad, rendera den skyddade komponenten
    return (
        <>{children}</>
    )
}

export default ProtectedRoute;