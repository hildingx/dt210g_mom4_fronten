import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './routing.tsx'

// Import av autentiseringsprovider för att hantera användarens inloggningstillstånd
import { AuthProvider } from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/* Hantera användarens autentisering och tillgängliggör i hela appen */}
        <AuthProvider>
            {/* Hantera routingstruktur */}
            <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>,
)
