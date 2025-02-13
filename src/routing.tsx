import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LayoutNotAccess from "./components/LayoutNotaccess";
import LayoutAccess from "./components/LayoutAccess";

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
        ]
    }
]);

export default router;