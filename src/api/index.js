
import http from "../utils/https";
const { post, get, put, _delete } = http;

export { loginUserApi, getUserProfileApi } from "./auth";

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


export const getApi =async (url, query = {}) => {
    return await get(url, query);
}

export const postApi = async (url, data={}) => {
    return await post(url, data);
};

export const deleteApi = async (url) => {
    return await _delete(url);
};

export const putApi = async (url, data={}) => {
    return await put(url, data);
};