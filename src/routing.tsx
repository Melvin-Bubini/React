import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ProductPage from "./pages/ProductPage";

import ProtectedRoute from "./components/ProtectedRoute";
import DynamicLayout from "./components/DynamicLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DynamicLayout />, // Byt till DynamicLayout
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <RegisterPage /> },
            { path: "/profile", element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
            { path: "/products", element: <ProtectedRoute><ProductPage /></ProtectedRoute> }
        ]
    }
]);

export default router;