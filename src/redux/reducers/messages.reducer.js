import { GET_CHATS } from "../types/messages.types";

const initialState = {
    chats: [],
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

        default:
            return { ...state };
    }
};

export default messagesReducer;
