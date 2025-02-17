import { createContext, useState, useContext, ReactNode } from "react";
import { User, LoginCredentials, AuthContextType, AuthResponse } from "../types/auth.types";

// skapa context
const AuthContext = createContext<AuthContextType | null>(null);

// Provider
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (credentials: LoginCredentials) => {

        try {
            const response = await fetch("http://localhost:4000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            })

            if (!response.ok) {
                throw new Error("Kunde inte logga in");
            }

            const data = await response.json() as AuthResponse;

            localStorage.setItem("jwt", data.token);

            setUser(data.user);
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }

    }
    
    const logout = () => {
        localStorage.removeItem("jwt");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () : AuthContextType => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuth måste användas inom en AuthProvider");
    }

    return context;
}