document.addEventListener("DOMContentLoaded", function () {
  var filterButtons = document.querySelectorAll(".filter-buttons .gallery-btn");
  var categorySelect = document.getElementById("category-select");
  var shuffleInstance;

  // Hide the gallery initially
  document.getElementById("gallery").style.display = "none";

  function updateActiveClass(activeGroup) {
    filterButtons.forEach(function (button) {
      if (button.getAttribute("data-group") === activeGroup) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
    categorySelect.value = activeGroup;
  }

  function initShuffle(data, category) {
    shuffleInstance = new Shuffle(document.querySelector("#gallery"), {
      itemSelector: ".gallery-item",
    });

    categorySelect.addEventListener("change", function (event) {
      var selectedValue = event.target.value;
      shuffleInstance.filter(
        selectedValue === "all"
          ? Shuffle.ALL_ITEMS
          : function (element) {
              var groups = JSON.parse(element.getAttribute("data-groups"));
              return groups.includes(selectedValue);
            }
      );
      updateActiveClass(event.target.value);
    });

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var selectedGroup = this.getAttribute("data-group");
        shuffleInstance.filter(
          selectedGroup === "all"
            ? Shuffle.ALL_ITEMS
            : function (element) {
                var groups = JSON.parse(element.getAttribute("data-groups"));
                return groups.includes(selectedGroup);
              }
        );
        updateActiveClass(selectedGroup);
      });
    });

    // Apply default category on page load
    const defaultCategory = filterButtons[0].getAttribute("data-group");
    shuffleInstance.filter(
      defaultCategory === "all"
        ? Shuffle.ALL_ITEMS
        : function (element) {
            var groups = JSON.parse(element.getAttribute("data-groups"));
            return groups.includes(defaultCategory);
          }
    );
    updateActiveClass(defaultCategory);

    // Get the page name from the URL
    var pageName = window.location.pathname
      .split("/")
      .pop()
      .replace(".html", "");
    var capitalizedPageName =
      pageName.charAt(0).toUpperCase() + pageName.slice(1);

    // Call the function with the extracted and capitalized page name
    getDataAndPopulateGallery(data, category || capitalizedPageName);

    // Show the gallery after ShuffleJS is initialized
    document.getElementById("gallery").style.display = "block";
    document.querySelector(".footer").style.visibility = "visible";
  }
  
  // Lazy loading function
  var images = document.querySelectorAll(".lazy-load-image");

  function setLazyLoading() {
    var windowWidth = window.innerWidth;

    images.forEach(function (image) {
      if (windowWidth <= 768) {
        image.setAttribute("loading", "lazy");
      } else {
        image.removeAttribute("loading");
      }
    });
  }

  // Call the function on page load
  setLazyLoading();

  // Call the function on window resize
  window.addEventListener("resize", function () {
    setLazyLoading();
  });

  // Function to fetch data and populate the gallery
  function getDataAndPopulateGallery(data, category) {
    const categoryData = data[category];

    if (categoryData) {
      Object.keys(categoryData).forEach((occasion) => {
        const occasionData = categoryData[occasion];
        const galleryItems = document.querySelectorAll(
          `[data-groups*="${occasion}"]`
        );

        if (galleryItems.length > 0) {
          const galleryItem = galleryItems[0];
          const galleryContainer = document.createElement("div");
          galleryContainer.classList.add("gallery-container");
          galleryItem.appendChild(galleryContainer);

          occasionData.forEach((item) => {
            const galleryBox = document.createElement("div");
            galleryBox.classList.add("gallery-box");

            const galleryImg = document.createElement("div");
            galleryImg.classList.add("gallery-img");

            const img = document.createElement("img");
            img.src = item.image;
            img.alt = "gallery-image";
            img.width = "300";
            img.height = "220";

            const desc = document.createElement("div");
            desc.classList.add("desc");
            desc.textContent = item.name;

            const price = document.createElement("div");
            price.classList.add("price");
            price.textContent = item.price;

            galleryContainer.appendChild(galleryBox);
            galleryBox.appendChild(galleryImg);
            galleryImg.appendChild(img);
            galleryBox.appendChild(desc);
            galleryBox.appendChild(price);
          });
        } else {
          console.error(
            "No matching gallery item found for occasion:",
            occasion
          );
        }
      });
    } else {
      console.error("No data found for category:", category);
    }
  }

  // Fetch data from JSON file
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      // Initialize Shuffle after fetching data
      initShuffle(data);
    })
    .catch((error) => {
      console.error("Error loading data:", error);
    });
});
