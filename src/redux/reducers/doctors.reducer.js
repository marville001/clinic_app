import {
  CREATE_DOCTOR,
  DELETE_DOCTOR,
  GET_ASSIGNED_PATIENTS,
  GET_DOCTOR,
  GET_DOCTORS,
  UPDATE_DOCTOR,
  UPDATE_DOCTOR_ADMIN_STATUS,
} from "../types/doctors.types";

const initialState = {
  doctors: [],
  assignedPatients: [],
  doctor: {},
  loading: false,
  loadingDoctor: false,
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
      return { ...state, loadingDoctor: true, doctor: {}, error: "" };
    case GET_DOCTOR.SUCCESS:
      return { ...state, doctor: action.payload, loadingDoctor: false };
    case GET_DOCTOR.FAIL:
      return { ...state, loadingDoctor: false, error: action.payload };
    
    case GET_ASSIGNED_PATIENTS.REQUEST:
      return { ...state, loadingAssignedPatients: true, error: "" };
    case GET_ASSIGNED_PATIENTS.SUCCESS:
      return { ...state, assignedPatients: action.payload, loadingAssignedPatients: false };
    case GET_ASSIGNED_PATIENTS.FAIL:
      return { ...state, loadingAssignedPatients: false, error: action.payload };

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
    
    case UPDATE_DOCTOR_ADMIN_STATUS.REQUEST:
      return { ...state, updatingIsAdmin: true };
    case UPDATE_DOCTOR_ADMIN_STATUS.SUCCESS:
      return { ...state, updatingIsAdmin: false, doctor:{...state.doctor, isAdmin: action.payload} };
    case UPDATE_DOCTOR_ADMIN_STATUS.FAIL:
      return { ...state, updatingIsAdmin: false };

    default:
      return { ...state };
  }
};

export default doctorsReducer;
