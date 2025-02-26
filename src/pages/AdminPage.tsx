import { useAuth } from "../context/AuthContext"

const AdminPage = () => {

    const { user } = useAuth();
    return (
        <div>
            <h1>Admin-sida</h1>
            <p>Hej och välkommen {user ? user.username : "!"}</p>
        </div>
    )
}

export default AdminPage