import {
    createDepartmentUrl,
    deleteDepartmentUrl,
    getDepartmentsUrl,
} from "../constants";
import http from "../utils/https";

const { post, get, _delete } = http;

export const createDepartmentApi = async (data) => {
    return await post(createDepartmentUrl, data);
};

export const getDepartmentsApi = async () => {
    return await get(getDepartmentsUrl);
};

export const deleteDepartmentApi = async (id) => {
    return await _delete(deleteDepartmentUrl(id));
};
