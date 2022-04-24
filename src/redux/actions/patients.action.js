import { createPatientApi, deletePatientApi, getPatientApi, getPatientsApi, updatePatientApi } from "../../api";
import parseError from "../../utils/parseError";
import { CREATE_PATIENT, DELETE_PATIENT, GET_PATIENT, GET_PATIENTS, UPDATE_PATIENT } from "../types/patients.types";

export const createPatientAction = (user) => async (dispatch) => {
    dispatch({ type: CREATE_PATIENT.REQUEST });
    try {
        const { data } = await createPatientApi(user);
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
        const { data } = await getPatientApi(id);
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
        const { data } = await getPatientsApi();
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
        const { data } = await updatePatientApi(details, id);
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
        await deletePatientApi(id);
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
