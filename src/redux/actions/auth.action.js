import { getUserProfileApi, loginUserApi } from "../../api";
import { LOGOUT_USER, USER_LOGIN } from "../types/auth.types";

export const loginUserAction = (user) => async (dispatch) => {
    dispatch({ type: USER_LOGIN.REQUEST });
    try {
        const { data } = await loginUserApi(user);
        localStorage.setItem("token", data.token);
        dispatch({
            type: USER_LOGIN.SUCCESS,
            payload: data.user,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: USER_LOGIN.FAIL,
            payload:
                error?.response?.data?.message ||
                "An error occurred. Please try again",
        });
        return {
            success: false,
            message:
                error?.response?.data?.message ||
                "An error occurred. Please try again",
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
    const token = localStorage.token;

    if (token) {
        dispatch({ type: USER_LOGIN.REQUEST });
        try {
            const { data } = await getUserProfileApi();
            dispatch({
                type: USER_LOGIN.SUCCESS,
                payload: data.user,
            });
            localStorage.setItem("token", data.token);
        } catch (error) {
            dispatch({ type: USER_LOGIN.REQUEST, payload: "error" });
            localStorage.clear();
            window.location.href = "/";
        }
    }
};
