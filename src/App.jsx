import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Precios from '@/pages/Precios';
import Categorias from '@/pages/Categorias';
import CategoriaDetalle from '@/pages/CategoriaDetalle';
import NegocioDetalle from '@/pages/NegocioDetalle';
import Registro from '@/pages/Registro';
import Admin from '@/pages/Admin';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/precios" element={<Precios />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/categorias/:slug" element={<CategoriaDetalle />} />
            <Route path="/negocio/:slug" element={<NegocioDetalle />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;