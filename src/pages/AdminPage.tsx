import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchProducts } from "../api/products";
import AddProduct from "../components/AddProduct";

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
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPage;