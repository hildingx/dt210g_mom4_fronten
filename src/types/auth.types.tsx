// Definierar typer för autentisering och användarhantering

// Representerar en användare i systemet
export interface User {
    id: string;
    username: string;
}

// Inloggningsuppgifter som skickas vid inloggning
export interface LoginCredentials {
    username: string;
    password: string;
}

// Svar från servern vid lyckad inloggning
export interface AuthResponse {
    user: User;
    token: string;
}

// Definiera struktur för autentiseringskontexten
export interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}