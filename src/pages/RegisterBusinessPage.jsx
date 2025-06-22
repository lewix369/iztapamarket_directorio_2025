import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { createBusiness, getDistinctCategories } from "@/lib/database";
import { supabase } from "@/lib/supabaseClient";
import {
  Building,
  Tag,
  PhoneOff as PhoneIcon,
  MapPin as MapPinIcon,
  FileImage as ImageIcon,
  Link as LinkIcon,
} from "lucide-react";

const RegisterBusinessPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const selectedPlan = searchParams.get("plan") || "Plan Gratuito";

  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    telefono: "",
    direccion: "",
    imagen_url: "",
    imagen_filename: "",
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      const distinctCategories = await getDistinctCategories();
      setCategories(distinctCategories.filter((cat) => cat && cat !== "all"));
      setIsLoading(false);
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({ ...prev, categoria: value }));
  };

  const handleFileUpload = async (event, field) => {
    const file = event.target.files[0];
    if (!file) return;

    const filePath = `${field}/${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
      .from("negocios")
      .upload(filePath, file);

    if (error) {
      toast({
        title: "❌ Error",
        description: "No se pudo subir la imagen. Intenta de nuevo.",
        variant: "destructive",
      });
      return;
    }

    const url = supabase.storage
      .from("negocios")
      .getPublicUrl(filePath).publicUrl;

    setFormData((prev) => ({ ...prev, [field]: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.nombre || !formData.categoria) {
      toast({
        title: "❌ Campos requeridos",
        description: "Por favor, completa el nombre y la categoría.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const businessData = {
      ...formData,
      plan_type:
        selectedPlan === "Plan Premium"
          ? "premium"
          : selectedPlan === "Plan Intermedio"
          ? "intermediate"
          : "free",
      is_approved: false,
    };

    try {
      const newBusiness = await createBusiness(businessData);
      if (newBusiness) {
        toast({
          title: "¡Registro Exitoso!",
          description:
            "Tu negocio ha sido enviado para aprobación. Gracias por unirte a IztapaMarket.",
        });
        navigate("/negocios");
      } else {
        toast({
          title: "❌ Error en el registro",
          description:
            "No pudimos registrar tu negocio. Por favor, intenta de nuevo.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating business from registration form:", error);
      toast({
        title: "❌ Error en el servidor",
        description: "Ocurrió un error inesperado. Intenta más tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Registrar Negocio – {selectedPlan}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto space-y-6 bg-white p-6 shadow rounded-lg"
        >
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Nombre del negocio
            </label>
            <Input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej. Taquería El Güero"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Categoría
            </label>
            <Select onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat, index) => (
                  <SelectItem key={index} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <Input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Ej. 5551234567"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Dirección
            </label>
            <Textarea
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              placeholder="Calle, número, colonia..."
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Imagen del negocio
            </label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-md">
                Subir Imagen
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleFileUpload(e, "imagen_url");
                    setFormData((prev) => ({
                      ...prev,
                      imagen_filename: e.target.files[0]?.name || "",
                    }));
                  }}
                  className="hidden"
                />
              </label>
              {formData.imagen_filename && (
                <span className="text-sm text-gray-700">
                  {formData.imagen_filename}
                </span>
              )}
            </div>
            {formData.imagen_url && (
              <img
                src={formData.imagen_url}
                alt="Vista previa"
                className="mt-2 h-32 object-contain border rounded-md"
              />
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg"
          >
            {isSubmitting ? "Registrando..." : "Registrar Negocio"}
          </Button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default RegisterBusinessPage;
