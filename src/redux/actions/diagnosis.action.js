import { CREATE_DIAGNOSIS, GET_DIAGNOSIS, DELETE_DIAGNOSIS } from "../types/diagnosis.types"
import {createDiagnosisApi, getDiagnosisApi, deleteDiagnosisApi} from "../../api"

import parseError from "../../utils/parseError";

export const createDiagnosisAction = (department) => async (dispatch) => {
    dispatch({ type: CREATE_DIAGNOSIS.REQUEST });
    try {
        const { data } = await createDiagnosisApi(department);
        dispatch({
            type: CREATE_DIAGNOSIS.SUCCESS,
            payload: data.diagnosis,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: CREATE_DIAGNOSIS.FAIL,
        });
        return {
            success: false,
            message: parseError(error),
        };
    }
};

export const getDiagnosisAction = () => async (dispatch) => {
    dispatch({ type: GET_DIAGNOSIS.REQUEST });
    try {
        const { data } = await getDiagnosisApi();
        dispatch({
            type: GET_DIAGNOSIS.SUCCESS,
            payload: data.diagnosis,
        });
    } catch (error) {
        dispatch({
            type: GET_DIAGNOSIS.FAIL,
            payload: parseError(error),
        });
    }
};

export const deleteDiagnosisAction = (id) => async (dispatch) => {
    dispatch({ type: DELETE_DIAGNOSIS.REQUEST });
    try {
        await deleteDiagnosisApi(id);
        dispatch({
            type: DELETE_DIAGNOSIS.SUCCESS,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: DELETE_DIAGNOSIS.FAIL,
        });
        return {
            success: false,
            message: parseError(error),
        };
    }
};
