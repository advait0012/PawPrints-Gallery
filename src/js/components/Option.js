export default function (breed) {
  const option = document.createElement("option");
  option.textContent = breed;
  option.value = breed;
  return option;
}
