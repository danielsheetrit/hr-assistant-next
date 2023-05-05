import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

import { apiService } from "./slices/api-service";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const rootReducer = combineReducers({
  [apiService.reducerPath]: apiService.reducer,
});

export { rootPersistConfig, rootReducer };
