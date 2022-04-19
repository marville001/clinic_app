import { getUserProfileApi, loginUserApi } from "../../api";
import { LOGOUT_USER, USER_LOGIN } from "../types";

export const loginUserAction = (user) => async (dispatch) => {
    dispatch({ type: USER_LOGIN.REQUEST, payload: user });
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
    console.log(token);
    if (token) {
        try {
            const { data } = await getUserProfileApi();
            dispatch({
                type: USER_LOGIN.SUCCESS,
                payload: data.user,
            });
            localStorage.setItem("token", data.token);
        } catch (error) {
            localStorage.clear();
            window.location.href = "/";
        }
    }
};
