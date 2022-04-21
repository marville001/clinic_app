import {
    createSecretaryUrl,
    deleteSecretaryUrl,
    getSecretariesUrl,
    getSecretaryUrl,
    updateSecretaryUrl,
} from "../constants";
import http from "../utils/https";

const { post, get, put, _delete } = http;

export const createSecretaryApi = async (data) => {
    return await post(createSecretaryUrl, data);
};

export const getSecretariesApi = async () => {
    return await get(getSecretariesUrl);
};

export const getSecretaryApi = async (id) => {
    return await get(getSecretaryUrl(id));
};

export const updateSecretaryApi = async (data, id) => {
    return await put(updateSecretaryUrl(id), data);
};

export const deleteSecretaryApi = async (id) => {
    return await _delete(deleteSecretaryUrl(id));
};
