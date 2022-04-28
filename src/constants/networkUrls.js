// const API_BASE = "http://localhost:9003/api/";
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

// Doctors
export const getDoctorsUrl = `${API_BASE}doctors`;
export const createDoctorUrl = `${API_BASE}doctors`;
export const getDoctorUrl = (id) => `${API_BASE}doctors/${id}`;
export const updateDoctorUrl = (id) => `${API_BASE}doctors/${id}`;
export const deleteDoctorUrl = (id) => `${API_BASE}doctors/${id}`;

// Departments
export const getDepartmentsUrl = `${API_BASE}departments`;
export const createDepartmentUrl = `${API_BASE}departments`;
export const deleteDepartmentUrl = (id) => `${API_BASE}departments/${id}`;

// Diagnosis
export const getDiagnosisUrl = `${API_BASE}diagnosis`;
export const createDiagnosisUrl = `${API_BASE}diagnosis`;
export const deleteDiagnosisUrl = (id) => `${API_BASE}diagnosis/${id}`;

// Patients
export const getPatientsUrl = `${API_BASE}patients`;
export const createPatientUrl = `${API_BASE}patients`;
export const getPatientUrl = (id) => `${API_BASE}patients/${id}`;
export const updatePatientUrl = (id) => `${API_BASE}patients/${id}`;
export const deletePatientUrl = (id) => `${API_BASE}patients/${id}`;
export const getContactTypesUrl = `${API_BASE}patients/contact-type`;
export const deleteContactTypeUrl = (id) => `${API_BASE}patients/contact-type/${id}`;
