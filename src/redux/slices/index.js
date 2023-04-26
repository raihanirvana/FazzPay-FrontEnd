import { combineReducers } from "@reduxjs/toolkit";

import userSlice from "./users";
import transferDetailSlice from "./transfer";

const reducers = combineReducers({
  user: userSlice,
  transferDetail: transferDetailSlice,
});

export default reducers;
