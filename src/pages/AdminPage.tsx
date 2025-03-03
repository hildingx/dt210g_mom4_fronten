// Administrationssida där användaren kan hantera produkter

// Importera React hooks och autentiseringskontext
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

// Importera API-funktioner för att hämta och hantera produkter
import { fetchProducts, deleteProduct } from "../api/products";

// Importerar komponente för att lägga till och redigera produkter
import AddProduct from "../components/AddProduct";
import EditProduct from "../components/EditProduct";

// Definiera typ för en produkt
interface Product {
    _id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    category?: string;
}

const AdminPage = () => {
    // Hämtar token från autentiseringskontexten
    const { token } = useAuth();

    // State för att hantera produkter, laddningsstatus och felmeddelanden
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Funktion för att hämta produkter från API:et
    const getProducts = async () => {
        try {
            const data = await fetchProducts();
            setProducts(data);
        } catch (error) {
            console.error(error);
            setError("Misslyckades att hämta produkter.");
        } finally {
            setLoading(false);
        }
    };

    // Funktion för att ta bort en produkt
    const handleDelete = async (productId: string) => {
        if (!token) return;

        const confirmDelete = window.confirm("Är du säker på att du vill ta bort denna produkt?");
        if (!confirmDelete) return;
        try {
            await deleteProduct(token, productId);
            setSuccessMessage("Produkten har tagits bort.");
            getProducts(); // Uppdatera produktlistan efter borttagning
        } catch (error) {
            console.error(error);
            setError("Misslyckades att ta bort produkten.");
        }
    };

    // Körs vid montering av komponenten för att hämta produkter
    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="administration">
            <h1>Administration</h1>

            {/* Visar formulär för att lägga till produkter om användaren är inloggad */}
            {token && <AddProduct onProductAdded={getProducts} token={token} />}

            {/* Visar laddningsindikator, felmeddelanden eller bekräftelsemeddelanden */}
            {loading && <p>Laddar produkter...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

            {/* Lista över produkter */}
            <div className="product-list">
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

            </div>

            {/* Rendera komponent som visar redigeringsformulär om en produkt har valts för redigering */}
            {editingProduct && (
                <EditProduct
                    product={editingProduct}
                    token={token!}
                    onUpdate={() => {
                        setEditingProduct(null);
                        getProducts();
                    }}
                    onCancel={() => setEditingProduct(null)}
                />
            )}
        </div>
    );
};

export default AdminPage;