import { createSecretaryApi } from "../../api/secretaries";
import { CREATE_SECRETARY } from "../types/secretaries.types";

export const createSecretaryAction = (user) => async (dispatch) => {
    dispatch({ type: CREATE_SECRETARY.REQUEST });
    try {
        const { data } = await createSecretaryApi(user);
        dispatch({
            type: CREATE_SECRETARY.SUCCESS,
            payload: data.secretary,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: CREATE_SECRETARY.FAIL,
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
