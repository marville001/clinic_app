import {
    createAdminApi,
    deleteAdminApi,
    getAdminApi,
    getAdminsApi,
    updateAdminApi,
} from "../../api";
import {
    CREATE_ADMIN,
    DELETE_ADMIN,
    GET_ADMINS,
    GET_ADMIN,
    UPDATE_ADMIN,
} from "../types/admins.types";

export const createAdminAction = (user) => async (dispatch) => {
    dispatch({ type: CREATE_ADMIN.REQUEST });
    try {
        const { data } = await createAdminApi(user);
        dispatch({
            type: CREATE_ADMIN.SUCCESS,
            payload: data.admin,
        });
        return { success: true };
    } catch (error) {
        const err =
            error?.response?.data?.message ||
            "An error occurred. Please try again";
        dispatch({
            type: CREATE_ADMIN.FAIL,
            payload: err,
        });
        return {
            success: false,
            message: err,
        };
    }
};

export const getAdminAction = (id) => async (dispatch) => {
    dispatch({ type: GET_ADMIN.REQUEST });
    try {
        const { data } = await getAdminApi(id);
        dispatch({
            type: GET_ADMIN.SUCCESS,
            payload: data.admin,
        });
    } catch (error) {
        dispatch({
            type: GET_ADMIN.FAIL,
            payload:
                error?.response?.data?.message ||
                "An error occurred. Please try again",
        });
    }
};

export const getAdminsAction = () => async (dispatch) => {
    dispatch({ type: GET_ADMINS.REQUEST });
    try {
        const { data } = await getAdminsApi();
        dispatch({
            type: GET_ADMINS.SUCCESS,
            payload: data.admins,
        });
    } catch (error) {
        dispatch({
            type: GET_ADMINS.FAIL,
            payload:
                error?.response?.data?.message ||
                "An error occurred. Please try again",
        });
    }
};

export const updateAdminAction = (details, id) => async (dispatch) => {
    dispatch({ type: UPDATE_ADMIN.REQUEST });
    try {
        const { data } = await updateAdminApi(details, id);
        dispatch({
            type: UPDATE_ADMIN.SUCCESS,
            payload: data.admin,
        });
        return { success: true };
    } catch (error) {
        const err =
            error?.response?.data?.message ||
            "An error occurred. Please try again";
        dispatch({
            type: UPDATE_ADMIN.FAIL,
            payload: err,
        });
        return {
            success: false,
            message: err,
        };
    }
};

export const deleteAdminAction = (id) => async (dispatch) => {
    dispatch({ type: DELETE_ADMIN.REQUEST });
    try {
        await deleteAdminApi(id);
        dispatch({
            type: DELETE_ADMIN.SUCCESS,
        });
        return { success: true };
    } catch (error) {
        const err =
            error?.response?.data?.message ||
            "An error occurred. Please try again";
        dispatch({
            type: DELETE_ADMIN.FAIL,
            payload: err,
        });
        return {
            success: false,
            message: err,
        };
    }
};
