import {
    deleteApi,
    getApi,
    postApi,
    putApi,
} from "../../api";
import {
    createPatientUrl,
    deletePatientUrl,
    getPatientsUrl,
    getPatientUrl,
    updatePatientUrl,
} from "../../constants";
import { getContactTypesUrl } from "../../constants/networkUrls";
import parseError from "../../utils/parseError";
import {
    CREATE_PATIENT,
    DELETE_PATIENT,
    GET_CONTACT_TYPE,
    GET_PATIENT,
    GET_PATIENTS,
    UPDATE_PATIENT,
} from "../types/patients.types";

export const createPatientAction = (user) => async (dispatch) => {
    dispatch({ type: CREATE_PATIENT.REQUEST });
    try {
        const { data } = await postApi(createPatientUrl, user);
        dispatch({
            type: CREATE_PATIENT.SUCCESS,
            payload: data.patient,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: CREATE_PATIENT.FAIL,
            payload: parseError(error),
        });
        return {
            success: false,
            message: parseError(error),
        };
    }
};

export const getPatientAction = (id) => async (dispatch) => {
    dispatch({ type: GET_PATIENT.REQUEST });
    try {
        const { data } = await getApi(getPatientUrl(id));
        dispatch({
            type: GET_PATIENT.SUCCESS,
            payload: data.patient,
        });
    } catch (error) {
        dispatch({
            type: GET_PATIENT.FAIL,
            payload: parseError(error),
        });
    }
};

export const getPatientsAction = () => async (dispatch) => {
    dispatch({ type: GET_PATIENTS.REQUEST });
    try {
        const { data } = await getApi(getPatientsUrl);
        dispatch({
            type: GET_PATIENTS.SUCCESS,
            payload: data.patients,
        });
    } catch (error) {
        dispatch({
            type: GET_PATIENTS.FAIL,
            payload: parseError(error),
        });
    }
};

export const updatePatientAction = (details, id) => async (dispatch) => {
    dispatch({ type: UPDATE_PATIENT.REQUEST });
    try {
        const { data } = await putApi(updatePatientUrl(id), details);
        dispatch({
            type: UPDATE_PATIENT.SUCCESS,
            payload: data.patient,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: UPDATE_PATIENT.FAIL,
            payload: parseError(error),
        });
        return {
            success: false,
            message: parseError(error),
        };
    }
};

export const deletePatientAction = (id) => async (dispatch) => {
    dispatch({ type: DELETE_PATIENT.REQUEST });
    try {
        await deleteApi(deletePatientUrl(id));
        dispatch({
            type: DELETE_PATIENT.SUCCESS,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: DELETE_PATIENT.FAIL,
            payload: parseError(error),
        });
        return {
            success: false,
            message: parseError(error),
        };
    }
};

export const getContactTypesAction = () => async (dispatch) => {
    dispatch({ type: GET_CONTACT_TYPE.REQUEST });
    try {
        const { data } = await getApi(getContactTypesUrl);
        dispatch({
            type: GET_CONTACT_TYPE.SUCCESS,
            payload: data.contactType,
        });
    } catch (error) {
        dispatch({
            type: GET_CONTACT_TYPE.FAIL,
            payload: parseError(error),
        });
    }
};