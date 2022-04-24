import {
    createDiagnosisUrl,
    getDiagnosisUrl,
    deleteDiagnosisUrl
} from "../constants";
import http from "../utils/https";

const { post, get, _delete } = http;

export const createDiagnosisApi = async (data) => {
    return await post(createDiagnosisUrl, data);
};

export const getDiagnosisApi = async () => {
    return await get(getDiagnosisUrl);
};

export const deleteDiagnosisApi = async (id) => {
    return await _delete(deleteDiagnosisUrl(id));
};
