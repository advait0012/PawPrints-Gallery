export default function SingleCarousel(src, active = false) {
  const div = document.createElement("div");
  div.classList.add("carousel-item", `${active && "active"}`);
  div.innerHTML = `<img
      src="${src}"
      class="d-block w-100 rounded"
      alt="dogname"
    />`;
  return div;
}
