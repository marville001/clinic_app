import { createPatientUrl, deletePatientUrl, getPatientsUrl, getPatientUrl, updatePatientUrl } from "../constants";
import http from "../utils/https";

const { post, get, put, _delete } = http;

export const createPatientApi = async (data) => {
    return await post(createPatientUrl, data);
};

export const getPatientsApi = async () => {
    return await get(getPatientsUrl);
};

export const getPatientApi = async (id) => {
    return await get(getPatientUrl(id));
};

export const updatePatientApi = async (data, id) => {
    return await put(updatePatientUrl(id), data);
};

export const deletePatientApi = async (id) => {
    return await _delete(deletePatientUrl(id));
};
