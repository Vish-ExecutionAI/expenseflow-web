const API_URL = import.meta.env.VITE_API_URL || "/api";
export const api = { async list(resource) { const response = await fetch(`${API_URL}/${resource}`); if (!response.ok) throw new Error("API request failed"); return response.json(); } };
