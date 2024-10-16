// https://dog.ceo/api/breed/eskimo/images/random
// https://dog.ceo/api/breeds/list/all

import Options from "./components/Option";

const BASE_URL = `https://dog.ceo/api/`;

const imageEl = document.querySelector("img");
const breedListEl = document.querySelector("#data-breed-list");

async function getDogsList() {
  let breeds = JSON.parse(localStorage.getItem("breeds"));

  if (!breeds) {
    try {
      const res = await fetch(`${BASE_URL}breeds/list/all`);
      const data = await res.json();
      localStorage.setItem("breeds", JSON.stringify(data.message));
      breeds = data.message;
    } catch (err) {
      console.error("Error occured", err);
    }
  }

  return breeds;
}

getDogsList();

async function getDogsImage(breed) {
  try {
    const res = await fetch(`${BASE_URL}breed/${breed}/images/random`);
    const data = await res.json();
    return data.message;
  } catch (error) {
    return console.error(error);
  }
}

async function renderSelect() {
  const dogsList = await getDogsList();
  const fragment = document.createDocumentFragment();
  Object.keys(dogsList).forEach((dogName) => {
    fragment.appendChild(Options(dogName));
  });
  breedListEl.appendChild(fragment);
}

async function renderImage(breed) {
  imageEl.src = "lg.gif";
  const dogsImage = await getDogsImage(breed);
  imageEl.src = dogsImage;
  imageEl.alt = breed;
}

breedListEl.addEventListener("change", async (e) => {
  const currentValue = e.target.value;
  renderImage(currentValue);
});

document.addEventListener("DOMContentLoaded", () => {
  renderSelect();
});
