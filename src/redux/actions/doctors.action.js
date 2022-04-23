import {
    createDoctorApi,
    deleteDoctorApi,
    getDocotorsApi,
    getDoctorApi,
    updateDoctorApi,
} from "../../api";
import {
    CREATE_DOCTOR,
    DELETE_DOCTOR,
    GET_DOCTOR,
    GET_DOCTORS,
    UPDATE_DOCTOR,
} from "../types/doctors.types";

export const createDoctorAction = (user) => async (dispatch) => {
    dispatch({ type: CREATE_DOCTOR.REQUEST });
    try {
        const { data } = await createDoctorApi(user);
        dispatch({
            type: CREATE_DOCTOR.SUCCESS,
            payload: data.doctor,
        });
        return { success: true };
    } catch (error) {
        const err =
            error?.response?.data?.message ||
            "An error occurred. Please try again";
        dispatch({
            type: CREATE_DOCTOR.FAIL,
            payload: err,
        });
        return {
            success: false,
            message: err,
        };
    }
};

export const getDoctorAction = (id) => async (dispatch) => {
    dispatch({ type: GET_DOCTOR.REQUEST });
    try {
        const { data } = await getDoctorApi(id);
        dispatch({
            type: GET_DOCTOR.SUCCESS,
            payload: data.doctor,
        });
    } catch (error) {
        dispatch({
            type: GET_DOCTOR.FAIL,
            payload:
                error?.response?.data?.message ||
                "An error occurred. Please try again",
        });
    }
};

export const getDoctorsAction = () => async (dispatch) => {
    dispatch({ type: GET_DOCTORS.REQUEST });
    try {
        const { data } = await getDocotorsApi();
        dispatch({
            type: GET_DOCTORS.SUCCESS,
            payload: data.doctors,
        });
    } catch (error) {
        dispatch({
            type: GET_DOCTORS.FAIL,
            payload:
                error?.response?.data?.message ||
                "An error occurred. Please try again",
        });
    }
};

export const updateDoctorAction = (details, id) => async (dispatch) => {
    dispatch({ type: UPDATE_DOCTOR.REQUEST });
    try {
        const { data } = await updateDoctorApi(details, id);
        dispatch({
            type: UPDATE_DOCTOR.SUCCESS,
            payload: data.doctor,
        });
        return { success: true };
    } catch (error) {
        const err =
            error?.response?.data?.message ||
            "An error occurred. Please try again";
        dispatch({
            type: UPDATE_DOCTOR.FAIL,
            payload: err,
        });
        return {
            success: false,
            message: err,
        };
    }
};

export const deleteDoctorAction = (id) => async (dispatch) => {
    dispatch({ type: DELETE_DOCTOR.REQUEST });
    try {
        await deleteDoctorApi(id);
        dispatch({
            type: DELETE_DOCTOR.SUCCESS,
        });
        return { success: true };
    } catch (error) {
        const err =
            error?.response?.data?.message ||
            "An error occurred. Please try again";
        dispatch({
            type: DELETE_DOCTOR.FAIL,
            payload: err,
        });
        return {
            success: false,
            message: err,
        };
    }
};
