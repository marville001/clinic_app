// const API_BASE = "http://localhost:9003/api/"
const API_BASE = "https://my-clinic-api.herokuapp.com/api/";

// Auth
export const loginUrl = `${API_BASE}auth/login`;
export const getProfileUrl = `${API_BASE}auth/me`;

// Secretaries
export const getSecretariesUrl = `${API_BASE}secretaries`;
export const createSecretaryUrl = `${API_BASE}secretaries`;
export const getSecretaryUrl = (id) => `${API_BASE}secretaries/${id}`;
export const updateSecretaryUrl = (id) => `${API_BASE}secretaries/${id}`;
export const deleteSecretaryUrl = (id) => `${API_BASE}secretaries/${id}`;

// Admins
export const getAdminsUrl = `${API_BASE}admins`;
export const createAdminUrl = `${API_BASE}admins`;
export const getAdminUrl = (id) => `${API_BASE}admins/${id}`;
export const updateAdminUrl = (id) => `${API_BASE}admins/${id}`;
export const deleteAdminUrl = (id) => `${API_BASE}admins/${id}`;
