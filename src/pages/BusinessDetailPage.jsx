import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Globe,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  ArrowLeft,
  Share2,
  Heart,
  ShoppingBag,
  User,
  Edit,
  Trash,
} from "lucide-react"; // Updated icons
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useSupabase } from "@/contexts/SupabaseContext";
import {
  getBusinessBySlug,
  getReviewsByBusinessId,
  createReview,
} from "@/lib/database";

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5 fill-current"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.33 3.43 16.79L2.05 22L7.31 20.59C8.75 21.36 10.35 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 6.45 17.5 2 12.04 2M12.04 3.67C16.57 3.67 20.28 7.38 20.28 11.91C20.28 16.44 16.57 20.15 12.04 20.15C10.53 20.15 9.11 19.74 7.92 19L7.58 18.83L4.44 19.6L5.26 16.53L5.06 16.17C4.21 14.81 3.79 13.21 3.79 11.91C3.79 7.38 7.5 3.67 12.04 3.67M9.15 7.5C8.94 7.5 8.74 7.55 8.57 7.69C8.4 7.84 8.03 8.23 8.03 8.93C8.03 9.62 8.59 10.29 8.69 10.41L8.7 10.41C8.81 10.53 10.36 12.95 12.73 13.9C14.77 14.72 15.35 14.55 15.78 14.51C16.48 14.42 16.95 13.78 17.12 13.11C17.29 12.43 17.24 11.93 17.12 11.81C17 11.69 16.77 11.59 16.43 11.42C16.08 11.23 14.61 10.53 14.36 10.44C14.11 10.34 13.93 10.3 13.76 10.57C13.59 10.85 13.08 11.42 12.94 11.59C12.8 11.77 12.65 11.81 12.39 11.7C12.14 11.59 11.21 11.26 10.11 10.27C9.26 9.53 8.73 8.67 8.59 8.39C8.44 8.11 8.56 7.99 8.69 7.87C8.8 7.77 8.93 7.61 9.06 7.48C9.19 7.35 9.25 7.24 9.34 7.07C9.43 6.9 9.38 6.75 9.33 6.64C9.28 6.52 8.93 6.52 9.15 7.5Z" />
  </svg>
);

