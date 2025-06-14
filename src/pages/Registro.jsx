import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, MapPin, Phone, Clock, Globe, Instagram, Facebook, Save, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { categorias } from '@/data/negocios';

const Registro = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    telefono: '',
    direccion: '',
    whatsapp: '',
    instagram: '',
    facebook: '',
    web: '',
    hours: '',
    services: '',
    menu: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre del negocio es obligatorio';
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es obligatoria';
    } else if (formData.descripcion.length > 100) {
      newErrors.descripcion = 'La descripción no puede exceder 100 caracteres';
    }

    if (!formData.categoria) {
      newErrors.categoria = 'Selecciona una categoría';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es obligatorio';
    }

    if (!formData.direccion.trim()) {
      newErrors.direccion = 'La dirección es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Error en el formulario",
        description: "Por favor corrige los errores marcados",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular envío del formulario
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Guardar en localStorage como ejemplo
      const negociosGuardados = JSON.parse(localStorage.getItem('negociosPendientes') || '[]');
      const nuevoNegocio = {
        ...formData,
        id: Date.now(),
        plan_type: 'free',
        status: 'pendiente',
        fecha_registro: new Date().toISOString(),
        slug: formData.nombre.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim('-')
      };

      negociosGuardados.push(nuevoNegocio);
      localStorage.setItem('negociosPendientes', JSON.stringify(negociosGuardados));

      toast({
        title: "¡Registro exitoso! 🎉",
        description: "Tu negocio ha sido enviado para revisión. Te contactaremos pronto.",
        duration: 8000,
      });

      // Limpiar formulario
      setFormData({
        nombre: '',
        descripcion: '',
        categoria: '',
        telefono: '',
        direccion: '',
        whatsapp: '',
        instagram: '',
        facebook: '',
        web: '',
        hours: '',
        services: '',
        menu: ''
      });

    } catch (error) {
      toast({
        title: "Error al registrar",
        description: "Hubo un problema al enviar tu registro. Inténtalo de nuevo.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = () => {
    toast({
      title: "🚧 Esta funcionalidad aún no está implementada",
      description: "¡Pero no te preocupes! Puedes solicitarla en tu próximo mensaje! 🚀",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#003366] via-[#1e40af] to-[#f97316] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-6">
              <Link 
                to="/"
                className="flex items-center text-white/80 hover:text-white transition-colors mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver al inicio
              </Link>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              Registra tu Negocio
            </h1>
            <p className="text-xl text-blue-100 text-center max-w-3xl mx-auto">
              Únete a la comunidad de negocios locales de Iztapalapa y comienza a recibir más clientes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Información del Plan Gratuito */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎁</span>
              </div>
              <h2 className="text-2xl font-bold text-[#003366] mb-2">Plan Gratuito</h2>
              <p className="text-gray-600">Perfecto para empezar a dar a conocer tu negocio</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-[#003366] mb-3">✅ Incluye:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Nombre del negocio</li>
                  <li>• Dirección completa</li>
                  <li>• Número de teléfono</li>
                  <li>• 1 imagen principal</li>
                  <li>• Categoría del negocio</li>
                  <li>• Horarios básicos</li>
                  <li>• Descripción corta (100 caracteres)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-500 mb-3">Limitaciones:</h3>
                <ul className="space-y-2 text-gray-500 text-sm">
                  <li>• Sin redes sociales</li>
                  <li>• Sin galería de imágenes</li>
                  <li>• Sin mapa integrado</li>
                  <li>• Sin estadísticas</li>
                  <li>• Posicionamiento básico</li>
                </ul>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    💡 <strong>¿Quieres más funciones?</strong> Puedes actualizar a un plan Pro o Premium después del registro.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Formulario de Registro */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Información Básica */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-[#003366] mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-2" />
                  Información Básica
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Negocio *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f97316] focus:border-transparent ${
                        errors.nombre ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Ej: Tacos El Güero"
                    />
                    {errors.nombre && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.nombre}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría *
                    </label>
                    <select
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f97316] focus:border-transparent ${
                        errors.categoria ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Selecciona una categoría</option>
                      {categorias.map(categoria => (
                        <option key={categoria.slug} value={categoria.slug}>
                          {categoria.icono} {categoria.nombre}
                        </option>
                      ))}
                    </select>
                    {errors.categoria && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.categoria}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción del Negocio * (máximo 100 caracteres)
                  </label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    rows={3}
                    maxLength={100}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f97316] focus:border-transparent ${
                      errors.descripcion ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Describe brevemente tu negocio..."
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.descripcion ? (
                      <p className="text-red-500 text-sm flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.descripcion}
                      </p>
                    ) : (
                      <span></span>
                    )}
                    <span className="text-sm text-gray-500">
                      {formData.descripcion.length}/100
                    </span>
                  </div>
                </div>
              </div>

              {/* Información de Contacto */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-[#003366] mb-6 flex items-center">
                  <Phone className="w-6 h-6 mr-2" />
                  Información de Contacto
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f97316] focus:border-transparent ${
                        errors.telefono ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="55-1234-5678"
                    />
                    {errors.telefono && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.telefono}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      WhatsApp (opcional)
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f97316] focus:border-transparent"
                      placeholder="5551234567"
                    />
                    <p className="text-sm text-gray-500 mt-1">Solo números, sin espacios ni guiones</p>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección Completa *
                  </label>
                  <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f97316] focus:border-transparent ${
                      errors.direccion ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Av. Ermita Iztapalapa 123, Col. Santa Martha Acatitla"
                  />
                  {errors.direccion && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.direccion}
                    </p>
                  )}
                </div>
              </div>

              {/* Horarios */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-[#003366] mb-6 flex items-center">
                  <Clock className="w-6 h-6 mr-2" />
                  Horarios de Atención
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Horarios (opcional)
                  </label>
                  <input
                    type="text"
                    name="hours"
                    value={formData.hours}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f97316] focus:border-transparent"
                    placeholder="Lunes a Domingo: 8:00 AM - 10:00 PM"
                  />
                </div>
              </div>

              {/* Imagen Principal */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-[#003366] mb-6 flex items-center">
                  <Upload className="w-6 h-6 mr-2" />
                  Imagen Principal
                </h3>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    Sube una imagen representativa de tu negocio
                  </p>
                  <Button
                    type="button"
                    onClick={handleImageUpload}
                    variant="outline"
                    className="border-[#f97316] text-[#f97316] hover:bg-[#f97316] hover:text-white"
                  >
                    Seleccionar Imagen
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    Formatos: JPG, PNG. Tamaño máximo: 5MB
                  </p>
                </div>
              </div>

              {/* Información Adicional (Opcional) */}
              <div className="bg-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-[#003366] mb-4">
                  Información Adicional (Opcional)
                </h3>
                <p className="text-gray-600 mb-6">
                  Esta información estará disponible cuando actualices a un plan Pro o Premium
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Instagram className="w-4 h-4 inline mr-1" />
                      Instagram
                    </label>
                    <input
                      type="text"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                      placeholder="@tu_negocio"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Facebook className="w-4 h-4 inline mr-1" />
                      Facebook
                    </label>
                    <input
                      type="text"
                      name="facebook"
                      value={formData.facebook}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                      placeholder="TuNegocio"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Globe className="w-4 h-4 inline mr-1" />
                      Sitio Web
                    </label>
                    <input
                      type="url"
                      name="web"
                      value={formData.web}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                      placeholder="https://tu-negocio.com"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Servicios
                    </label>
                    <input
                      type="text"
                      name="services"
                      value={formData.services}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                      placeholder="Servicio 1, Servicio 2, Servicio 3"
                      disabled
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Menú/Precios
                  </label>
                  <textarea
                    name="menu"
                    value={formData.menu}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                    placeholder="Describe tu menú o lista de precios..."
                    disabled
                  />
                </div>

                <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700">
                    💡 <strong>¿Quieres incluir esta información desde el inicio?</strong> 
                    <Link to="/precios" className="text-blue-600 hover:underline ml-1">
                      Conoce nuestros planes Pro y Premium
                    </Link>
                  </p>
                </div>
              </div>

              {/* Botón de Envío */}
              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="bg-gradient-to-r from-[#003366] to-[#f97316] hover:from-[#f97316] hover:to-[#003366] text-white font-bold px-12 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Registrar Mi Negocio Gratis
                    </>
                  )}
                </Button>

                <p className="text-sm text-gray-500 mt-4">
                  Al registrarte, aceptas nuestros términos y condiciones. 
                  Tu negocio será revisado antes de ser publicado.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Información Adicional */}
      <section className="py-16 bg-gradient-to-br from-[#003366] to-[#f97316] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              ¿Qué Sucede Después del Registro?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="text-xl font-bold mb-2">1. Revisión</h3>
                <p className="text-blue-100">
                  Nuestro equipo revisa tu información en 24-48 horas
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="text-xl font-bold mb-2">2. Aprobación</h3>
                <p className="text-blue-100">
                  Te notificamos por email cuando tu negocio esté activo
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold mb-2">3. ¡En Línea!</h3>
                <p className="text-blue-100">
                  Tu negocio aparece en IztapaMarket y comienza a recibir clientes
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Registro;