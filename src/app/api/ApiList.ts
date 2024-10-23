import { DefaultParams } from "@/types";
import apiRequest from "./Fetcher";

const apiPath = {
  List: "/action/list-me",
  Upload: "/action/upload",
};

export async function getListMe(params: DefaultParams) {
  const response = await apiRequest({
    method: "GET",
    endpoint: `${apiPath.List}`,
    params,
  });
  return response;
}

export function createUploadFile(formData: any) {
  return apiRequest({
    method: "POST",
    endpoint: apiPath.Upload,
    isFormData: true,
    data: formData,
  });
}
