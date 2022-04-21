import { combineReducers } from "redux";
import adminsReducer from "./admins.reducer";
import authReducer from "./auth.reducer";
import secretariesReducer from "./secretaries.reducer";

const rootReducer = combineReducers({
    authState: authReducer,
    secretariesState: secretariesReducer,
    adminsState: adminsReducer,
});

export default rootReducer;
