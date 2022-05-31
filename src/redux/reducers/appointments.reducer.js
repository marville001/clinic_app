import { DELETE_APPOINTMENT, GET_APPOINTMENTS, UPDATE_APPOINTMENT } from "../types/appointments.types";


const initialState = {
    appointments: [],
    loading: false,
    creating: false,
    deleting: false,
    error: "",
};

const appointmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_APPOINTMENTS.REQUEST:
            return { ...state, loading: true, error: "" };
        case GET_APPOINTMENTS.SUCCESS:
            return {
                ...state,
                appointments: action.payload,
                loading: false,
                error: "",
            };
        case GET_APPOINTMENTS.FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        
        case UPDATE_APPOINTMENT.REQUEST:
            return { ...state, updating: true };
        case UPDATE_APPOINTMENT.SUCCESS:
            return { ...state, updating: false };
        case UPDATE_APPOINTMENT.FAIL:
            return { ...state, updating: false };
        
        case DELETE_APPOINTMENT.REQUEST:
            return { ...state, deleting: true };
        case DELETE_APPOINTMENT.SUCCESS:
            return { ...state, deleting: false };
        case DELETE_APPOINTMENT.FAIL:
            return { ...state, deleting: false };

        default:
            return { ...state };
    }
};

export default appointmentsReducer;
