// https://dog.ceo/api/breed/eskimo/images/random
// https://dog.ceo/api/breeds/list/all
import Options from "./components/Option"

const BASE_URL = `https://dog.ceo/api/`;

const imgEl = document.querySelector("img");
const breedListEl = document.querySelector("#data-breed-list");

function getDogsList() {
  return fetch(`${BASE_URL}breeds/list/all`)
    .then((res) => res.json())
    .then((data) => data.message)
    .catch((err) => console.log("error occ", err));
}
getDogsList();

function getDogsImage(breed) {}

function renderSelect() {
  getDogsList().then((breedList) => {
    for (let breed in breedList) {
      breedListEl.appendChild(Options(breed))
    }
  });
}
renderSelect();

function renderImage() {}

