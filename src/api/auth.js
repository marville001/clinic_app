import {
  getProfileUrl,
  loginUrl,
} from "../constants";
import http from "../utils/https";

const { post, get } = http;
export const loginUserApi = async (user) => {
  return await post(loginUrl, user);
};

export const getUserProfileApi = async () => {
  return await get(getProfileUrl);
};
// export const updateUserApi = async (user) => {
//   if (user.role === "admin") {
//     return await put(updateAdminUrl(user._id), user);
//   } else if (user.role === "secretary") {
//     return await put(updateSecretaryUrl, user);
//   } else {
//     return await put(updateDoctorUrl, user);
//   }
// };
