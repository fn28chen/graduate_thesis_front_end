import { DefaultParams } from "@/types";
import apiRequest from "./Fetcher";
const apiPath = {
  List: "/action/list-me",
  Upload: "/action/upload",
  DownloadPresignedUrl: `/action/download-presigned`,
  Delete: "/action/delete",
};

export async function getListMe(params: DefaultParams) {
  const response = await apiRequest({
    method: "GET",
    endpoint: `${apiPath.List}/?page=${params.page}&limit=${params.limit}`,
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

export function getDownloadPresignedUrl(fileName: string) {
  return apiRequest({
    method: "GET",
    endpoint: `${apiPath.DownloadPresignedUrl}/${fileName}`,
  });
}

export async function deleteFile(fileName: string) {
  return apiRequest({
    method: "DELETE",
    endpoint: `${apiPath.Delete}/${fileName}`
  })
}
