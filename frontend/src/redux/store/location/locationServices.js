export const countryService = async () => {
  const api = await fetch("/api/location/countries", {
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

export const stateService = async (data) => {
  const api = await fetch(`/api/location/states/${data}`, {
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
