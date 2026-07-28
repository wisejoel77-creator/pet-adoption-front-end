import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function Home() {
  return <h1> PawFound Home</h1>;
}

function Login() {
  return <h1> Login Page</h1>;
}

function Register() {
  return <h1>Register Page</h1>;
}

export default function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </>
  );
}