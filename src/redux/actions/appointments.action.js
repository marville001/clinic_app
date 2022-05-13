import {   getApi, postApi,} from "../../api";
import { createAppointmentUrl, getAppointmentsUrl } from "../../constants/networkUrls";
import parseError from "../../utils/parseError";
import { CREATE_APPOINTMENT, GET_APPOINTMENTS } from "../types/appointments.types";


export const createAppointmentAction = (details) => async (dispatch) => {
    dispatch({ type: CREATE_APPOINTMENT.REQUEST });
    try {
        const { data } = await postApi(createAppointmentUrl, details);
        dispatch({
            type: CREATE_APPOINTMENT.SUCCESS,
            payload: data.appointment,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: CREATE_APPOINTMENT.FAIL,
        });
        return {
            success: false,
            message: parseError(error),
        };
    }
};

export const getAppointmentsAction = (id) => async (dispatch) => {
    dispatch({ type: GET_APPOINTMENTS.REQUEST });
    try {
        const { data } = await getApi(getAppointmentsUrl(id));
        dispatch({
            type: GET_APPOINTMENTS.SUCCESS,
            payload: data.appointments,
        });
    } catch (error) {
        dispatch({
            type: GET_APPOINTMENTS.FAIL,
            payload: parseError(error),
        });
    }
};