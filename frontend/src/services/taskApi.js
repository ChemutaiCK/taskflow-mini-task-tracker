// All requests go through the Vite dev proxy (see vite.config.js), so a
// relative path is enough — the browser always calls the real backend API.
const BASE_URL = "/api/tasks";

async function handleResponse(response) {
  if (response.status === 204) return null;

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.detail || "Something went wrong. Please try again.";
    throw new Error(message);
  }

  return data;
}

export async function fetchTasks({ search = "", status = "All" } = {}) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (status && status !== "All") params.set("status_filter", status);

  const query = params.toString();
  const response = await fetch(query ? `${BASE_URL}?${query}` : BASE_URL);
  return handleResponse(response);
}

export async function createTask(task) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return handleResponse(response);
}

export async function updateTask(id, task) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return handleResponse(response);
}

export async function deleteTask(id) {
  const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return handleResponse(response);
}
