import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ProductPage from "./pages/ProductPage";
import LayoutNotAccess from "./components/LayoutNotAccess";
import LayoutAccess from "./components/LayoutAccess";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,  // startsidan en egen rutt
    },
    {
        path: "/",
        element: <LayoutNotAccess />,
        children: [
            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <RegisterPage /> }
        ]
    },
    {
        path: "/",
        element: <LayoutAccess />,
        children: [
            // logged in users
            { path: "/profile", element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
            { path: "/products", element: <ProtectedRoute><ProductPage /></ProtectedRoute>}
        ]
    }
]);

export default router;