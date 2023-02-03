import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Register from "./Register";
import Upload from "./Upload";
import Login from "./Login";
import ProfilePage from "../pages/ProfilePage";
import ImageBox from "./ImageBox";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<ProfilePage />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/imageBox" element={<ImageBox />} />
    </Routes>
  );
}
