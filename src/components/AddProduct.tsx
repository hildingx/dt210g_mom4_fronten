import { useState } from "react";
import { createProduct } from "../api/products";

interface AddProductProps {
    onProductAdded: () => void;
    token: string;
}

const AddProduct = ({ onProductAdded, token }: AddProductProps) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [stock, setStock] = useState<number | "">("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name || !price || !stock) {
            setError("Namn, pris och lagerantal krävs!");
            return;
        }

        try {
            await createProduct(token, { name, description, price: Number(price), stock: Number(stock), category });
            onProductAdded(); // Uppdaterar produktlistan i AdminPage
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
        <div>
            <h3>Lägg till ny produkt</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Produktnamn" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Beskrivning" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="number" placeholder="Pris" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                <input type="number" placeholder="Lagerantal" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
                <input type="text" placeholder="Kategori" value={category} onChange={(e) => setCategory(e.target.value)} />
                <button type="submit">Lägg till produkt</button>
            </form>
        </div>
    );
};

export default AddProduct;