const BusinessDetailPage = () => {
  const { slug } = useParams();
  const { supabase } = useSupabase();
  const [business, setBusiness] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);
  const { toast } = useToast();

  const loadBusinessData = useCallback(async () => {
    const businessData = await getBusinessBySlug(slug);
    setBusiness(businessData);
    if (businessData) {
      const reviewsData = await getReviewsByBusinessId(businessData.id);
      setReviews(reviewsData);
    }
  }, [slug]);

  useEffect(() => {
    loadBusinessData();
  }, [loadBusinessData]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!business) return;
    if (newReview.trim()) {
      const reviewData = {
        negocio_id: business.id,
        rating: rating,
        comment: newReview,
        author: "Usuario Anónimo",
      };
      const created = await createReview(reviewData);
      if (created) {
        setReviews([created, ...reviews]);
        setNewReview("");
        setRating(5);
        toast({
          title: "✅ Reseña enviada",
          description: "Tu reseña ha sido publicada.",
        });
      } else {
        toast({
          title: "❌ Error",
          description: "No se pudo enviar tu reseña.",
          variant: "destructive",
        });
      }
    }
  };

  const handleShare = () =>
    toast({
      title: "🚧 No implementado",
      description: "¡Puedes solicitarlo en tu próximo prompt! 🚀",
    });
  const handleFavorite = () =>
    toast({
      title: "🚧 No implementado",
      description: "¡Puedes solicitarlo en tu próximo prompt! 🚀",
    });
  const handleContact = () =>
    toast({
      title: "🚧 No implementado",
      description: "¡Puedes solicitarlo en tu próximo prompt! 🚀",
    });

  if (!business) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Negocio no encontrado
          </h1>
          <p className="text-gray-600 mb-8">
            El negocio que buscas no existe o ha sido removido.
          </p>
          <Link to="/negocios">
            <Button>Volver al Directorio</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <section className="relative h-96 overflow-hidden">
        <img
          alt={`${business.nombre} - Vista principal`}
          className="w-full h-full object-cover"
          src={
            business.imagen_url ||
            "https://images.unsplash.com/photo-1697256200022-f61abccad430"
          }
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white space-y-4"
            >
              <Link
                to="/negocios"
                className="inline-flex items-center text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Volver al directorio
              </Link>
              <div className="flex flex-wrap items-center gap-4">
                <Badge
                  variant={
                    business.plan_type === "Premium"
                      ? "orange"
                      : business.plan_type === "Pro"
                      ? "blue"
                      : "secondary"
                  }
                  className="text-sm px-3 py-1"
                >
                  {business.plan_type}
                </Badge>
                <Badge variant="outline" className="text-white border-white/50">
                  {business.categoria}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                {business.nombre}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-xl font-semibold">
                    {business.rating || 0}
                  </span>
                  <span className="text-white/80">
                    ({reviews.length || 0} reseñas)
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="text-white border-white/50 hover:bg-white/10"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleFavorite}
                    className="text-white border-white/50 hover:bg-white/10"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Acerca de {business.nombre}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      {business.descripcion}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {business.plan_type === "Premium" && business.video_embed_url && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Video del Negocio</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-w-16 aspect-h-9">
                        <iframe
                          src={business.video_embed_url}
                          title={`Video de ${business.nombre}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full rounded-lg"
                        ></iframe>
                      </div>
                      <a
                        href={business.video_embed_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="mt-4 w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white">
                          <Youtube className="mr-2 h-5 w-5" /> Ver Video en
                          YouTube
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {business.gallery_images &&
                business.gallery_images.length > 0 &&
                business.gallery_images.some(
                  (img) => img && img.trim() !== ""
                ) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Galería</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {business.gallery_images
                            .filter((img) => img && img.trim() !== "")
                            .map((imgUrl, index) => (
                              <a
                                key={index}
                                href={imgUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img
                                  src={imgUrl}
                                  alt={`${
                                    business.nombre
                                  } - Imagen de galería ${index + 1}`}
                                  className="w-full h-32 object-cover rounded-lg hover:opacity-80 transition-opacity"
                                />
                              </a>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Reseñas ({reviews.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form
                      onSubmit={handleSubmitReview}
                      className="space-y-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <h4 className="font-semibold">Escribir una reseña</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">Calificación:</span>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-5 w-5 ${
                                star <= rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <Textarea
                        placeholder="Comparte tu experiencia..."
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Publicar Reseña
                      </Button>
                    </form>
                    <div className="space-y-4">
                      {reviews.length === 0 && (
                        <p className="text-gray-600">
                          Este negocio aún no tiene reseñas. ¡Sé el primero!
                        </p>
                      )}
                      {reviews.map((review) => (
                        <div
                          key={review.id}
                          className="border-b pb-4 last:border-b-0"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h5 className="font-semibold">{review.author}</h5>
                              <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= review.rating
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(review.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Información de Contacto</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {business.direccion && (
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                        <span>{business.direccion}</span>
                      </div>
                    )}
                    {business.telefono && (
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <span>{business.telefono}</span>
                      </div>
                    )}
                    {business.hours && (
                      <div className="flex items-start space-x-3">
                        <Clock className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                        <span>{business.hours}</span>
                      </div>
                    )}
                    {business.web && (
                      <div className="flex items-center space-x-3">
                        <Globe className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <a
                          href={
                            business.web.startsWith("http")
                              ? business.web
                              : `https://${business.web}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline text-blue-700 truncate"
                        >
                          {business.web}
                        </a>
                      </div>
                    )}

                    <div className="space-y-2 pt-2">
                      {business.whatsapp && (
                        <a
                          href={`https://wa.me/${business.whatsapp.replace(
                            /\D/g,
                            ""
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <WhatsAppIcon />{" "}
                          <span className="ml-2">WhatsApp</span>
                        </a>
                      )}
                      {business.facebook && (
                        <a
                          href={
                            business.facebook.startsWith("http")
                              ? business.facebook
                              : `https://${business.facebook}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Facebook className="h-5 w-5" />{" "}
                          <span className="ml-2">Facebook</span>
                        </a>
                      )}
                      {business.instagram && (
                        <a
                          href={
                            business.instagram.startsWith("http")
                              ? business.instagram
                              : `https://${business.instagram}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                        >
                          <Instagram className="h-5 w-5" />{" "}
                          <span className="ml-2">Instagram</span>
                        </a>
                      )}
                    </div>
                    <Button
                      onClick={handleContact}
                      className="w-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700"
                    >
                      Contactar Negocio
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {business.mapa_embed_url && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Ubicación</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <iframe
                        src={business.mapa_embed_url}
                        width="100%"
                        height="250"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-lg"
                        title={`Mapa de ${business.nombre}`}
                      ></iframe>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BusinessDetailPage;
