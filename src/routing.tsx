// Konfigurera routingstruktur för applikationen med React Router

import { createBrowserRouter } from "react-router-dom";

// Import av sidkomponenter
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";

// Import av layout och skyddad route-komponent
import Layout from "./components/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";

const router = createBrowserRouter([
    {
        // Huvudlayout för applikationen
        path: "/",
        element: <Layout />,
        children: [
            {
                // Publik startsida
                path: "/",
                element: <HomePage />
            },
            {
                // Admin-sida (protected)
                path: "/admin",
                element: (
                    <ProtectedRoute>
                        <AdminPage />
                    </ProtectedRoute>
                )
            },
            {
                // Inloggningssida
                path: "/login",
                element: <LoginPage />
            }
        ]
    },

])

export default router;