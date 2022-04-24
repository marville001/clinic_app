import { combineReducers } from "redux";
import adminsReducer from "./admins.reducer";
import authReducer from "./auth.reducer";
import departmentsReducer from "./departments.reducer";
import doctorsReducer from "./doctors.reducer";
import secretariesReducer from "./secretaries.reducer";
import diagnosisReducer from "./diagnosis.reducer";

const rootReducer = combineReducers({
    authState: authReducer,
    secretariesState: secretariesReducer,
    adminsState: adminsReducer,
    departmentsState: departmentsReducer,
    doctorsState: doctorsReducer,
    diagnosisState: diagnosisReducer,
});

export default rootReducer;
