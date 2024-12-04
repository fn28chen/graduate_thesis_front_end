import { DefaultParams } from "@/types";
import apiRequest from "./Fetcher";
const apiPath = {
  List: "/action/list-me",
  Upload: "/action/upload",
  DownloadPresignedUrl: `/action/download-presigned`,
  ListTrash: "/action/trash",
  MoveToTrash: "/action/move-to-trash",
  Delete: "/action/delete",
};

export async function getListMe(params: DefaultParams) {
  const response = await apiRequest({
    method: "GET",
    endpoint: `${apiPath.List}?page=${params.page}&limit=${params.limit}`,
  });
  return response;
}

export function createUploadFile(formData: FormData) {
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

export function getTrashFolder() {
  return apiRequest({
    method: "GET",
    endpoint: apiPath.ListTrash,
  });
}

export function moveToTrash(fileName: string) {
  return apiRequest({
    method: "POST",
    endpoint: `${apiPath.MoveToTrash}/${fileName}`,
  });
}

export async function deleteFile(fileName: string) {
  return apiRequest({
    method: "DELETE",
    endpoint: `${apiPath.Delete}/${fileName}`
  })
}
