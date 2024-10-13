import apiRequest from "./Fetcher";
const apiPath = {
  List: "/action/list-me",
};

export function getListMe() {
  return apiRequest({
    method: "GET",
    endpoint: apiPath.List,
  });
}