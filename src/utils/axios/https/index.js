import axios from "axios";

export const login = (email, password) => {
  const url = "https://fazzpay-rose.vercel.app/auth/login";
  return axios.post(url, { email, password });
};

export const signup = (firstName, lastName, email, password) => {
  const url = "https://fazzpay-rose.vercel.app/auth/register";
  return axios.post(url, { firstName, lastName, email, password });
};

export const makePin = (pin, id, token) => {
  const body = {
    pin: pin,
  };
  const url = `https://fazzpay-rose.vercel.app/user/pin/${id}`;
  return axios.patch(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getData = (id, token) => {
  const url = `https://fazzpay-rose.vercel.app/user/profile/${id}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changePass = (
  id,
  token,
  oldPassword,
  newPassword,
  confirmPassword
) => {
  const body = {
    oldPassword: oldPassword,
    newPassword: newPassword,
    confirmPassword: confirmPassword,
  };
  const url = `https://fazzpay-rose.vercel.app/user/password/${id}`;
  return axios.patch(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const checkPIN = (pin, token) => {
  const url = `https://fazzpay-rose.vercel.app/user/pin/${pin}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changePhone = (id, token, noTelp) => {
  const body = {
    noTelp: noTelp,
  };
  const url = `https://fazzpay-rose.vercel.app/user/profile/${id}`;
  return axios.patch(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeName = (id, token, firstName, lastName) => {
  const body = {
    firstName: firstName,
    lastName: lastName,
  };
  const url = `https://fazzpay-rose.vercel.app/user/profile/${id}`;
  return axios.patch(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changePhoto = (id, token, image) => {
  const body = {
    image: image,
  };
  const url = `https://fazzpay-rose.vercel.app/user/image/${id}`;
  return axios.patch(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getHistoryTransaction = (token, page, limit, filter) => {
  const url = `https://fazzpay-rose.vercel.app/transaction/history?page=${page}&limit=${limit}&filter=${filter}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const topUp = (token, amount) => {
  const body = {
    amount: amount,
  };
  const url = "https://fazzpay-rose.vercel.app/transaction/top-up";
  return axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const checkEmail = (email, linkDirect) => {
  const body = {
    email: email,
    linkDirect: linkDirect,
  };
  const url = "https://fazzpay-rose.vercel.app/auth/forgot-password";
  return axios.post(url, body);
};

export const resetEmail = (
  keysChangePassword,
  newPassword,
  confirmPassword
) => {
  const body = {
    keysChangePassword: keysChangePassword,
    newPassword: newPassword,
    confirmPassword: confirmPassword,
  };
  const url = "https://fazzpay-rose.vercel.app/auth/reset-password";
  return axios.patch(url, body);
};

export const getUser = (token, page, limit, search, sort) => {
  const url = `https://fazzpay-rose.vercel.app/user?page=${page}&limit=${limit}&search=${search}&sort=${sort}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const transaction = (receiverId, amount, notes, token) => {
  const body = {
    receiverId: receiverId,
    amount: amount,
    notes: notes,
  };
  const url = "https://fazzpay-rose.vercel.app/transaction/transfer";
  return axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
