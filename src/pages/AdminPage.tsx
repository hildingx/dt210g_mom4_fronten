import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchProducts, deleteProduct } from "../api/products";
import AddProduct from "../components/AddProduct";
import EditProduct from "../components/EditProduct";

interface Product {
    _id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    category?: string;
}

const AdminPage = () => {

    const { user, token } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const getProducts = async () => {
        try {
            const data = await fetchProducts();
            setProducts(data);
        } catch (error) {
            setError("Misslyckades att hämta produkter" + error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (productId: string) => {
        if (!token) return;
        try {
            await deleteProduct(token, productId);
            getProducts();
        } catch (error) {
            console.error("Misslyckades att ta bort produkt:", error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div>
            <h1>Admin-sida</h1>
            <p>Hej och välkommen {user ? user.username : "!"}</p>

            {token && <AddProduct onProductAdded={getProducts} token={token} />}

            {loading && <p>Laddar produkter...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <h2>Produkter</h2>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        {product.name} - {product.price} kr ({product.stock} i lager)
                        <button onClick={() => setEditingProduct(product)}>Redigera</button>
                        <button onClick={() => handleDelete(product._id)}>Ta bort</button>
                    </li>
                ))}
            </ul>

            {editingProduct && (
                <EditProduct
                    product={editingProduct}
                    token={token!}
                    onUpdate={() => {
                        setEditingProduct(null);
                        getProducts();
                    }}
                />
            )}
        </div>
    );
};

export default AdminPage;