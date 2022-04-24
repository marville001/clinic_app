export { loginUserApi, getUserProfileApi } from "./auth";
export {
    getSecretariesApi,
    getSecretaryApi,
    createSecretaryApi,
    deleteSecretaryApi,
    updateSecretaryApi,
} from "./secretaries";

export {
    getAdminApi,
    getAdminsApi,
    createAdminApi,
    deleteAdminApi,
    updateAdminApi,
} from "./admins";

export {
    getDocotorsApi,
    getDoctorApi,
    createDoctorApi,
    updateDoctorApi,
    deleteDoctorApi,
} from "./doctors";

export {
    createDepartmentApi,
    getDepartmentsApi,
    deleteDepartmentApi,
} from "./departments";

export {
    getDiagnosisApi,
    createDiagnosisApi,
    deleteDiagnosisApi,
} from "./diagnosis";

export {
    getPatientApi,
    createPatientApi,
    getPatientsApi,
    updatePatientApi,
    deletePatientApi
} from "./patients";
