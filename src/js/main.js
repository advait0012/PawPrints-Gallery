// https://dog.ceo/api/breed/eskimo/images/random
// https://dog.ceo/api/breeds/list/all

import Options from "./components/Option";

const BASE_URL = `https://dog.ceo/api/`;

const imageEl = document.querySelector("img");
const breedListEl = document.querySelector("#data-breed-list");

async function getDogsList() {
  try {
    const res = await fetch(`${BASE_URL}breeds/list/all`);
    const data = await res.json();
    return data.message;
  } catch (err) {
    return console.error("error occured", err);
  }
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
  Object.keys(dogsList).forEach((dogName) => {
    breedListEl.appendChild(Options(dogName));
  });
}

async function renderImage(breed) {
  const dogsImage = await getDogsImage(breed);
  imageEl.src = dogsImage;
}

renderImage("poodle");

renderSelect();

breedListEl.addEventListener("change",async (e)=>{
  const currentValue = e.target.value
  renderImage(currentValue)
  
})