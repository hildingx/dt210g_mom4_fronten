// Komponent för att redigera en produkt

// Importera Reacts useState-hook och API-funktion för uppdatering
import { useState } from "react";
import { updateProduct } from "../api/products";

// Definierar props som komponenten tar emot
interface EditProductProps {
    product: {
        _id: string;
        name: string;
        description?: string;
        price: number;
        stock: number;
        category?: string;
    };
    token: string;
    onUpdate: () => void; // Callback-funktion som anropas vid uppdatering
    onCancel: () => void; // Callback-funktion för att avbryta redigering
}

// Komponent för att hantera redigering av en produkt
const EditProduct = ({ product, token, onUpdate, onCancel }: EditProductProps) => {
    // State för att hantera inmatade värden i formuläret
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description || "");
    const [price, setPrice] = useState(product.price);
    const [stock, setStock] = useState(product.stock);
    const [category, setCategory] = useState(product.category || "");
    const [error, setError] = useState("");

    // Funktion för att hantera uppdatering av produkt
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validering på input
        if (!name || !price || !stock) {
            setError("Namn, pris och lagerantal krävs!");
            return;
        }

        try {
            await updateProduct(token, product._id, { name, description, price, stock, category });
            onUpdate();
        } catch (error) {
            console.log(error);
            setError("Misslyckades att uppdatera produkten.");
        }
    };

    return (
        <div className="addProductForm">
            <h2>Redigera produkt</h2>
            {/* Visar felmeddelande */}
            {error && <p style={{ color: "red", margin: "10px", textAlign: "center" }}>{error}</p>}
            <form onSubmit={handleUpdate}>
                <div>
                    <label htmlFor="name">Produktnamn:</label>
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="description">Beskrivning:</label>
                    <input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="price">Pris:</label>
                    <input id="price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                </div>

                <div>
                    <label htmlFor="stock">Lagerantal:</label>
                    <input id="stock" type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
                </div>

                <div>
                    <label htmlFor="category">Kategori:</label>
                    <input id="category" type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>

                <div className="editProductButtons">
                    <button type="submit">Uppdatera</button>
                    <button type="button" onClick={onCancel} className="cancel-button">Avbryt</button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;