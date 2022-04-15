import http from "../utils/https";

const { post } = http;
export const loginUserApi = async (user) => {
    return await post("LOGIN_URL", user);
};
