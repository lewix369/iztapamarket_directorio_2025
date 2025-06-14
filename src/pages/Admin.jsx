import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, AlertTriangle, CheckCircle, XCircle, Eye, Edit, 
  Trash2, Users, Store, TrendingUp, Clock, Search, Filter,
  Plus, Settings, BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Admin = () => {
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [negociosPendientes, setNegociosPendientes] = useState([]);
  const [activeTab, setActiveTab] = useState('pendientes');
  const [searchTerm, setSearchTerm] = useState('');

  // Simular verificación de admin (en producción sería con Supabase)
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'admin') {
      setIsAdmin(true);
      loadNegociosPendientes();
    }
  }, []);

  const loadNegociosPendientes = () => {
    const pendientes = JSON.parse(localStorage.getItem('negociosPendientes') || '[]');
    setNegociosPendientes(pendientes);
  };

  const handleLogin = () => {
    // Simular login de admin
    localStorage.setItem('userRole', 'admin');
    setIsAdmin(true);
    loadNegociosPendientes();
    toast({
      title: "Acceso concedido",
      description: "Bienvenido al panel de administración",
      duration: 3000,
    });
  };

  const handleAprobar = (id) => {
    const pendientes = JSON.parse(localStorage.getItem('negociosPendientes') || '[]');
    const negocioAprobado = pendientes.find(n => n.id === id);
    
    if (negocioAprobado) {
      // Remover de pendientes
      const nuevosPendientes = pendientes.filter(n => n.id !== id);
      localStorage.setItem('negociosPendientes', JSON.stringify(nuevosPendientes));
      
      // Agregar a negocios aprobados (en producción sería a la base de datos)
      const aprobados = JSON.parse(localStorage.getItem('negociosAprobados') || '[]');
      aprobados.push({ ...negocioAprobado, status: 'aprobado', fecha_aprobacion: new Date().toISOString() });
      localStorage.setItem('negociosAprobados', JSON.stringify(aprobados));
      
      setNegociosPendientes(nuevosPendientes);
      
      toast({
        title: "Negocio aprobado",
        description: `${negocioAprobado.nombre} ha sido aprobado y publicado`,
        duration: 5000,
      });
    }
  };

  const handleRechazar = (id) => {
    const pendientes = JSON.parse(localStorage.getItem('negociosPendientes') || '[]');
    const negocioRechazado = pendientes.find(n => n.id === id);
    
    if (negocioRechazado) {
      const nuevosPendientes = pendientes.filter(n => n.id !== id);
      localStorage.setItem('negociosPendientes', JSON.stringify(nuevosPendientes));
      setNegociosPendientes(nuevosPendientes);
      
      toast({
        title: "Negocio rechazado",
        description: `${negocioRechazado.nombre} ha sido rechazado`,
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Esta funcionalidad aún no está implementada",
      description: "¡Pero no te preocupes! Puedes solicitarla en tu próximo mensaje! 🚀",
      duration: 5000,
    });
  };

  const filteredNegocios = negociosPendientes.filter(negocio =>
    negocio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    negocio.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { icon: Store, label: "Negocios Totales", value: "156", color: "from-blue-500 to-blue-600" },
    { icon: Clock, label: "Pendientes", value: negociosPendientes.length.toString(), color: "from-yellow-500 to-orange-500" },
    { icon: CheckCircle, label: "Aprobados Hoy", value: "8", color: "from-green-500 to-emerald-500" },
    { icon: TrendingUp, label: "Crecimiento", value: "+12%", color: "from-purple-500 to-indigo-500" }
  ];

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#003366] to-[#f97316] rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#003366] mb-4">
              Panel de Administración
            </h1>
            <p className="text-gray-600 mb-6">
              Acceso restringido solo para administradores
            </p>
            <Button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-[#003366] to-[#f97316] hover:from-[#f97316] hover:to-[#003366] text-white font-semibold py-3"
            >
              Acceder como Admin (Demo)
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              En producción requeriría autenticación real
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#003366] to-[#f97316] rounded-full flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#003366]">Panel de Administración</h1>
                <p className="text-gray-600">IztapaMarket - Gestión de Negocios</p>
              </div>
            </div>
            
            {negociosPendientes.length > 0 && (
              <div className="flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full">
                <AlertTriangle className="w-5 h-5 mr-2" />
                <span className="font-semibold">{negociosPendientes.length} pendientes</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Estadísticas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mr-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#003366]">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navegación de Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-2">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('pendientes')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'pendientes'
                  ? 'bg-[#f97316] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Clock className="w-5 h-5 inline mr-2" />
              Pendientes ({negociosPendientes.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('aprobados');
                handleFeatureClick('aprobados');
              }}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'aprobados'
                  ? 'bg-[#f97316] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <CheckCircle className="w-5 h-5 inline mr-2" />
              Aprobados
            </button>
            <button
              onClick={() => {
                setActiveTab('estadisticas');
                handleFeatureClick('estadisticas');
              }}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'estadisticas'
                  ? 'bg-[#f97316] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="w-5 h-5 inline mr-2" />
              Estadísticas
            </button>
            <button
              onClick={() => {
                setActiveTab('configuracion');
                handleFeatureClick('configuracion');
              }}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'configuracion'
                  ? 'bg-[#f97316] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Settings className="w-5 h-5 inline mr-2" />
              Configuración
            </button>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'pendientes' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#003366]">
                Negocios Pendientes de Aprobación
              </h2>
              
              {/* Búsqueda */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar negocios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f97316] focus:border-transparent"
                />
              </div>
            </div>

            {filteredNegocios.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  ¡Todo al día!
                </h3>
                <p className="text-gray-500">
                  No hay negocios pendientes de aprobación
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNegocios.map((negocio, index) => (
                  <motion.div
                    key={negocio.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-xl font-bold text-[#003366] mr-3">
                            {negocio.nombre}
                          </h3>
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {negocio.categoria}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{negocio.descripcion}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                          <div>
                            <strong>Teléfono:</strong> {negocio.telefono}
                          </div>
                          <div>
                            <strong>WhatsApp:</strong> {negocio.whatsapp || 'No proporcionado'}
                          </div>
                          <div className="md:col-span-2">
                            <strong>Dirección:</strong> {negocio.direccion}
                          </div>
                          <div>
                            <strong>Horarios:</strong> {negocio.hours || 'No especificados'}
                          </div>
                          <div>
                            <strong>Fecha de registro:</strong> {new Date(negocio.fecha_registro).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-6">
                        <Button
                          onClick={() => handleFeatureClick('ver')}
                          variant="outline"
                          size="sm"
                          className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Ver
                        </Button>
                        
                        <Button
                          onClick={() => handleFeatureClick('editar')}
                          variant="outline"
                          size="sm"
                          className="border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
                        
                        <Button
                          onClick={() => handleAprobar(negocio.id)}
                          size="sm"
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Aprobar
                        </Button>
                        
                        <Button
                          onClick={() => handleRechazar(negocio.id)}
                          variant="outline"
                          size="sm"
                          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Rechazar
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Acciones Rápidas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <h3 className="text-xl font-bold text-[#003366] mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() => handleFeatureClick('agregar')}
              className="bg-[#f97316] hover:bg-[#ea580c] text-white p-4 h-auto flex flex-col items-center"
            >
              <Plus className="w-6 h-6 mb-2" />
              <span>Agregar Negocio</span>
            </Button>
            
            <Button
              onClick={() => handleFeatureClick('exportar')}
              variant="outline"
              className="border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white p-4 h-auto flex flex-col items-center"
            >
              <BarChart3 className="w-6 h-6 mb-2" />
              <span>Exportar Datos</span>
            </Button>
            
            <Button
              onClick={() => handleFeatureClick('configurar')}
              variant="outline"
              className="border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white p-4 h-auto flex flex-col items-center"
            >
              <Settings className="w-6 h-6 mb-2" />
              <span>Configuración</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;