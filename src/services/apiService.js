const BASE_URL = "http://localhost:8080/api";

export async function request(method, path, body) {
  const token = localStorage.getItem("jwt");

  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }

  const options = { method, headers };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(BASE_URL + path, options);

  if (!response.ok) {
    throw new Error(`${response.status}: ${await response.text()}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }
  return await response.text();
}
