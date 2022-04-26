import {  deleteApi, getApi, postApi,} from "../../api";
import { createDepartmentUrl, deleteDepartmentUrl, getDepartmentsUrl } from "../../constants";
import parseError from "../../utils/parseError";
import {
    CREATE_DEPARTMENT,
    DELETE_DEPARTMENT,
    GET_DEPARTMENTS,
} from "../types/departments.types";

export const createDepartmentAction = (department) => async (dispatch) => {
    dispatch({ type: CREATE_DEPARTMENT.REQUEST });
    try {
        const { data } = await postApi(createDepartmentUrl, department);
        dispatch({
            type: CREATE_DEPARTMENT.SUCCESS,
            payload: data.department,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: CREATE_DEPARTMENT.FAIL,
        });
        return {
            success: false,
            message: parseError(error),
        };
    }
};

export const getDepartmentsAction = () => async (dispatch) => {
    dispatch({ type: GET_DEPARTMENTS.REQUEST });
    try {
        const { data } = await getApi(getDepartmentsUrl);
        dispatch({
            type: GET_DEPARTMENTS.SUCCESS,
            payload: data.departments,
        });
    } catch (error) {
        dispatch({
            type: GET_DEPARTMENTS.FAIL,
            payload: parseError(error),
        });
    }
};

export const deleteDepartmentAction = (id) => async (dispatch) => {
    dispatch({ type: DELETE_DEPARTMENT.REQUEST });
    try {
        await deleteApi(deleteDepartmentUrl(id));
        dispatch({
            type: DELETE_DEPARTMENT.SUCCESS,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: DELETE_DEPARTMENT.FAIL,
        });
        return {
            success: false,
            message: parseError(error),
        };
    }
};
