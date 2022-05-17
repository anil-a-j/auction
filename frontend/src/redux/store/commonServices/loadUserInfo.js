// can be accessible for requests
const loadUserInfo = async () => {
  try {
    const api = await fetch("/api/user/userInfo", {
      method: "GET",
    });
    const response = await api.json();
    if (response.message) {
      throw new Error(response.message);
    }
    const accessToken = response.access;
    const user = await fetch("/api/user/userInfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userData = await user.json();
    return userData;
  } catch (error) {}
};

export default loadUserInfo;
