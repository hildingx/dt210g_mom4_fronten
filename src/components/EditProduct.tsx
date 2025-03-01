import { useState } from "react";
import { updateProduct } from "../api/products";

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
    onUpdate: () => void;
}

const EditProduct = ({ product, token, onUpdate }: EditProductProps) => {
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description || "");
    const [price, setPrice] = useState(product.price);
    const [stock, setStock] = useState(product.stock);
    const [category, setCategory] = useState(product.category || "");
    const [error, setError] = useState("");

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await updateProduct(token, product._id, { name, description, price, stock, category });
            onUpdate();
        } catch (error) {
            console.log(error);
            setError("Misslyckades att uppdatera produkten.");
        }
    };

    return (
        <div>
            <h2>Redigera produkt</h2>
            {error && <p style={{ color: "rted" }}>{error}</p>}
            <form onSubmit={handleUpdate}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                <input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                <button type="submit">Uppdatera</button>
            </form>
        </div>
    );
};

export default EditProduct;