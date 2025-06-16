import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star } from "lucide-react";

const BusinessCard = ({ business, viewMode = "grid" }) => {
  if (!business) return null;

  const imageUrl =
    business.imagen_url ||
    "https://images.unsplash.com/photo-1613243555978-636c48dc653c";

  const planVariant =
    business.plan_type === "premium"
      ? "orange"
      : business.plan_type === "pro"
      ? "blue"
      : "secondary";

  return viewMode === "grid" ? (
    <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
      <div className="relative">
        <img
          alt={`${business.nombre} - ${business.descripcion}`}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          src={imageUrl}
        />
        <div className="absolute top-4 left-4">
          <Badge variant={planVariant} className="shadow-lg">
            {business.plan_type}
          </Badge>
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <span className="text-sm font-semibold">{business.rating || 0}</span>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
          {business.nombre}
        </CardTitle>
        <CardDescription className="text-orange-600 font-medium">
          {business.categoria}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4 text-sm truncate">
          {business.descripcion}
        </p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <MapPin className="h-4 w-4" />
            <span>{business.direccion || "N/A"}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{business.horario || "N/A"}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {business.reviews_count || 0} reseñas
          </div>
          <Link to={`/negocio/${business.slug}`}>
            <Button
              variant="outline"
              size="sm"
              className="group-hover:bg-blue-600 group-hover:text-white transition-colors"
            >
              Ver Detalles
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  ) : null;
};

export default BusinessCard;
