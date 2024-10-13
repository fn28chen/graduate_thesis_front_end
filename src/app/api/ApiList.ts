import apiRequest from "./Fetcher";

const apiPath = {
  List: "/action/list-me",
  Upload: "/action/upload",
};

export function getListMe() {
  return apiRequest({
    method: "GET",
    endpoint: apiPath.List,
  });
}

export function createUploadFile(formData: any) {
  return apiRequest({
    method: "POST",
    endpoint: apiPath.Upload,
    isFormData: true,
    data: formData,
  });
}
