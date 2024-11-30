import config from "@/config";
import axios from "axios";
import { getCookies, removeCookie } from "typescript-cookie";
import apiRequest from "./Fetcher";

const path = {
  login: "/auth/login",
  signup: "/auth/signup",
  logout: "/auth/logout",
  getMe: "/user/me",
};

const logout = async () => {
  try {
    const accessToken = getCookies().accessToken;
    const refreshToken = getCookies().refreshToken;

    const response = await axios.post(
      config.NETWORK_CONFIG.API_BASE_URL + path.logout,
      {
        accessToken: accessToken,
        refreshToken: refreshToken,
      }
    );

    // Handle the response from the backend
    if (response.data.message === "Successfully logged out") {
      // Optionally, you can clear cookies or perform other cleanup actions here
      removeCookie("accessToken");
      removeCookie("refreshToken");
      console.log("Logout successful");
    } else {
      console.warn("Unexpected response during logout:", response.data);
    }
    return response.data;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

export function getMe() {
  return apiRequest({
    method: "GET",
    endpoint: path.getMe,
  });
}

export { logout };
