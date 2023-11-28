document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("gallery").style.display = "none";

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      var pageName = window.location.pathname
        .split("/")
        .pop()
        .replace(".html", "");
      var categoryToFetch =
        pageName.charAt(0).toUpperCase() + pageName.slice(1);

      getDataAndPopulateGallery(data, categoryToFetch);

      document.getElementById("gallery").style.display = "block";

      document.querySelector(".footer").style.visibility = "visible";
    })
    .catch((error) => {
      console.error("Error loading data:", error);
    });

  function getDataAndPopulateGallery(data, category) {
    const categoryData = data[category];

    if (categoryData) {
      const galleryContainer = document.createElement("div");
      galleryContainer.classList.add("gallery-container");
      document.getElementById("gallery").appendChild(galleryContainer);

      categoryData.forEach((item) => {
        const galleryBox = document.createElement("div");
        galleryBox.classList.add("gallery-box");
        galleryBox.dataset.productId = item.id; // Add data-product-id attribute

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

        // Add click event listener to each product item
        galleryBox.addEventListener("click", function () {
          // Get the product ID from the clicked item
          const productId = this.dataset.productId;

          // Navigate to the product.html page with the product ID as a parameter
          window.location.href = `product.html?productId=${productId}`;
        });
      });
    } else {
      console.error("No data found for category:", category);
    }
  }
});
