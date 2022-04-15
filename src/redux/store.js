import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middleware = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(
  rootReducer,
  middleware
);

export default store;
