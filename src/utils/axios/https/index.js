import axios from "axios";
const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
export const login = (email, password) => {
  const url = `${API_URL}/auth/login`;
  return axios.post(url, { email, password });
};

export const signup = (firstName, lastName, email, password) => {
  const url = `${API_URL}/auth/register`;
  return axios.post(url, { firstName, lastName, email, password });
};

export const makePin = (pin, id, token) => {
  const body = {
    pin: pin,
  };
  const url = `${API_URL}/user/pin/${id}`;
  return axios.patch(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getData = (id, token) => {
  const url = `${API_URL}/user/profile/${id}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const testt = () => {
  const url = `https://jsonplaceholder.typicode.com/users`;
  return axios.get(url);
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
  const url = `${API_URL}/user/password/${id}`;
  return axios.patch(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const checkPIN = (pin, token) => {
  const url = `${API_URL}/user/pin/${pin}`;
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
  const url = `${API_URL}/user/profile/${id}`;
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
  const url = `${API_URL}/user/profile/${id}`;
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
  const url = `${API_URL}/user/image/${id}`;
  return axios.patch(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getHistoryTransaction = (token, page, limit, filter) => {
  const url = `${API_URL}/transaction/history?page=${page}&limit=${limit}&filter=${filter}`;
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
  const url = `${API_URL}/transaction/top-up`;
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
  const url = `${API_URL}/auth/forgot-password`;
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
  const url = `${API_URL}/auth/reset-password`;
  return axios.patch(url, body);
};

export const getUser = (token, page, limit, search, sort) => {
  const url = `${API_URL}/user?page=${page}&limit=${limit}&search=${search}&sort=${sort}`;
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
  const url = `${API_URL}/transaction/transfer`;
  return axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
