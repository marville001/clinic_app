import { getProfileUrl, loginUrl } from "../constants";
import http from "../utils/https";

const { post, get } = http;
export const loginUserApi = async (user) => {
    return await post(loginUrl, user);
};

export const getUserProfileApi = async () => {
    return await get(getProfileUrl);
};
