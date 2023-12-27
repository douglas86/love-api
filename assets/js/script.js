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

  const data = await response.json();

  if (response.ok) {
    displayErrors(data);
  } else {
    throw new Error(data.error);
  }
}

function displayErrors(data) {
  let heading = `JSHint Results for ${data.file}`;
  let results;

  if (data.total_errors === 0) {
    results = `<div class='no_errors'>No errors reported!</div>`;
  } else {
    results = `<div>Total Errors: <span class="error_count">${data.total_errors}</span>`;
    for (let error of data.error_list) {
      results += `<div>At line <span class="line">${error.line}</span>, `;
      results += `column <span class='column'>${error.col}</span></div>`;
      results += `<div class='error'>${error.error}</div>`;
    }
  }

  document.getElementById("resultsModalTitle").innerText = heading;
  document.getElementById("results-content").innerHTML = results;

  resultsModal.show();
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
