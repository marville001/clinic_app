import { deleteApi, getApi, postApi, putApi } from "../../api";
import { createAdminUrl, deleteAdminUrl, getAdminsUrl, getAdminUrl, updateAdminUrl } from "../../constants";
import parseError from "../../utils/parseError";
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
        const { data } = await  postApi(createAdminUrl, user);
        dispatch({
            type: CREATE_ADMIN.SUCCESS,
            payload: data.admin,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: CREATE_ADMIN.FAIL,
            payload: parseError(error),
        });
        return {
            success: false,
            message: parseError(error),
        };
    }
};

export const getAdminAction = (id) => async (dispatch) => {
    dispatch({ type: GET_ADMIN.REQUEST });
    try {
        const { data } = await getApi(getAdminUrl(id));
        dispatch({
            type: GET_ADMIN.SUCCESS,
            payload: data.admin,
        });
    } catch (error) {
        dispatch({
            type: GET_ADMIN.FAIL,
            payload: parseError(error),
        });
    }
};

export const getAdminsAction = () => async (dispatch) => {
    dispatch({ type: GET_ADMINS.REQUEST });
    try {
        const { data } = await getApi(getAdminsUrl)
        dispatch({
            type: GET_ADMINS.SUCCESS,
            payload: data.admins,
        });
    } catch (error) {
        dispatch({
            type: GET_ADMINS.FAIL,
            payload: parseError(error),
        });
    }
};

export const updateAdminAction = (details, id) => async (dispatch) => {
    dispatch({ type: UPDATE_ADMIN.REQUEST });
    try {
        const { data } = await putApi(updateAdminUrl(id), details);
        dispatch({
            type: UPDATE_ADMIN.SUCCESS,
            payload: data.admin,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: UPDATE_ADMIN.FAIL,
            payload: parseError(error),
        });
        return {
            success: false,
            message: parseError(error),
        };
    }
};

export const deleteAdminAction = (id) => async (dispatch) => {
    dispatch({ type: DELETE_ADMIN.REQUEST });
    try {
        await deleteApi(deleteAdminUrl(id));
        dispatch({
            type: DELETE_ADMIN.SUCCESS,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: DELETE_ADMIN.FAIL,
            payload: parseError(error),
        });
        return {
            success: false,
            message: parseError(error),
        };
    }
};
