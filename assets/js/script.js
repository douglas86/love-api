import { API_KEY } from "./keys.js";

fetch(`https://ci-jshint.herokuapp.com/api?api_key=${API_KEY}`)
  .then((response) => response.text())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
