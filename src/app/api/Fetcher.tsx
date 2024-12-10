import axios, { AxiosRequestConfig } from "axios";
import Config from "@/config";
import { getCookies } from "typescript-cookie";
import { DefaultParams } from "@/types";

interface IAPIRequest {
  method: string;
  endpoint: string;
  data?: any;
  isFormData?: boolean;
  isOctetStream?: boolean;
  params?: DefaultParams;
}

const getAuthentication = () => {
  const accessToken = getCookies().accessToken;
  if (accessToken) {
    return `Bearer ${accessToken}`;
  } else {
    console.error("Unauthorized: No access token found");
    return "";
  }
};

export async function apiRequest({
  method,
  endpoint,
  data,
  isFormData,
  isOctetStream,
}: IAPIRequest): Promise<any> {
  const url = `${Config.NETWORK_CONFIG.API_BASE_URL}${endpoint}`;

  // Get the authentication header
  const authHeader = getAuthentication();
  if (!authHeader) {
    return;
  }

  const headers: AxiosRequestConfig["headers"] = {
    "Content-Type": isFormData
      ? "multipart/form-data"
      : isOctetStream
      ? "application/octet-stream"
      : "application/json",
    Authorization: authHeader, // Set the authorization header here
  };

  const config: AxiosRequestConfig = {
    method,
    url,
    headers,
    data,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
}

export default apiRequest;
