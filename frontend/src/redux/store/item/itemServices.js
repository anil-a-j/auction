import loadUserInfo from "../commonServices/loadUserInfo";

export const askService = async (data) => {
  const user = await loadUserInfo();
  const api = await fetch("/api/item/askItem", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.access}`,
    },
    body: JSON.stringify(data),
  });
  const response = await api.json();
  if (response.message) {
    throw new Error(response.message);
  }
  return response;
};

export const itemTypeService = async (data) => {
  const api = await fetch("/api/item/itemTypes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await api.json();
  if (response.message) {
    throw new Error(response.message);
  }
  return response;
};

export const searchItemsService = async (data) => {
  const api = await fetch("/api/item/searchItems", {
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