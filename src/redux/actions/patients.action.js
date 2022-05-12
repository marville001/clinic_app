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
    updatePatientUrl,createContactTypesUrl, deleteContactTypeUrl, getContactTypesUrl, getCommentTypesUrl, createContactUrl, addPatientFileUrl, assignPatientDoctorUrl
} from "../../constants";
import { unAssignPatientDoctorUrl } from "../../constants/networkUrls";
import parseError from "../../utils/parseError";
import {
    ADD_PATIENT_FILE,
    ASSIGN_PATIENT_DOCTOR,
    CREATE_CONTACT,
    CREATE_CONTACT_TYPE,
    CREATE_PATIENT,
    DELETE_CONTACT_TYPE,
    DELETE_PATIENT,
    GET_COMMENT_TYPE,
    GET_CONTACT_TYPE,
    GET_PATIENT,
    GET_PATIENTS,
    UN_ASSIGN_PATIENT_DOCTOR,
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

export const createContactAction = (contact, id) => async (dispatch) => {
    dispatch({ type: CREATE_CONTACT.REQUEST });
    try {
        const { data } = await postApi(createContactUrl(id), contact);
        dispatch({
            type: CREATE_CONTACT.SUCCESS,
            payload: data.contact,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: CREATE_CONTACT.FAIL,
            payload: parseError(error),
        });
        return {
            success: false,
            message: parseError(error),
        };
    }
};

export const addPatientFileAction = (file, id) => async (dispatch) => {
    dispatch({ type: ADD_PATIENT_FILE.REQUEST });
    try {
        const { data } = await postApi(addPatientFileUrl(id), file);
        dispatch({
            type: ADD_PATIENT_FILE.SUCCESS,
            payload: data.file,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: ADD_PATIENT_FILE.FAIL,
            payload: parseError(error),
        });
        return {
            success: false,
            message: parseError(error),
        };
    }
};

export const createContactTypeAction = (user) => async (dispatch) => {
    dispatch({ type: CREATE_CONTACT_TYPE.REQUEST });
    try {
        const { data } = await postApi(createContactTypesUrl, user);
        dispatch({
            type: CREATE_CONTACT_TYPE.SUCCESS,
            payload: data.contactType,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: CREATE_CONTACT_TYPE.FAIL,
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

export const deleteContactTypeAction = (id) => async (dispatch) => {
    dispatch({ type: DELETE_CONTACT_TYPE.REQUEST });
    try {
        await deleteApi(deleteContactTypeUrl(id));
        dispatch({
            type: DELETE_CONTACT_TYPE.SUCCESS,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: DELETE_CONTACT_TYPE.FAIL,
            payload: parseError(error),
        });
        return {
            success: false,
            message: parseError(error),
        };
    }
};

export const assignPatientDoctorAction = (pid, did) => async (dispatch) => {
    dispatch({ type: ASSIGN_PATIENT_DOCTOR.REQUEST });
    try {
        const { data } = await putApi(assignPatientDoctorUrl(pid, did));
        dispatch({
            type: ASSIGN_PATIENT_DOCTOR.SUCCESS,
            payload: data.doctor,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: ASSIGN_PATIENT_DOCTOR.FAIL,
            payload: parseError(error),
        });
        return {
            success: false,
            message: parseError(error),
        };
    }
};

export const unAssignPatientDoctorAction = (pid, did) => async (dispatch) => {
    dispatch({ type: UN_ASSIGN_PATIENT_DOCTOR.REQUEST });
    try {
        await putApi(unAssignPatientDoctorUrl(pid, did));
        dispatch({
            type: UN_ASSIGN_PATIENT_DOCTOR.SUCCESS,
            payload: did,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: UN_ASSIGN_PATIENT_DOCTOR.FAIL,
            payload: parseError(error),
        });
        return {
            success: false,
            message: parseError(error),
        };
    }
};

export const getCommentTypesAction = () => async (dispatch) => {
    dispatch({ type: GET_COMMENT_TYPE.REQUEST });
    try {
        const { data } = await getApi(getCommentTypesUrl);
        dispatch({
            type: GET_COMMENT_TYPE.SUCCESS,
            payload: data.commentType,
        });
    } catch (error) {
        dispatch({
            type: GET_COMMENT_TYPE.FAIL,
            payload: parseError(error),
        });
    }
};