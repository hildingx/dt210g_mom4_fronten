import axios from "axios";

// Hämta alla produkter
export const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    return res.data;
};

// Skapa ny produkt
export const createProduct = async (token: string, productData: object) => {
    return await axios.post("http://localhost:5000/api/products", productData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Uppdatera produkt
export const updateProduct = async (token: string, productId: string, productData: object) => {
    return await axios.put(`http://localhost:5000/api/products/${productId}`, productData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Ta bort produkt
export const deleteProduct = async (token: string, productId: string) => {
    return await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};