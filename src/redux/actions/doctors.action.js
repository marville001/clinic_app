import { createDoctorApi } from "../../api";
import { CREATE_DOCTOR } from "../types/doctors.types";

export const createDoctorAction = (user) => async (dispatch) => {
  dispatch({ type: CREATE_DOCTOR.REQUEST });
  try {
    const { data } = await createDoctorApi(user);
    dispatch({
      type: CREATE_DOCTOR.SUCCESS,
      payload: data.doctor,
    });
    return { success: true };
  } catch (error) {
    const err =
      error?.response?.data?.message || "An error occurred. Please try again";
    dispatch({
      type: CREATE_DOCTOR.FAIL,
      payload: err,
    });
    return {
      success: false,
      message: err,
    };
  }
};
