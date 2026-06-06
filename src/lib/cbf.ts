const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_CBF_API_URL as string;
  if (envUrl && envUrl.trim() !== "" && envUrl.trim() !== "undefined") {
    return envUrl.trim();
  }
  
  if (typeof window !== "undefined") {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      return "http://localhost:3000/api/cbf";
    }
  }
  return "https://homepty-cbf-tite-testing-chi.vercel.app/api/cbf"; // fallback producción
};

const BASE_URL = getBaseUrl();
const API_KEY = (import.meta.env.VITE_CBF_API_KEY as string) || "cbf_live_YOUR_KEY_HERE";

export interface CBFImage {
  image_url: string;
}

export interface CBFProperty {
  id: string;
  nombre: string;
  descripcion?: string;
  tipo?: string;
  precio: number;
  area?: number;
  habitaciones?: number;
  banios?: number;
  estacionamientos?: number;
  direccion?: string;
  colonia?: string;
  id_tipo_accion?: number;
  latitud?: number;
  longitud?: number;
  imagenes_propiedades?: CBFImage[];
}

export interface CBFUser {
  id: string;
  nombre_usuario: string;
  email_usuario: string;
  telefono_usuario?: string;
  imagen_perfil_usuario?: string;
}

export interface CBFSite {
  id: string;
  site_name: string;
  subdomain?: string;
  theme_config?: { logo?: string; primaryColor?: string };
  platform_config?: { mapbox_token?: string | null };
}

const headers = () => ({
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
});

export async function fetchSiteUser(): Promise<{ user: CBFUser; site: CBFSite }> {
  const res = await fetch(`${BASE_URL}/user`, { headers: headers() });
  if (!res.ok) throw new Error("Error al cargar datos del sitio");
  const json = await res.json();
  return json.data;
}

export const DEMO_EXCLUSIVE_PROPERTY: CBFProperty = {
  id: "Asesor Demo-exclusive-1",
  nombre: "Residencia Las Alamedas",
  descripcion: "Exclusiva residencia contemporánea con excelentes acabados de mármol y piedra natural, amplios ventanales que brindan una iluminación inigualable, cochera techada para dos autos y un balcón frontal con vistas arboladas. Ubicada en zona de alta plusvalía con seguridad privada las 24 horas en Saltillo, Coah.",
  tipo: "casa",
  precio: 4890000,
  area: 310,
  habitaciones: 3,
  banios: 3.5,
  estacionamientos: 2,
  direccion: "Las Alamedas, Zona Norte",
  colonia: "Saltillo",
  id_tipo_accion: 1, // Venta
  latitud: 25.4383,
  longitud: -100.9737,
  imagenes_propiedades: [
    { image_url: "/Asesor Demo-prop.png" }
  ]
};

export async function fetchProperties(params?: {
  limit?: number;
  offset?: number;
  tipo?: string;
  id_tipo_accion?: number;
}): Promise<{ data: CBFProperty[]; pagination: { limit: number; offset: number; total: number } }> {
  const query = new URLSearchParams();
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.offset) query.set("offset", String(params.offset));
  if (params?.tipo) query.set("tipo", params.tipo);
  if (params?.id_tipo_accion !== undefined)
    query.set("id_tipo_accion", String(params.id_tipo_accion));

  try {
    const res = await fetch(`${BASE_URL}/properties?${query}`, { headers: headers() });
    if (!res.ok) throw new Error("Error al cargar propiedades");
    const json = await res.json();
    
    // Prepend Asesor Demo's custom premium property to the list
    const originalData = json.data || [];
    const filteredOriginal = originalData.filter((p: CBFProperty) => p.id !== "Asesor Demo-exclusive-1");
    
    return {
      data: [DEMO_EXCLUSIVE_PROPERTY, ...filteredOriginal],
      pagination: json.pagination || { limit: 10, offset: 0, total: 1 }
    };
  } catch (err) {
    // If offline or API fails, return our premium property as fallback
    return {
      data: [DEMO_EXCLUSIVE_PROPERTY],
      pagination: { limit: 10, offset: 0, total: 1 }
    };
  }
}

export async function fetchProperty(id: string): Promise<CBFProperty> {
  if (id === "Asesor Demo-exclusive-1") {
    return DEMO_EXCLUSIVE_PROPERTY;
  }
  
  const res = await fetch(`${BASE_URL}/properties/${id}`, { headers: headers() });
  if (!res.ok) throw new Error("Propiedad no encontrada");
  const json = await res.json();
  return json.data ?? json;
}

export function formatPrice(precio: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(precio);
}

export interface LeadSubmission {
  nombre_completo: string;
  email: string;
  telefono: string;
  tipo_operacion: "compra" | "renta";
  tipo_propiedad: string;
  num_habitaciones?: string;
  num_banos?: string;
  num_estacionamientos?: string;
  metros_cuadrados_min?: string;
  metros_cuadrados_max?: string;
  estados_deseados: string[];
  ciudades_deseadas?: string[];
  zonas_especificas?: string;
  estilo_vida_descripcion: string;
  presupuesto_min: string;
  presupuesto_max: string;
  metodo_pago: string[];
  tiene_precalificacion_crediticia?: boolean;
  institucion_crediticia?: string;
  uso_destino: "vivienda_propia" | "inversion" | "negocio" | "vacacional" | "otro";
  detalles_uso?: string;
  documentos_disponibles?: string[];
  documentos_urls?: Record<string, string>;
}

export async function submitLead(lead: LeadSubmission): Promise<{ success: boolean; data: any }> {
  const res = await fetch(`${BASE_URL}/leads`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(lead),
  });
  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.error || "Error al enviar la solicitud de búsqueda inteligente");
  }
  return res.json();
}
