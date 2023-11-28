document.addEventListener("DOMContentLoaded", function () {
  const productId = getProductIdFromUrl();
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      displayProductDetails(data, productId);
    })
    .catch((error) => {
      console.error("Error loading data:", error);
    });

    function getProductIdFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("productId");
    }
    
  
    function findProductById(data, productId) {
      for (const categoryKey in data) {
        if (data.hasOwnProperty(categoryKey)) {
          const category = data[categoryKey];
    
          if (Array.isArray(category)) {
            // Handle case where category is an array
            const product = category.find((item) => item.id && item.id == productId);
            if (product) {
              return product;
            }
          } else if (typeof category === 'object') {
            // Handle case where category is an object with occasions
            for (const occasionKey in category) {
              if (category.hasOwnProperty(occasionKey)) {
                const occasion = category[occasionKey];
                if (Array.isArray(occasion)) {
                  const product = occasion.find((item) => item.id && item.id == productId);
                  if (product) {
                    return product;
                  }
                }
              }
            }
          }
        }
      }
      return null;
    }
    
  function displayProductDetails(data, productId) {
    const product = findProductById(data, productId);
    if (product) {
      const productImage = document.getElementById("product-image");
      const productName = document.getElementById("product-name");
      const productDescription = document.getElementById("product-description");
      const productPrice = document.getElementById("product-price");
      const counterValue = document.getElementById("counter-value");

      productImage.src = product.image;
      productImage.alt = product.name;
      productName.textContent = product.name;
      productDescription.textContent = product.description;
      productPrice.textContent = `N ${product.price}`;

      let counter = 0;
      const incrementBtn = document.getElementById("increment-btn");
      const decrementBtn = document.getElementById("decrement-btn");

      incrementBtn.addEventListener("click", () => {
        counter++;
        counterValue.textContent = counter;
      });

      decrementBtn.addEventListener("click", () => {
        counter--;
        if (counter < 0) counter = 0;
        counterValue.textContent = counter;
      });
    } else {
      console.error("Product not found");
    }
  }
});