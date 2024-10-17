// https://dog.ceo/api/breed/eskimo/images/random
// https://dog.ceo/api/breeds/list/all

import Options from "./components/Option";
import SingleCarousel from "./components/SingleCarousel";

const BASE_URL = `https://dog.ceo/api/`;

const carouselContainerEl = document.querySelector(".carousel-inner");
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

async function getDogsImages(breed) {
  try {
    const res = await fetch(`${BASE_URL}breed/${breed}/images`);
    const data = await res.json();
    return data.message.slice(0, 10);
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

async function renderImageCarousel(breed) {
  carouselContainerEl.innerHTML = "";
  const data = await getDogsImages(breed);
  const fragment = document.createDocumentFragment();
  data.forEach((link) => {
    fragment.appendChild(SingleCarousel(link,idx === 0));
  });
  carouselContainerEl.appendChild(fragment);
}
renderImageCarousel("poodle");

breedListEl.addEventListener("change", async (e) => {
  const currentValue = e.target.value;
  renderImageCarousel(currentValue);
});

document.addEventListener("DOMContentLoaded", () => {
  renderSelect();
});
