import { getUserProfileApi, loginUserApi, postApi, putApi } from "../../api";
import {
  updateAdminUrl,
  updateDoctorUrl,
  updateSecretaryUrl,
} from "../../constants";
import { CHANGE_PASSWORD, LOGOUT_USER, UPDATE_USER, USER_LOGIN } from "../types/auth.types";
import parseError from "../../utils/parseError";
import { updatePasswordUrl } from "../../constants/networkUrls";

export const loginUserAction = (user) => async (dispatch) => {
  dispatch({ type: USER_LOGIN.REQUEST });
  try {
    const { data } = await loginUserApi(user);
    localStorage.setItem("auth-token", data.token);
    dispatch({
      type: USER_LOGIN.SUCCESS,
      payload: data.user,
    });
    return { success: true };
  } catch (error) {
    dispatch({
      type: USER_LOGIN.FAIL,
      payload: parseError(error),
    });
    return {
      success: false,
      message: parseError(error),
    };
  }
};

export const logoutUserAction = () => (dispatch) => {
  localStorage.clear();
  dispatch({
    type: LOGOUT_USER,
  });
};

export const getUserProfileAction = () => async (dispatch) => {
  const token = localStorage["auth-token"];

  if (token) {
    dispatch({ type: USER_LOGIN.REQUEST });
    try {
      const { data } = await getUserProfileApi();
      dispatch({
        type: USER_LOGIN.SUCCESS,
        payload: data.user,
      });
      localStorage.setItem("auth-token", data.token);
    } catch (error) {
      dispatch({ type: USER_LOGIN.FAIL, payload: parseError(error) });
      localStorage.clear();
      window.location.href = "/";
    }
  }
};

export const updateUserProfileAction = (user, role, id) => async (dispatch) => {
  dispatch({ type: UPDATE_USER.REQUEST });
  try {
    if (role === "admin") {
      const { data } = await putApi(updateAdminUrl(id), user);
      dispatch({
        type: UPDATE_USER.SUCCESS,
        payload: data.admin,
      });
    } else if (role === "secretary") {
      const { data } = await putApi(updateSecretaryUrl(id), user);
      dispatch({
        type: UPDATE_USER.SUCCESS,
        payload: data.secretary,
      });
    } else {
      const { data } = await putApi(updateDoctorUrl(id), user);
      dispatch({
        type: UPDATE_USER.SUCCESS,
        payload: data.doctor,
      });
    }

    return { success: true };
  } catch (error) {
    dispatch({ type: UPDATE_USER.FAIL, payload: parseError(error) });

    return {
      success: false,
      message: parseError(error),
    };
  }
};

export const changeUserPasswordAction = (details) => async (dispatch) => {
  dispatch({ type: CHANGE_PASSWORD.REQUEST });
  try {
    await postApi(updatePasswordUrl, details);
    dispatch({
      type: CHANGE_PASSWORD.SUCCESS,
    });

    return { success: true };
  } catch (error) {
    dispatch({ type: CHANGE_PASSWORD.FAIL, payload: parseError(error) });

    return {
      success: false,
      message: parseError(error),
    };
  }
};
