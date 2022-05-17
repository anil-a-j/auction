import loadUserInfo from "../commonServices/loadUserInfo";

export const registerService = async (data) => {
  const api = await fetch("/api/user/registerUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await api.json();
  if (response.message) {
    throw new Error(response.message);
  }
  return response;
};

export const logInService = async (data, thunkAPI) => {
  const api = await fetch("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await api.json();
  if (response.message) {
    throw new Error(response.message);
  }
  return response;
};

export const logOutService = async () => {
  const user = await loadUserInfo();
  const api = await fetch("/api/user/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.access}`,
    },
  });
  // because of no json data in response we can't use api.json() otherwise that show unexpected end of json input
  if (api.status !== 200) {
    throw new Error(
      "Logout service temporarily unavailable! thank you for your co-operation "
    );
  }
  return true;
};

export const updateService = async ({
  email,
  phone,
  password,
  type,
  userImage,
}) => {
  const user = await loadUserInfo();
  const formData = new FormData();
  formData.append("userImage", userImage);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("type", type);
  formData.append("password", password);

  const api = await fetch("/api/user/userInfo", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${user.access}`,
    },
    body: formData,
  });
  const response = await api.json();
  if (response.message) {
    throw new Error(response.message);
  }
  return response;
};

export const deleteImage = async () => {
  const user = await loadUserInfo();
  const api = await fetch("/api/user/userImage", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${user.access}`,
    },
  });
  const response = await api.json();
  if (response.message) {
    throw new Error(response.message);
  }
  return response;
};

export const deleteAccount = async () => {
  const user = await loadUserInfo();
  const api = await fetch("/api/user/userInfo", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${user.access}`,
    },
  });

  if (api.status !== 200) {
    throw new Error("User deletion feature is temporarily unavailabe!");
  }
  return true;
};
