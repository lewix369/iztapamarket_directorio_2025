import React, { useEffect, useState } from "react";
import { useSupabase } from "@/contexts/SupabaseContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash, Eye } from "lucide-react";
import { updateApprovalStatus } from "@/lib/database";

const AdminPage = () => {
  const { supabase } = useSupabase();
  const [businesses, setBusinesses] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchBusinesses = async () => {
    const { data, error } = await supabase
      .from("negocios")
      .select("id, nombre, categoria, is_approved, slug, is_deleted")
      .or("is_deleted.is.false,is_deleted.is.null");
    if (!error) {
      console.log("✅ Negocios recargados");
      setBusinesses(data);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>
      <div className="space-y-4">
        {businesses.map((biz) => (
          <div
            key={biz.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {biz.nombre}
              </h2>
              <p className="text-sm text-gray-600">{biz.categoria}</p>
            </div>

            <div className="mt-4 sm:mt-0 flex flex-wrap items-center gap-3">
              <Link to={`/editar/${biz.slug}`}>
                <Button variant="outline" size="icon" title="Editar">
                  <Edit className="w-4 h-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="icon"
                title="Eliminar"
                onClick={async () => {
                  const confirmDelete = confirm(
                    `¿Estás seguro de eliminar el negocio "${biz.nombre}"?`
                  );
                  if (!confirmDelete) return;

                  try {
                    console.log("🗑 Eliminando ID:", biz.id);

                    const { error } = await supabase
                      .from("negocios")
                      .update({ is_deleted: true })
                      .eq("id", biz.id);

                    if (error) {
                      console.error("❌ Error al eliminar negocio:", error);
                      alert("Error al eliminar el negocio.");
                    } else {
                      console.log(`✅ Negocio eliminado con ID:`, biz.id);
                      // Filtra localmente el negocio eliminado sin volver a hacer fetch
                      setBusinesses((prev) =>
                        prev.filter((negocio) => negocio.id !== biz.id)
                      );
                      alert("❌ Negocio eliminado exitosamente");
                    }
                  } catch (err) {
                    console.error("❌ Error inesperado:", err);
                    alert("Ocurrió un error inesperado.");
                  }
                }}
              >
                <Trash className="w-4 h-4" />
              </Button>
              <Badge
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  biz.is_approved
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {biz.is_approved ? "Aprobado" : "Pendiente"}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  biz.is_approved
                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                }`}
                disabled={updatingId === biz.id}
                onClick={async () => {
                  try {
                    setUpdatingId(biz.id);
                    console.log("🔍 ID a actualizar:", biz.id);
                    await updateApprovalStatus(biz.id, !biz.is_approved);
                    console.log(
                      "✅ Estado actualizado, recargando negocios..."
                    );
                    await fetchBusinesses();
                  } catch (error) {
                    console.error(
                      "❌ Error al cambiar el estado de aprobación:",
                      error
                    );
                    alert(
                      "Ocurrió un error al actualizar el estado del negocio."
                    );
                  } finally {
                    setUpdatingId(null);
                  }
                }}
              >
                {updatingId === biz.id
                  ? "Actualizando..."
                  : biz.is_approved
                  ? "Rechazar"
                  : "Aprobar"}
              </Button>
              <Link to={`/negocio/${biz.slug}`}>
                <Button variant="link" size="sm" className="text-blue-600">
                  <Eye className="w-4 h-4 mr-1" /> Ver
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
