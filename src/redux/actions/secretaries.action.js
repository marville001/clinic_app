import { deleteApi, getApi, postApi, putApi, } from "../../api";
import { createSecretaryUrl, deleteSecretaryUrl, getSecretariesUrl, getSecretaryUrl, updateSecretaryUrl } from "../../constants";
import parseError from "../../utils/parseError";
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
        const { data } = await postApi(createSecretaryUrl, user);
        dispatch({
            type: CREATE_SECRETARY.SUCCESS,
            payload: data.secretary,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: CREATE_SECRETARY.FAIL,
            payload: parseError(error),
        });
        return {
            success: false,
            message: parseError(error),
        };
    }
};

export const getSecretaryAction = (id) => async (dispatch) => {
    dispatch({ type: GET_SECRETARY.REQUEST });
    try {
        const { data } = await getApi(getSecretaryUrl(id));
        dispatch({
            type: GET_SECRETARY.SUCCESS,
            payload: data.secretary,
        });
    } catch (error) {
        dispatch({
            type: GET_SECRETARY.FAIL,
            payload: parseError(error),
        });
    }
};

export const getSecretariesAction = () => async (dispatch) => {
    dispatch({ type: GET_SECRETARIES.REQUEST });
    try {
        const { data } = await getApi(getSecretariesUrl);
        dispatch({
            type: GET_SECRETARIES.SUCCESS,
            payload: data.secretaries,
        });
    } catch (error) {
        dispatch({
            type: GET_SECRETARIES.FAIL,
            payload: parseError(error),
        });
    }
};

export const updateSecretaryAction = (details, id) => async (dispatch) => {
    dispatch({ type: UPDATE_SECRETARY.REQUEST });
    try {
        const { data } = await putApi(updateSecretaryUrl(id), details);
        dispatch({
            type: UPDATE_SECRETARY.SUCCESS,
            payload: data.secretary,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: UPDATE_SECRETARY.FAIL,
            payload: parseError(error),
        });
        return {
            success: false,
            message: parseError(error),
        };
    }
};

export const deleteSecretaryAction = (id) => async (dispatch) => {
    dispatch({ type: DELETE_SECRETARY.REQUEST });
    try {
        await deleteApi(deleteSecretaryUrl(id));
        dispatch({
            type: DELETE_SECRETARY.SUCCESS,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: DELETE_SECRETARY.FAIL,
            payload: parseError(error),
        });
        return {
            success: false,
            message: parseError(error),
        };
    }
};
