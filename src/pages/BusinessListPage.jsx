import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Star, MapPin, Clock, Grid, List, FilterX } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessCard from "@/components/BusinessCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  searchBusinesses as fetchBusinessesFromDb,
  getDistinctCategories,
} from "@/lib/database";

function useQueryString() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const BusinessListPage = () => {
  const navigate = useNavigate();
  const locationQuery = useQueryString();
  const reactRouterLocation = useLocation();

  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [searchTerm, setSearchTerm] = useState(locationQuery.get("q") || "");
  const [selectedPlan, setSelectedPlan] = useState(
    locationQuery.get("plan") || "all"
  );
  const [selectedCategory, setSelectedCategory] = useState(
    locationQuery.get("category") || "all"
  );

  const [viewMode, setViewMode] = useState("grid");

  const planOptions = useMemo(
    () => [
      { value: "all", label: "Todos los planes" },
      { value: "premium", label: "Premium" },
      { value: "pro", label: "Profesional" },
      { value: "free", label: "Gratis" },
    ],
    []
  );

  const loadInitialData = useCallback(async () => {
    setIsLoading(true);
    const termToFetch =
      searchTerm.trim() === "" ? undefined : searchTerm.trim();
    const planValueToFetch =
      selectedPlan === "all" ? undefined : selectedPlan.toLowerCase();
    const categoryValueToFetch =
      selectedCategory === "all" ? undefined : selectedCategory;

    const [businessData, categoriesData] = await Promise.all([
      fetchBusinessesFromDb(
        termToFetch,
        planValueToFetch,
        categoryValueToFetch
      ),
      getDistinctCategories(),
    ]);
    setBusinesses(businessData);

    const uniqueCategories = [
      ...new Set(["all", ...categoriesData.map((cat) => cat || "all")]),
    ];
    setCategories(uniqueCategories);

    setIsLoading(false);
  }, [searchTerm, selectedPlan, selectedCategory]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("q", searchTerm.trim());
    if (selectedPlan && selectedPlan !== "all")
      params.set("plan", selectedPlan);
    if (selectedCategory && selectedCategory !== "all")
      params.set("category", selectedCategory);

    const queryString = params.toString();

    if (queryString) {
      if (
        `/negocios?${queryString}` !==
        `${reactRouterLocation.pathname}${reactRouterLocation.search}`
      ) {
        navigate(`/negocios?${queryString}`, { replace: true });
      }
    } else {
      if (
        `/negocios` !==
        `${reactRouterLocation.pathname}${reactRouterLocation.search}`
      ) {
        navigate("/negocios", { replace: true });
      }
    }
  }, [
    searchTerm,
    selectedPlan,
    selectedCategory,
    navigate,
    reactRouterLocation,
  ]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadInitialData();
  };

  const handlePlanChange = (value) => {
    setSelectedPlan(value || "all");
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value || "all");
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedPlan("all");
    setSelectedCategory("all");
  };

  return (
    <div className="min-h-screen">
      <Header />

      <section className="bg-gradient-to-r from-blue-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold">
              Directorio de Negocios
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Explora todos los negocios registrados en IztapaMarket
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="space-y-4">
            <form
              onSubmit={handleSearchSubmit}
              className="flex flex-col md:flex-row gap-4 items-center"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar por nombre, descripción o categoría..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-black"
                />
              </div>
              <Button
                type="submit"
                className="h-12 px-6 bg-blue-600 hover:bg-blue-700 hidden md:inline-flex"
              >
                Buscar
              </Button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label
                  htmlFor="category-filter"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Categoría
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={handleCategoryChange}
                  id="category-filter"
                >
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "Todas las categorías" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="plan-filter"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Plan
                </label>
                <Select
                  value={selectedPlan}
                  onValueChange={handlePlanChange}
                  id="plan-filter"
                >
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder="Plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {planOptions.map((plan) => (
                      <SelectItem key={plan.value} value={plan.value}>
                        {plan.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-1 flex items-end">
                <Button
                  onClick={handleClearFilters}
                  variant="outline"
                  className="h-10 w-full"
                >
                  <FilterX className="h-4 w-4 mr-2" />
                  Limpiar Filtros
                </Button>
              </div>
              <div className="flex items-center justify-end gap-2 col-span-1 md:col-span-2 lg:col-span-1">
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  {businesses.length} resultados
                </span>
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4 animate-spin">⚙️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Cargando negocios...
              </h3>
            </motion.div>
          ) : businesses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No se encontraron resultados
              </h3>
              <p className="text-gray-600 mb-6">
                Intenta ajustar tus filtros o términos de búsqueda
              </p>
              <Button onClick={handleClearFilters} variant="outline">
                Limpiar filtros
              </Button>
            </motion.div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-6"
              }
            >
              {businesses.map((business, index) => (
                <motion.div
                  key={business.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <BusinessCard
                    business={{
                      ...business,
                      horario: business.horario ?? business.hours, // Asegura que 'horario' esté presente
                    }}
                    viewMode={viewMode}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BusinessListPage;
