import { deleteApi, getApi, postApi, putApi } from "../../api";
import {
    createDoctorUrl,
    deleteDoctorUrl,
    getDoctorsUrl,
    getDoctorUrl,
    makeDoctorAdminUrl,
    revokeDoctorAdminUrl,
    updateDoctorUrl,
} from "../../constants";
import { getDoctorAssignedPatientUrl } from "../../constants/networkUrls";
import parseError from "../../utils/parseError";
import {
    CREATE_DOCTOR,
    DELETE_DOCTOR,
    GET_ASSIGNED_PATIENTS,
    GET_DOCTOR,
    GET_DOCTORS,
    UPDATE_DOCTOR,
    UPDATE_DOCTOR_ADMIN_STATUS,
} from "../types/doctors.types";

export const createDoctorAction = (user) => async (dispatch) => {
    dispatch({ type: CREATE_DOCTOR.REQUEST });
    try {
        const { data } = await postApi(createDoctorUrl, user);
        dispatch({
            type: CREATE_DOCTOR.SUCCESS,
            payload: data.doctor,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: CREATE_DOCTOR.FAIL,
            payload: parseError(error),
        });
        return {
            success: false,
            message: parseError(error),
        };
    }
};

export const getDoctorAction = (id) => async (dispatch) => {
    dispatch({ type: GET_DOCTOR.REQUEST });
    try {
        const { data } = await getApi(getDoctorUrl(id));
        dispatch({
            type: GET_DOCTOR.SUCCESS,
            payload: data.doctor,
        });
    } catch (error) {
        dispatch({
            type: GET_DOCTOR.FAIL,
            payload: parseError(error),
        });
    }
};

export const getDoctorsAction = (params) => async (dispatch) => {
    dispatch({ type: GET_DOCTORS.REQUEST });
    try {
        const { data } = await getApi(
            getDoctorsUrl({ search: params?.search ?? "" })
        );
        dispatch({
            type: GET_DOCTORS.SUCCESS,
            payload: data.doctors,
        });
    } catch (error) {
        dispatch({
            type: GET_DOCTORS.FAIL,
            payload: parseError(error),
        });
    }
};

export const updateDoctorAction = (details, id) => async (dispatch) => {
    dispatch({ type: UPDATE_DOCTOR.REQUEST });
    try {
        const { data } = await putApi(updateDoctorUrl(id), details);
        dispatch({
            type: UPDATE_DOCTOR.SUCCESS,
            payload: data.doctor,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: UPDATE_DOCTOR.FAIL,
            payload: parseError(error),
        });
        return {
            success: false,
            message: parseError(error),
        };
    }
};

export const deleteDoctorAction = (id) => async (dispatch) => {
    dispatch({ type: DELETE_DOCTOR.REQUEST });
    try {
        await deleteApi(deleteDoctorUrl(id));
        dispatch({
            type: DELETE_DOCTOR.SUCCESS,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: DELETE_DOCTOR.FAIL,
            payload: parseError(error),
        });
        return {
            success: false,
            message: parseError(error),
        };
    }
};

export const updateDoctorAdminStatusAction = (isAdminAction, id) => async (dispatch) => {
    dispatch({ type: UPDATE_DOCTOR_ADMIN_STATUS.REQUEST });
    try {
        const url = !isAdminAction ? revokeDoctorAdminUrl(id) : makeDoctorAdminUrl(id)
        await putApi(url);
        dispatch({
            type: UPDATE_DOCTOR_ADMIN_STATUS.SUCCESS,
            payload: isAdminAction,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: UPDATE_DOCTOR_ADMIN_STATUS.FAIL,
            payload: parseError(error),
        });
        return {
            success: false,
            message: parseError(error),
        };
    }
};

export const getDoctorAssignedPatientsAction = ( id) => async (dispatch) => {
    dispatch({ type: GET_ASSIGNED_PATIENTS.REQUEST });
    try {
        const { data } = await getApi(getDoctorAssignedPatientUrl(id));
        dispatch({
            type: GET_ASSIGNED_PATIENTS.SUCCESS,
            payload: data.patients,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: GET_ASSIGNED_PATIENTS.FAIL,
            payload: parseError(error),
        });
        return {
            success: false,
            message: parseError(error),
        };
    }
};