import { DefaultParams } from "@/types";
import apiRequest from "./Fetcher";
const apiPath = {
  List: "/action/list-me",
  Upload: "/action/upload",
  GetFullUrl: "/action/get-info",
  DownloadPresignedUrl: `/action/download-presigned`,
  ListTrash: "/action/trash",
  MoveToTrash: "/action/move-to-trash",
  Restore: "/action/restore-file",
  Delete: "/action/delete",
  TotalSize: "/action/total-size",
};

export async function getListMe(params: DefaultParams) {
  const response = await apiRequest({
    method: "GET",
    endpoint: `${apiPath.List}?page=${params.page}&limit=${params.limit}`,
  });
  return response;
}

export async function getTotalSize() {
  const response = await apiRequest({
    method: "GET",
    endpoint: apiPath.TotalSize,
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

export function getInfo(fileName: string) {
  return apiRequest({
    method: "GET",
    endpoint: `${apiPath.GetFullUrl}/${fileName}`,
    isOctetStream: true,
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

export function restoreFile(fileName: string) {
  return apiRequest({
    method: "POST",
    endpoint: `${apiPath.Restore}/${fileName}`,
  });
}

export async function deleteFile(fileName: string) {
  return apiRequest({
    method: "DELETE",
    endpoint: `${apiPath.Delete}/${fileName}`
  })
}
