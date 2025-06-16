import { supabase } from "./supabaseClient";

const validarId = (id) => {
  if (!Number.isInteger(id)) {
    console.error("ID inválido:", id);
    throw new Error("El ID debe ser un número entero.");
  }
};

export const aprobarNegocio = async (id) => {
  validarId(id);
  const { error } = await supabase
    .from("negocios")
    .update({ is_approved: true })
    .eq("id", id);
  if (error) {
    console.error("Error al aprobar negocio:", error);
    throw error;
  }
};

export const rechazarNegocio = async (id) => {
  validarId(id);
  const { error } = await supabase
    .from("negocios")
    .update({ is_approved: false })
    .eq("id", id);
  if (error) {
    console.error("Error al rechazar negocio:", error);
    throw error;
  }
};

export const generarRutaNegocio = (slug) => {
  return `/negocio/${slug}`;
};

export const getFeaturedBusinesses = async () => {
  const { data, error } = await supabase
    .from("negocios")
    .select("*")
    .eq("is_featured", true);

  if (error) {
    console.error("Error al obtener negocios destacados:", error);
    return [];
  }

  return data;
};

export const searchBusinesses = async (searchTerm, planType, category) => {
  let query = supabase.from("negocios").select("*");

  if (searchTerm) query = query.ilike("nombre", `%${searchTerm}%`);
  if (planType) query = query.eq("plan_type", planType);
  if (category) query = query.eq("categoria", category);

  query = query.eq("is_approved", true);

  const { data, error } = await query;
  if (error) {
    console.error("Error al buscar negocios:", error);
    return [];
  }

  return data;
};

export const getDistinctCategories = async () => {
  const { data, error } = await supabase
    .from("negocios")
    .select("categoria", { distinct: true });

  if (error) {
    console.error("Error al obtener categorías distintas:", error);
    return [];
  }

  const uniqueCategories = Array.from(
    new Set(data.map((item) => item.categoria).filter(Boolean))
  );
  return uniqueCategories;
};

// Actualiza el estado de aprobación (true = aprobado, false = pendiente) del negocio por su ID
export const updateApprovalStatus = async (id, approved) => {
  validarId(id);
  const { error } = await supabase
    .from("negocios")
    .update({ is_approved: approved })
    .eq("id", id);
  console.log("✅ Actualizado ID:", id, "Nuevo estado:", approved);
  if (error) {
    console.error("Error al actualizar aprobación:", error);
    throw error;
  }
};

export const createBusiness = async (businessData) => {
  const { data, error } = await supabase
    .from("negocios")
    .insert([businessData]);

  if (error) {
    console.error("Error al crear negocio:", error);
    throw error;
  }

  return data;
};

export const createReview = async (reviewData) => {
  const { data, error } = await supabase.from("reviews").insert([reviewData]);

  if (error) {
    console.error("Error al crear reseña:", error);
    throw error;
  }

  return data;
};

export const getBusinessBySlug = async (slug) => {
  const { data, error } = await supabase
    .from("negocios")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error al obtener negocio por slug:", error);
    return null;
  }

  return data;
};

export const getReviewsByBusinessId = async (businessId) => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("business_id", businessId);

  if (error) {
    console.error("Error al obtener reseñas del negocio:", error);
    return [];
  }

  return data;
};

export const fetchBusinessesFromDb = async (planType) => {
  try {
    let query = supabase.from("negocios").select("*");

    if (planType && typeof planType === "string") {
      query = query.eq("plan_type", planType.toLowerCase());
    }

    query = query.eq("is_approved", true);

    const { data, error } = await query;

    if (error) {
      console.error("Error al obtener negocios:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Error inesperado en fetchBusinessesFromDb:", err);
    return [];
  }
};
