// Startsida för appen

import { useAuth } from "../context/AuthContext";

const HomePage = () => {
    const { user } = useAuth();

    return (
        <div className="front-page">
            <h1>Startsida</h1>
            <p>
                {user
                    ? `Hej och välkommen ${user.username}! Här kan du via administration se, lägga till, ändra och ta bort produkter.`
                    : "Du måste vara inloggad för att administrera produkter."}
            </p>
        </div>
    )
}

export default HomePage