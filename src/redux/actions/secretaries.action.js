import {
    createSecretaryApi,
    deleteSecretaryApi,
    getSecretariesApi,
    getSecretaryApi,
    updateSecretaryApi,
} from "../../api/secretaries";
import {
    CREATE_SECRETARY,
    DELETE_SECRETARY,
    GET_SECRETARIES,
    GET_SECRETARY,
    UPDATE_SECRETARY,
} from "../types/secretaries.types";

export const createSecretaryAction = (user) => async (dispatch) => {
    dispatch({ type: CREATE_SECRETARY.REQUEST });
    try {
        const { data } = await createSecretaryApi(user);
        dispatch({
            type: CREATE_SECRETARY.SUCCESS,
            payload: data.secretary,
        });
        return { success: true };
    } catch (error) {
        const err =
            error?.response?.data?.message ||
            "An error occurred. Please try again";
        dispatch({
            type: CREATE_SECRETARY.FAIL,
            payload: err,
        });
        return {
            success: false,
            message: err,
        };
    }
};

export const getSecretaryAction = (id) => async (dispatch) => {
    dispatch({ type: GET_SECRETARY.REQUEST });
    try {
        const { data } = await getSecretaryApi(id);
        dispatch({
            type: GET_SECRETARY.SUCCESS,
            payload: data.secretary,
        });
    } catch (error) {
        dispatch({
            type: GET_SECRETARY.FAIL,
            payload:
                error?.response?.data?.message ||
                "An error occurred. Please try again",
        });
    }
};

export const getSecretariesAction = () => async (dispatch) => {
    dispatch({ type: GET_SECRETARIES.REQUEST });
    try {
        const { data } = await getSecretariesApi();
        dispatch({
            type: GET_SECRETARIES.SUCCESS,
            payload: data.secretaries,
        });
    } catch (error) {
        dispatch({
            type: GET_SECRETARIES.FAIL,
            payload:
                error?.response?.data?.message ||
                "An error occurred. Please try again",
        });
    }
};

export const updateSecretaryAction = (details, id) => async (dispatch) => {
    dispatch({ type: UPDATE_SECRETARY.REQUEST });
    try {
        const { data } = await updateSecretaryApi(details, id);
        dispatch({
            type: UPDATE_SECRETARY.SUCCESS,
            payload: data.secretary,
        });
        return { success: true };
    } catch (error) {
        const err =
            error?.response?.data?.message ||
            "An error occurred. Please try again";
        dispatch({
            type: UPDATE_SECRETARY.FAIL,
            payload: err,
        });
        return {
            success: false,
            message: err,
        };
    }
};

export const deleteSecretaryAction = (id) => async (dispatch) => {
    dispatch({ type: DELETE_SECRETARY.REQUEST });
    try {
        await deleteSecretaryApi(id);
        dispatch({
            type: DELETE_SECRETARY.SUCCESS,
        });
        return { success: true };
    } catch (error) {
        const err =
            error?.response?.data?.message ||
            "An error occurred. Please try again";
        dispatch({
            type: DELETE_SECRETARY.FAIL,
            payload: err,
        });
        return {
            success: false,
            message: err,
        };
    }
};
