import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import secretariesReducer from "./secretaries.reducer";

const rootReducer = combineReducers({
    authState: authReducer,
    secretariesState: secretariesReducer,
});

export default rootReducer;
