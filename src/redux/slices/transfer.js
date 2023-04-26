import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: "",
  note: "",
  id: "",
  image: "",
  firstName: "",
  lastName: "",
  noTelp: "",
  balance: "",
};

const transferDetailSlice = createSlice({
  name: "transferDetail",
  initialState,
  reducers: {
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setNote: (state, action) => {
      state.note = action.payload;
    },
    setIds: (state, action) => {
      state.id = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setNoTelp: (state, action) => {
      state.noTelp = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
});

export const {
  setAmount,
  setNote,
  setIds,
  setImage,
  setFirstName,
  setLastName,
  setNoTelp,
  setBalance,
} = transferDetailSlice.actions;

export default transferDetailSlice.reducer;

export { transferDetailSlice };
