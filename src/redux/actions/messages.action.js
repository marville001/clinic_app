
import { getApi } from "../../api";
import { getChatsUrl } from "../../constants";
import parseError from "../../utils/parseError";
import { GET_CHATS } from "../types/messages.types";

export const getChatsAction = () => async (dispatch) => {
    dispatch({ type: GET_CHATS.REQUEST });
    try {
        const { data } = await getApi(getChatsUrl);
        dispatch({
            type: GET_CHATS.SUCCESS,
            payload: data.chats,
        });
    } catch (error) {
        dispatch({
            type: GET_CHATS.FAIL,
            payload: parseError(error),
        });
    }
};
