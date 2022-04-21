import {
    createDoctorUrl,
    deleteDoctorUrl,
    getDoctorsUrl,
    getDoctorUrl,
    updateDoctorUrl,
} from "../constants";
import http from "../utils/https";

const { post, get, put, _delete } = http;

export const createDoctorApi = async (data) => {
    return await post(createDoctorUrl, data);
};

export const getDocotorsApi = async () => {
    return await get(getDoctorsUrl);
};

export const getDoctorApi = async (id) => {
    return await get(getDoctorUrl(id));
};

export const updateDoctorApi = async (data, id) => {
    return await put(updateDoctorUrl(id), data);
};

export const deleteDoctorApi = async (id) => {
    return await _delete(deleteDoctorUrl(id));
};
