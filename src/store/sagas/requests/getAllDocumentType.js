import axios from "axios";

export function requestAllDocumentType() {
  return axios.request({
    method: "get",
    url: "https://my-json-server.typicode.com/atothey/demo/user"
  });
}
