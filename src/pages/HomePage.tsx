import { useAuth } from "../context/AuthContext";
import LayoutNotAccess from "../components/LayoutNotAccess";
import LayoutAccess from "../components/LayoutAccess";

const HomePage = () => {
    const { user } = useAuth();  // Kolla om användaren är inloggad

    return (
        <>
            {user ? <LayoutAccess /> : <LayoutNotAccess />}
            <main className="home-container">
                <h1>Välkommen till vår sida!</h1>
                <p>Här kan du utforska våra produkter och tjänster.</p>
            </main>
        </>
    );
};

export default HomePage;
