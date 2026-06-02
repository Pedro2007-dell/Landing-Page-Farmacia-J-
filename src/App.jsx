import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";

import Header from "./components/header/Header.jsx";
import Hero from "./components/hero/hero.jsx";
import Register from "./components/register/Register.jsx";
import Medicamentos from "./components/medicamentos/Medicamentos.jsx";
import Farmacias from "./components/farmacias/Farmacias.jsx";
import Categorias from './components/categorias/Categorias.jsx';
import Footer from "./components/footer/Footer.jsx";
import Login from "./components/Login/login.jsx";

function App() {
  return (
    <>
    <Router>
      <Header />   

      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Categorias />
          </>
        } />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/medicamentos" element={<Medicamentos />} />
        <Route path="/farmacias" element={<Farmacias />} />
      </Routes>

      <Footer/>
    </Router>
    
    </>
  );
}

export default App;