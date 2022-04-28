export { departments, gender } from "./select-options";

// export const STATIC_FILE_BASE = "http://localhost:9003/static/";
export const STATIC_FILE_BASE = "https://my-clinic-api.herokuapp.com/static/";
export {
    // Auth
    loginUrl,
    getProfileUrl,

    // Secretaries
    getSecretariesUrl,
    getSecretaryUrl,
    createSecretaryUrl,
    updateSecretaryUrl,
    deleteSecretaryUrl,

    // Admins
    getAdminUrl,
    getAdminsUrl,
    createAdminUrl,
    updateAdminUrl,
    deleteAdminUrl,

    // Doctors
    getDoctorUrl,
    getDoctorsUrl,
    createDoctorUrl,
    deleteDoctorUrl,
    updateDoctorUrl,

    // Department
    getDepartmentsUrl,
    createDepartmentUrl,
    deleteDepartmentUrl,

    // Diagnosis
    getDiagnosisUrl,
    createDiagnosisUrl,
    deleteDiagnosisUrl,

    // Patients
    getPatientUrl,
    getPatientsUrl,
    createPatientUrl,
    updatePatientUrl,
    deletePatientUrl,
    createContactTypesUrl,
    deleteContactTypeUrl,
    getContactTypesUrl,
    createContactUrl,
    addPatientFileUrl
} from "./networkUrls";
