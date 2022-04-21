import {
    createDepartmentApi,
    deleteDepartmentApi,
    getDepartmentsApi,
} from "../../api/departments";
import {
    CREATE_DEPARTMENT,
    DELETE_DEPARTMENT,
    GET_DEPARTMENTS,
} from "../types/departments.types";

export const createDepartmentAction = (department) => async (dispatch) => {
    dispatch({ type: CREATE_DEPARTMENT.REQUEST });
    try {
        const { data } = await createDepartmentApi(department);
        dispatch({
            type: CREATE_DEPARTMENT.SUCCESS,
            payload: data.department,
        });
        return { success: true };
    } catch (error) {
        const err =
            error?.response?.data?.message ||
            "An error occurred. Please try again";
        dispatch({
            type: CREATE_DEPARTMENT.FAIL,
        });
        return {
            success: false,
            message: err,
        };
    }
};

export const getDepartmentsAction = () => async (dispatch) => {
    dispatch({ type: GET_DEPARTMENTS.REQUEST });
    try {
        const { data } = await getDepartmentsApi();
        dispatch({
            type: GET_DEPARTMENTS.SUCCESS,
            payload: data.departments,
        });
    } catch (error) {
        dispatch({
            type: GET_DEPARTMENTS.FAIL,
            payload:
                error?.response?.data?.message ||
                "An error occurred. Please try again",
        });
    }
};

export const deleteDepartmentAction = (id) => async (dispatch) => {
    dispatch({ type: DELETE_DEPARTMENT.REQUEST });
    try {
        await deleteDepartmentApi(id);
        dispatch({
            type: DELETE_DEPARTMENT.SUCCESS,
        });
        return { success: true };
    } catch (error) {
        const err =
            error?.response?.data?.message ||
            "An error occurred. Please try again";
        dispatch({
            type: DELETE_DEPARTMENT.FAIL,
        });
        return {
            success: false,
            message: err,
        };
    }
};
