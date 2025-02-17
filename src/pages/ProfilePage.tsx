import { useAuth } from "../context/AuthContext"

const ProfilePage = () => {
  const {user} = useAuth();

  console.log("Profilens user:", user);

    if (!user) {
        return <p>Laddar...</p>;
    }
  return (
    <div>
        <h1>Välkommen, {user.name}!</h1>
        <p>E-post: {user.email}</p>
    </div>
  )
}

export default ProfilePage