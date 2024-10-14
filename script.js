const accessKey = "1WOgdsCEnM6eGIPSHa9TZwURbBruD2_FkiJz69P-wlw";
const searchForm = document.querySelector("form");
const imagesContainer = document.querySelector(".images-container");
const searchInput = document.querySelector(".search-input");
const loadMoreBtn = document.querySelector(".loadMoreBtn");
let page = 1;

// Function to fetch images using Unsplash API
const fetchImages = async (query, pageNo) => {
  try {
    // Clear container if it's the first page
    if (pageNo === 1) {
      imagesContainer.innerHTML = "";
    }

    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;
    console.log(url);

    const response = await fetch(url);
    const data = await response.json();

    // Check if any results are returned
    if (data.results.length > 0) {
      data.results.forEach((photo) => {
        // Create image div
        const imageElement = document.createElement("div");
        imageElement.classList.add("imageDiv");
        imageElement.innerHTML = `<img src="${photo.urls.regular}" alt="${photo.alt_description}"/>`;

        // Create overlay
        const overlayElement = document.createElement("div");
        overlayElement.classList.add("overlay");

        // Create overlay text
        const overlayText = document.createElement("h3");
        overlayText.innerText = photo.alt_description || "No description available";
        overlayElement.appendChild(overlayText);

        // Append overlay to image div
        imageElement.appendChild(overlayElement);
        imagesContainer.appendChild(imageElement);
      });

      // Show or hide load more button based on total pages
      if (data.total_pages === pageNo) {
        loadMoreBtn.style.display = "none";
      } else {
        loadMoreBtn.style.display = "block";
      }
    } else {
      imagesContainer.innerHTML = `<h2>No images found.</h2>`;
    }
  } catch (error) {
    imagesContainer.innerHTML = `<h2>Failed to fetch images.</h2>`;
  }
};

// Event listener for the search form submission
searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent auto-submit

  const inputText = searchInput.value.trim();
  if (inputText !== "") {
    page = 1;
    fetchImages(inputText, page);
  } else {
    imagesContainer.innerHTML = `<h2>Please enter a search query.</h2>`;
    loadMoreBtn.style.display = "none";
  }
});

// Event listener for the load more button
loadMoreBtn.addEventListener("click", () => {
  fetchImages(searchInput.value.trim(), ++page);
});