import { keys } from "./keys.js";

// environment variables
const { api_key, api_url } = keys;

const resultsModal = new bootstrap.Modal(
  document.getElementById("resultsModal"),
);

document
  .getElementById("status")
  .addEventListener("click", (e) => getStatus(e));

async function getStatus(e) {
  const queryString = `${api_url}?api_key=${api_key}`;
  const response = await fetch(queryString);
  const data = await response.json();

  if (response.ok) {
    console.log(data.expiry);
  } else {
    throw new Error(data.error);
  }
}
