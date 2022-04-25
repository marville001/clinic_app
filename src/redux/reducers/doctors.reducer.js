import { CREATE_DOCTOR } from "../types/doctors.types";

const initialState = {
  doctors: [],
  doctor: {},
  loading: false,
  creating: false,
  updating: false,
  deleting: false,
  error: "",
};

const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DOCTOR.REQUEST:
      return {
        ...state,
        creating: true,
      };

    case CREATE_DOCTOR.SUCCESS:
      return {
        ...state,
        secretaries: [action.payload, ...state.secretaries],
        creating: false,
      };

    case CREATE_DOCTOR.FAIL:
      return {
        ...state,
        creating: false,
      };

    default:
      return { ...state };
  }
};

export default doctorReducer;
