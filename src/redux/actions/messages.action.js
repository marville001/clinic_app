import { getApi, postApi } from "../../api";
import { getChatsUrl } from "../../constants";
import {
    createChatsUrl,
    getChatMessagesUrl,
    sendMessageUrl,
} from "../../constants/networkUrls";
import parseError from "../../utils/parseError";
import {
    CREATE_CHAT,
    GET_CHATS,
    GET_CHAT_MESSAGES,
    RESET_MESSAGES,
    SEND_MESSAGE,
} from "../types/messages.types";

export const createChatAction = (details) => async (dispatch) => {
    dispatch({ type: CREATE_CHAT.REQUEST });
    try {
        const { data } = await postApi(createChatsUrl, details);
        dispatch({
            type: CREATE_CHAT.SUCCESS,
            payload: data.chat,
        });
    } catch (error) {
        dispatch({
            type: CREATE_CHAT.FAIL,
            payload: parseError(error),
        });
    }
};

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

export const sendMessageAction = (message) => async (dispatch) => {
    dispatch({ type: SEND_MESSAGE.REQUEST });
    try {
        const { data } = await postApi(sendMessageUrl, message);
        dispatch({
            type: SEND_MESSAGE.SUCCESS,
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: SEND_MESSAGE.FAIL,
            payload: parseError(error),
        });
    }
};

export const resetMessagesAction = () => (dispatch) => {
    dispatch({
        type: RESET_MESSAGES,
    });
};
