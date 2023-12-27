import { keys } from "./keys.js";

// environment variables
const { api_key, api_url } = keys;

const resultsModal = new bootstrap.Modal(
  document.getElementById("resultsModal"),
);

document
  .getElementById("status")
  .addEventListener("click", (e) => getStatus(e));
document.getElementById("submit").addEventListener("click", (e) => postForm(e));

async function postForm(e) {
  const form = new FormData(document.getElementById("checksform"));

  const response = await fetch(api_url, {
    method: "POST",
    headers: {
      Authorization: api_key,
    },
    body: form,
  });
}

async function getStatus(e) {
  const queryString = `${api_url}?api_key=${api_key}`;
  const response = await fetch(queryString);
  const data = await response.json();

  if (response.ok) {
    displayStatus(data);
  } else {
    throw new Error(data.error);
  }
}

function displayStatus(data) {
  let heading = "API Key Status";
  let results = `<div>Your key is valid until</div>`;
  results += `<div class='key-status'>${data.expiry}</div>`;

  document.getElementById("resultsModalTitle").innerText = heading;
  document.getElementById("results-content").innerHTML = results;

  resultsModal.show();
}
