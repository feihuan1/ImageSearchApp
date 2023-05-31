const accessKey = "CO2Du81Y8ryRymZetqXm3e1vVz0NHzdMR9tA82mxtz4";

const formEl = document.querySelector("form");
const searchInputEl = document.querySelector("#search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.querySelector("#show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = searchInputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
  const response = await fetch(url);
  const data = await response.json();
  if (page === 1) {
    searchResultsEl.innerHTML = "";
  }
  const results = data.results;
  results.map((result) => {
    const imageWapper = document.createElement("div");
    imageWapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;
    imageWapper.append(image);
    imageWapper.append(imageLink);
    searchResultsEl.append(imageWapper);
  });

  results.length && page++;

  page > 1
    ? (showMoreButtonEl.style.display = "block")
    : (showMoreButtonEl.style.display = "none");
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMoreButtonEl.addEventListener("click", () => {
  searchImages();
});
