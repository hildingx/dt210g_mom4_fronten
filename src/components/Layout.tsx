// Layout-komponent som en wrapper för alla sidor

import Footer from "./Footer"
import Header from "./Header"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <>
            <Header />
            <main>
                {/* Outlet för att rendera den aktuella sidan baserat på routing */}
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout