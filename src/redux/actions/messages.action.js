
import { getApi } from "../../api";
import { getChatsUrl } from "../../constants";
import { getChatMessagesUrl } from "../../constants/networkUrls";
import parseError from "../../utils/parseError";
import { GET_CHATS, GET_CHAT_MESSAGES } from "../types/messages.types";

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

export const getChatMessagesAction = (id) => async (dispatch) => {
    dispatch({ type: GET_CHAT_MESSAGES.REQUEST });
    try {
        const { data } = await getApi(getChatMessagesUrl(id));
        dispatch({
            type: GET_CHAT_MESSAGES.SUCCESS,
            payload: data.messages,
        });
    } catch (error) {
        dispatch({
            type: GET_CHAT_MESSAGES.FAIL,
            payload: parseError(error),
        });
    }
};
