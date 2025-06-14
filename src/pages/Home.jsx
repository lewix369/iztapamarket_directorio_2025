import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, ArrowRight, Users, Store, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categorias, getNegociosDestacados, getNegociosOrdenados } from '@/data/negocios';

const Home = () => {
  const negociosDestacados = getNegociosDestacados();
  const todosLosNegocios = getNegociosOrdenados().slice(0, 6);

  const stats = [
    { icon: Store, label: "Negocios Registrados", value: "150+" },
    { icon: Users, label: "Usuarios Activos", value: "5,000+" },
    { icon: Award, label: "Años de Experiencia", value: "3+" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#003366] via-[#1e40af] to-[#f97316] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Descubre los Mejores
                <span className="block text-[#f97316]">Negocios Locales</span>
                de Iztapalapa
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Conectamos a la comunidad con comercios, servicios y emprendedores de confianza
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  asChild
                  size="lg"
                  className="bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <Link to="/categorias">
                    <Search className="w-5 h-5 mr-2" />
                    Explorar Negocios
                  </Link>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#003366] font-semibold px-8 py-4 text-lg"
                >
                  <Link to="/registro">
                    <Store className="w-5 h-5 mr-2" />
                    Registrar Mi Negocio
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img  
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl animate-float" 
                  alt="Negocios locales de Iztapalapa"
                 src="https://images.unsplash.com/photo-1691163292922-fb44a11ae2fa" />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-[#f97316]/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-orange-50 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#003366] to-[#f97316] rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-[#003366] mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categorías Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#003366] mb-4">
              Explora por Categorías
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Encuentra exactamente lo que buscas en nuestra amplia variedad de categorías
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorias.map((categoria, index) => (
              <motion.div
                key={categoria.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={`/categorias/${categoria.slug}`}
                  className="block group"
                >
                  <div className={`bg-gradient-to-br ${categoria.color} p-8 rounded-2xl text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}>
                    <div className="text-4xl mb-4">{categoria.icono}</div>
                    <h3 className="text-2xl font-bold mb-2">{categoria.nombre}</h3>
                    <p className="text-white/90 mb-4">{categoria.descripcion}</p>
                    <div className="flex items-center text-white group-hover:translate-x-2 transition-transform">
                      <span className="font-semibold">Ver más</span>
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Negocios Destacados */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#003366] mb-4">
              Negocios Destacados
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Los mejores negocios de Iztapalapa con plan Premium
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {negociosDestacados.map((negocio, index) => (
              <motion.div
                key={negocio.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/negocio/${negocio.slug}`}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-105">
                    <div className="relative">
                      <img 
                        src={negocio.imagen_url} 
                        alt={negocio.nombre}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-[#f97316] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        Premium
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#003366] mb-2">{negocio.nombre}</h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">{negocio.descripcion}</p>
                      <div className="flex items-center text-gray-500 mb-3">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{negocio.direccion}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#f97316] font-semibold">{negocio.categoria}</span>
                        <ArrowRight className="w-5 h-5 text-[#003366] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Todos los Negocios */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#003366] mb-4">
              Todos los Negocios
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre la diversidad de negocios locales en Iztapalapa
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {todosLosNegocios.map((negocio, index) => (
              <motion.div
                key={negocio.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/negocio/${negocio.slug}`}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-105">
                    <div className="relative">
                      <img 
                        src={negocio.imagen_url} 
                        alt={negocio.nombre}
                        className="w-full h-48 object-cover"
                      />
                      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                        negocio.plan_type === 'premium' 
                          ? 'bg-[#f97316] text-white' 
                          : negocio.plan_type === 'profesional'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-500 text-white'
                      }`}>
                        {negocio.plan_type === 'premium' && <Star className="w-4 h-4 mr-1 inline" />}
                        {negocio.plan_type === 'premium' ? 'Premium' : 
                         negocio.plan_type === 'profesional' ? 'Pro' : 'Gratis'}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#003366] mb-2">{negocio.nombre}</h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">{negocio.descripcion}</p>
                      <div className="flex items-center text-gray-500 mb-3">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{negocio.direccion}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#f97316] font-semibold">{negocio.categoria}</span>
                        <ArrowRight className="w-5 h-5 text-[#003366] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-[#003366] to-[#f97316] hover:from-[#f97316] hover:to-[#003366] text-white font-semibold px-8 py-4"
            >
              <Link to="/categorias">
                Ver Todos los Negocios
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#003366] to-[#f97316] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              ¿Tienes un Negocio en Iztapalapa?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
              Únete a nuestra comunidad y haz que más personas descubran tu negocio. 
              Registra tu negocio hoy y comienza a crecer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                className="bg-white text-[#003366] hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
              >
                <Link to="/registro">
                  <Store className="w-5 h-5 mr-2" />
                  Registrar Mi Negocio
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-[#003366] font-semibold px-8 py-4 text-lg"
              >
                <Link to="/precios">
                  Ver Planes y Precios
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;