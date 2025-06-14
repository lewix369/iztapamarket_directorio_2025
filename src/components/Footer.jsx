import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#003366] to-[#1e40af] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#f97316] to-[#ea580c] rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold">IztapaMarket</span>
                <p className="text-blue-200 text-sm">Directorio Local de Iztapalapa</p>
              </div>
            </div>
            <p className="text-blue-100 mb-4 max-w-md">
              Conectamos a la comunidad de Iztapalapa con los mejores negocios locales. 
              Descubre comercios, servicios y emprendedores cerca de ti.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-[#f97316] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-blue-200 hover:text-[#f97316] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-blue-200 hover:text-[#f97316] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <span className="text-lg font-semibold mb-4 block">Enlaces Rápidos</span>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-200 hover:text-[#f97316] transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/categorias" className="text-blue-200 hover:text-[#f97316] transition-colors">
                  Categorías
                </Link>
              </li>
              <li>
                <Link to="/precios" className="text-blue-200 hover:text-[#f97316] transition-colors">
                  Precios
                </Link>
              </li>
              <li>
                <Link to="/registro" className="text-blue-200 hover:text-[#f97316] transition-colors">
                  Registrar Negocio
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <span className="text-lg font-semibold mb-4 block">Contacto</span>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#f97316]" />
                <span className="text-blue-200 text-sm">Iztapalapa, CDMX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#f97316]" />
                <span className="text-blue-200 text-sm">+52 55 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#f97316]" />
                <span className="text-blue-200 text-sm">info@iztapamarket.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-400/30 mt-8 pt-8 text-center">
          <p className="text-blue-200 text-sm">
            © 2024 IztapaMarket. Todos los derechos reservados. Hecho con ❤️ para Iztapalapa.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;