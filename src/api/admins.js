import {
    createAdminUrl,
    deleteAdminUrl,
    getAdminsUrl,
    getAdminUrl,
    updateAdminUrl,
} from "../constants";
import http from "../utils/https";

const { post, get, put, _delete } = http;

export const createAdminApi = async (data) => {
    return await post(createAdminUrl, data);
};

export const getAdminsApi = async () => {
    return await get(getAdminsUrl);
};

export const getAdminApi = async (id) => {
    return await get(getAdminUrl(id));
};

export const updateAdminApi = async (data, id) => {
    return await put(updateAdminUrl(id), data);
};

export const deleteAdminApi = async (id) => {
    return await _delete(deleteAdminUrl(id));
};
