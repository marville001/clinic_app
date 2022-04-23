import { CREATE_DOCTOR, DELETE_DOCTOR, GET_DOCTOR, GET_DOCTORS, UPDATE_DOCTOR } from "../types/doctors.types";

const initialState = {
    doctors: [],
    doctor: {},
    loading: false,
    creating: false,
    updating: false,
    deleting: false,
    error: "",
};

const doctorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOCTORS.REQUEST:
            return { ...state, loading: true, error: "" };
        case GET_DOCTORS.SUCCESS:
            return {
                ...state,
                doctors: action.payload,
                loading: false,
                error: "",
            };
        case GET_DOCTORS.FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CREATE_DOCTOR.REQUEST:
            return { ...state, creating: true };
        case CREATE_DOCTOR.SUCCESS:
            return {
                ...state,
                doctors: [action.payload, ...state.doctors],
                creating: false,
            };
        case CREATE_DOCTOR.FAIL:
            return { ...state, creating: false };

        case GET_DOCTOR.REQUEST:
            return { ...state, loading: true, doctor: {}, error: "" };
        case GET_DOCTOR.SUCCESS:
            return { ...state, doctor: action.payload, loading: false };
        case GET_DOCTOR.FAIL:
            return { ...state, loading: false, error: action.payload };

        case UPDATE_DOCTOR.REQUEST:
            return { ...state, updating: true };
        case UPDATE_DOCTOR.SUCCESS:
            return { ...state, updating: false };
        case UPDATE_DOCTOR.FAIL:
            return { ...state, updating: false };

        case DELETE_DOCTOR.REQUEST:
            return { ...state, deleting: true };
        case DELETE_DOCTOR.SUCCESS:
            return { ...state, deleting: false };
        case DELETE_DOCTOR.FAIL:
            return { ...state, deleting: false };

        default:
            return { ...state };
    }
};

export default doctorsReducer;
