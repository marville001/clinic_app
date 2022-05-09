import { GET_CHATS, GET_CHAT_MESSAGES } from "../types/messages.types";

const initialState = {
    chats: [],
    messages: [],
    loading: false,
    error: "",
};

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CHATS.REQUEST:
            return { ...state, loading: true, error: "" };
        case GET_CHATS.SUCCESS:
            return {
                ...state,
                chats: action.payload,
                loading: false,
                error: "",
            };
        case GET_CHATS.FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case GET_CHAT_MESSAGES.REQUEST:
            return { ...state, loadingMessages: true, messages: [], error: "" };
        case GET_CHAT_MESSAGES.SUCCESS:
            return {
                ...state,
                messages: action.payload,
                loadingMessages: false,
            };
        case GET_CHAT_MESSAGES.FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return { ...state };
    }
};

export default messagesReducer;
