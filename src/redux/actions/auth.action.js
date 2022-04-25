import { getUserProfileApi, loginUserApi } from "../../api";
import { LOGOUT_USER, USER_LOGIN } from "../types/auth.types";
import parseError from "../../utils/parseError";

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
