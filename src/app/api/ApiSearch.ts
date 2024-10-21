import apiRequest from "./Fetcher";

const apiPath = {
  getFileByName: "/search/name",
  getFileByExtension: "/search/extension",
};

export function getFileByName(query: string) {
  return apiRequest({
    method: "GET",
    endpoint: `${apiPath.getFileByName}?query=${query}`,
  });
}

export function getFileByExtension(query: string) {
  return apiRequest({
    method: "GET",
    endpoint: `${apiPath.getFileByExtension}?query=${query}`,
  });
}
