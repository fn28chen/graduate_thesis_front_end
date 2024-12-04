import config from "@/config";
import axios from "axios";
import { getCookies, removeCookie } from "typescript-cookie";
import apiRequest from "./Fetcher";

const apiPath = {
  login: "/auth/login",
  signup: "/auth/signup",
  logout: "/auth/logout",
  profile: "/user/me",
  updateAvatar: "/user/me/avatar",
};

export const logout = async () => {
  try {
    const accessToken = getCookies().accessToken;
    const refreshToken = getCookies().refreshToken;

    const response = await axios.post(
      config.NETWORK_CONFIG.API_BASE_URL + apiPath.logout,
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

export async function profile() {
  return apiRequest({
    method: "GET",
    endpoint: apiPath.profile,
  });
}

export function updateAvatar(data: FormData) {
  return apiRequest({
    method: "POST",
    endpoint: apiPath.updateAvatar,
    isFormData: true,
    data,
  });
}

