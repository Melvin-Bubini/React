import { useAuth } from "../context/AuthContext"

const ProfilePage = () => {
  const {user, logout} = useAuth();

    if (!user) {
        return <p>Laddar...</p>;
    }
  return (
    <div>
        <h1>Välkommen, {user.name}!</h1>
        <p>E-post: {user.email}</p>
        <p>Logga ut: <button onClick={logout}>Logga ut</button></p>
    </div>
  )
}

export default ProfilePage