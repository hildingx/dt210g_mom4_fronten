// Komponent för att lägga till en ny produkt

// Importera Reacts useState-hook och API-funktion för att skapa en produkt
import { useState } from "react";
import { createProduct } from "../api/products";

// Definierar props som komponenten tar emot
interface AddProductProps {
    onProductAdded: () => void;
    token: string;
}

// Komponent för att hantera tillägg av en ny produkt
const AddProduct = ({ onProductAdded, token }: AddProductProps) => {
    // State för att hantera inmatade värden i formuläret
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [stock, setStock] = useState<number | "">("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState<string>("");

    // Funktion för att hantera formulärets submit-händelse
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validering på input
        if (!name || !price || !stock) {
            setError("Namn, pris och lagerantal krävs!");
            return;
        }

        try {
            await createProduct(token, { name, description, price: Number(price), stock: Number(stock), category });
            onProductAdded(); // Uppdaterar produktlistan i AdminPage
            // Återställer formulär
            setName("");
            setDescription("");
            setPrice("");
            setStock("");
            setCategory("");
        } catch (error) {
            setError("Misslyckades att lägga till produkt." + error);
        }
    };

    return (
        <div className="addProductForm">
            <h2>Lägg till ny produkt</h2>

            {/* Visar felmeddelande */}
            {error && <p style={{ color: "red", margin: "10px", textAlign: "center" }}>{error}</p>}

            {/* Formulär för att lägga till produkt */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Produktnamn:</label>
                    <input id="name" type="text" placeholder="Produktnamn" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="description">Beskrivning:</label>
                    <input id="description" type="text" placeholder="Beskrivning" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="price">Pris:</label>
                    <input id="price" type="number" placeholder="Pris" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                </div>

                <div>
                    <label htmlFor="stock">Lagerantal:</label>
                    <input id="stock" type="number" placeholder="Lagerantal" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
                </div>

                <div>
                    <label htmlFor="category">Kategori:</label>
                    <input id="category" type="text" placeholder="Kategori" value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>

                <button type="submit">Lägg till produkt</button>
            </form>
        </div>
    );
};

export default AddProduct;
