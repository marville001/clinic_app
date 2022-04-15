import { loginUserApi } from "../../api/auth";
import { LOGOUT_USER, USER_LOGIN } from "../types";

export const loginUserAction = (user) => async (dispatch) => {
    dispatch({ type: USER_LOGIN.REQUEST, payload: user });
    try {
        const data = await loginUserApi(user);
        localStorage.setItem("token", data.token);
        dispatch({
            type: USER_LOGIN.SUCCESS,
            user,
        });
    } catch (error) {
        dispatch({
            type: USER_LOGIN.FAIL,
            error:
                error?.response?.data?.message ||
                "An error occurred. Please try again",
        });
    }
};

export const logoutUserAction = () => (dispatch) => {
    localStorage.removeItem("token");
    dispatch({
        type: LOGOUT_USER,
    });
};
