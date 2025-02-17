import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import LayoutNotAccess from "./components/LayoutNotAccess";
import LayoutAccess from "./components/LayoutAccess";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutNotAccess />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <RegisterPage /> },
            { path: "*", element: <HomePage /> },
        ]
    },
    {
        path: "/",
        element: <LayoutAccess />,
        children: [
            // logged in users
            { path: "/profile", element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
        ]
    }
]);

export default router;