import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import Config from "@/config";
import ListErrorMessage from "@/app/api/ErrorMessage/ListErrorMessage";

export interface IDataError {
  errorCode: string;
  errorMessage?: string;
}

export interface IMetadata {
  time?: string;
  total?: number;
}

export interface IDataWithMeta<T> {
  meta: IMetadata;
  data: T;
}

export interface IResponseDTO<T> {
  success: boolean;
  errorCode: string;
  message?: string;
  meta?: IMetadata;
  data?: T;
}

interface IResponseWithMetadataDTO<T> {
  success: boolean;
  errorCode: string;
  message?: string;
  meta: IMetadata;
  data?: T;
}

interface IFetcherOptions {
  token?: string;
  withToken?: boolean;
  withMetadata?: boolean;
  displayError?: boolean;
  isFormData?: boolean;
}

function createApiClient(config: AxiosRequestConfig, options: IFetcherOptions) {
  const defaultOptions: IFetcherOptions = {
    withToken: Config.NETWORK_CONFIG.USE_TOKEN,
    withMetadata: Config.NETWORK_CONFIG.WITH_METADATA,
    displayError: Config.NETWORK_CONFIG.DISPLAY_ERROR,
    ...options,
  };

  const apiClient = axios.create({
    baseURL: Config.NETWORK_CONFIG.API_BASE_URL,
    timeout: Config.NETWORK_CONFIG.TIMEOUT,
    headers: {
      "Content-Type": "application/json",
      // "Accept-Language": language || "en",
      Authorization: defaultOptions.withToken
        ? `Bearer ${defaultOptions.token}`
        : "",
    },
  });

  return { apiClient, defaultOptions };
}
