// API-funktioner för att hantera produkter med Axios

import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

// Hämta alla produkter
export const fetchProducts = async () => {
    try {
        const res = await axios.get(API_URL);
        return res.data;
    } catch (error) {
        console.error("Fel vid hämtning av produkter:", error);
        throw new Error("Kunde inte hämta produkter");
    }
};

// Skapa ny produkt
export const createProduct = async (token: string, productData: object) => {
    try {
        const res = await axios.post(API_URL, productData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        console.error("Fel vid skapande av produkt:", error);
        throw new Error("Kunde inte skapa produkt");
    }
};

// Uppdatera produkt
export const updateProduct = async (token: string, productId: string, productData: object) => {
    try {
        const res = await axios.put(`${API_URL}/${productId}`, productData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        console.error("Fel vid uppdatering av produkt:", error);
        throw new Error("Kunde inte uppdatera produkt");
    }
};

// Ta bort produkt
export const deleteProduct = async (token: string, productId: string) => {
    try {
        await axios.delete(`${API_URL}/${productId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.error("Fel vid borttagning av produkt:", error);
        throw new Error("Kunde inte ta bort produkt");
    }
};