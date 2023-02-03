import React, { useContext } from "react";
import Login from "../components/Login";
import Navbar from "../components/Navbar";
import CurrentUserContext from "../../context/userContext";
import Profil from "../components/Profil";

function ProfilePage() {
  const { user } = useContext(CurrentUserContext);
  return (
    <div className="profilPageContainer">
      <Navbar />
      {user.email ? <Profil /> : <Login />}
    </div>
  );
}

export default ProfilePage;
