import { GET_APPOINTMENTS } from "../types/appointments.types";


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

        default:
            return { ...state };
    }
};

export default appointmentsReducer;
