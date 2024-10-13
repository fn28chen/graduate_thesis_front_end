import axios, { AxiosRequestConfig } from "axios";
import Config from "@/config";
import { getCookies } from "typescript-cookie";

interface IAPIRequest {
  method: string;
  endpoint: string;
  data?: any;
  isFormData?: boolean;
}

const apiRequest = async ({
  method,
  endpoint,
  data,
  isFormData,
}: IAPIRequest): Promise<any> => {
  const url = `${Config.NETWORK_CONFIG.API_BASE_URL}${endpoint}`;
  const headers: AxiosRequestConfig["headers"] = {
    "Content-Type": isFormData ? "multipart/form-data" : "application/json",
  };
  const accessToken = getCookies().accessToken;
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  } else {
    console.error("Unauthorized: No access token found");
  }

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
};

export default apiRequest;
