import { combineReducers } from "redux";
import authReducer from "./auth.reducer";


const rootReducer = combineReducers({
  authState: authReducer,
});

export default rootReducer;
