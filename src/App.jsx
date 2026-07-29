import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PetDetails from "./pages/PetDetails";
import MyAdoptionRequests from "./components/MyAdoptionRequests";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/pets/:id" element={<PetDetails />} />
      <Route path="/my-adoption-requests" element={<MyAdoptionRequests />} />
    </Routes>
    </>
  );
}