// Your cart array to store items
let cart = [];
let currentCategory = null;
let currentOccasion = null;

function initializeCart() {
  loadCartFromLocalStorage(); // Initialize the cart from local storage
  updateCartCounter(); // Update the cart counter
}


// Function to open the cart modal
function openCartModal() {
  const cartModal = document.getElementById("cart-modal");
  cartModal.classList.add("open");

  // Call populateOtherItemsList with the category and occasion from the most recently added item
  const mostRecentItem = cart[cart.length - 1];
  const category = mostRecentItem.category;
  const occasion = mostRecentItem.occasion;
  populateOtherItemsList(category, occasion);

  // Update the cart items list
  updateCartItemsList();
}

// Function to close the cart modal
function closeCartModal() {
  const cartModal = document.getElementById("cart-modal");
  cartModal.classList.remove("open");
}

// Function to add items to the cart
function addToCart() {
  const productId = document.getElementById("product-id").textContent;
  const productName = document.getElementById("product-name").textContent;
  const productPriceElement = document.getElementById("product-price");
  const productCategoryElement =
    document.getElementById("product-category").textContent;
  const productOccasionElement =
    document.getElementById("product-occasion").textContent;

  const priceString = productPriceElement.textContent.replace(/[^\d.]/g, "");

  const productPrice = parseFloat(priceString);

  const quantity = parseInt(
    document.getElementById("counter-value").textContent
  );
  const productImage = document.getElementById("product-image").src;

  // Check if quantity is greater than 0
  if (quantity === 0) {
    alert("Please select a quantity greater than 0.");
    return; // Don't add to cart if quantity is 0
  }

  // Check if the product is already in the cart
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    // If the product is already in the cart, update the quantity
    existingItem.quantity += quantity;
  } else {
    // If the product is not in the cart, add it as a new item
    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: quantity,
      category: productCategoryElement,
      occasion: productOccasionElement,
    });
    currentCategory = productCategoryElement;
    currentOccasion = productOccasionElement;
  }

  // Update the cart counter, cart display, and save the cart to local storage
  updateCartCounter();
  updateCartItemsList();
  saveCartToLocalStorage();

}

// Function to increase quantity
function increaseQuantity(productName) {
  const item = cart.find((item) => item.name === productName);
  if (item) {
    item.quantity += 1;
    updateCartItemsList();
    updateCartCounter();
  }
}

// Function to decrease quantity
function decreaseQuantity(productName) {
  const item = cart.find((item) => item.name === productName);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
    updateCartItemsList();
    updateCartCounter();
  }
}

// Function to remove a product from the cart
function removeProduct(productName) {
  const itemIndex = cart.findIndex((item) => item.name === productName);
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
    updateCartItemsList();
    updateCartCounter();
  }
}

// Function to clear the entire cart
function clearCart() {
  cart.length = 0;
  updateCartItemsList();
  updateCartCounter();
}

// Function to update the cart counter
function updateCartCounter() {
  const cartCounter = document.getElementById("cart-counter");
  const cartMessage = document.getElementById("cart-message"); // Adjust the ID based on your HTML
  const checkoutButton = document.getElementById("checkout-button"); // Adjust the ID based on your HTML
  const clearCartButton = document.getElementById("clear-cart-button"); // Adjust the ID based on your HTML

  if (cartCounter && cartMessage && checkoutButton && clearCartButton) {
    const numberOfItemsInCart = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    if (numberOfItemsInCart > 0) {
      cartCounter.textContent = numberOfItemsInCart.toString();
      cartMessage.style.display = "none";
      checkoutButton.style.display = "block"; 
      clearCartButton.style.display = "block"; 
    } else {
      cartCounter.textContent = "0";
      cartMessage.style.display = "block"; 
      checkoutButton.style.display = "none"; 
      clearCartButton.style.display = "none"; 

      // Clear local storage when the cart is empty
      localStorage.removeItem("cart");
    }
  }
}

// Function to update the cart items list
function updateCartItemsList() {
  const cartItemsList = document.getElementById("cart-items-list");
  // Clear previous content
  cartItemsList.innerHTML = "";

  let totalCartPrice = 0;

  // Display each item in the cart
  cart.forEach((item) => {
    const listItem = document.createElement("li");
    const individualPrice = item.price * item.quantity;
    totalCartPrice += individualPrice;

    listItem.innerHTML = `
      <div class="cart-item-left">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image" onclick="openProductPage('${item.id}')">
      </div>
      <div class="cart-item-details">
        <p>${item.name}</p>
        <p class="small-text">Category: ${item.category}</p>
        <p class="small-text">Occasion: ${item.occasion}</p>
        <div class="quantity-controls">
          <button class="quantity-button" onclick="decreaseQuantity('${item.name}')">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-button" onclick="increaseQuantity('${item.name}')">+</button>
        </div>
      </div>
      <div class="cart-item-right">
        <div class="cart-item-price">₦${individualPrice}</div>
        <div class="remove-btn">
            <button class="remove-button" onclick="removeProduct('${item.name}')">
            <i class="fas fa-trash-alt"></i>
            </button>
        </div>
      </div>
    `;
    cartItemsList.appendChild(listItem);
  });

  // Display total cart price
  if (cart.length > 0) {
    // Display total cart price
    const totalCartPriceElement = document.createElement("div");
    totalCartPriceElement.classList.add("total-price"); // Add this line to assign a class
    totalCartPriceElement.innerHTML = `<p>Total: ₦${totalCartPrice.toFixed(
      2
    )}</p>`;
    cartItemsList.appendChild(totalCartPriceElement);
  }
}

// Function to open the product page based on item ID
function openProductPage(productId) {
  // Replace this with the actual URL structure for your product pages
  const productPageUrl = `product.html?productId=${productId}`;
  window.location.href = productPageUrl;
}

// Function to save the cart to local storage
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to load the cart from local storage
function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartCounter(); // Update the cart counter after loading
  }
}

// Function to populate other items list based on category and occasion
function populateOtherItemsList(category, occasion) {
  const otherItemsList = document.getElementById("other-items-list");
  // Clear previous content
  otherItemsList.innerHTML = "";

  // Get the array of items based on the category
  const itemsInCategory = data[category];

  // Check if itemsInCategory is not undefined
  if (itemsInCategory) {
    if (occasion) {
      // If occasion is specified, directly access the array based on occasion
      const occasionItems = itemsInCategory[occasion];
      if (occasionItems) {
        displayItems(occasionItems, otherItemsList);
      }
    } else {
      // If no occasion is specified, display all items in the category
      // Convert the object values to an array and display
      const allItems = Object.values(itemsInCategory).flat();
      displayItems(allItems, otherItemsList);
    }
  }
}

// Helper function to display items in the list
function displayItems(items, container) {
  // Display each item in the other items list
  items.forEach((item) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" onclick="openProductPage('${item.id}')">
      <p>${item.name}</p>
      <p class="other-price">₦${item.price}</p>
      <p class="hide">${item.category}</p>
      <p class="hide">${item.occasion}</p>
      <button onclick="addToCartFromOtherItems('${item.id}', '${item.category}','${item.occasion}')">Add to Cart</button>
    `;

    container.appendChild(listItem);
  });
}

function addToCartFromOtherItems(itemId, category, occasion) {
  // Check if data[category] exists
  if (data[category]) {
    // If it's an array, directly find the item
    if (Array.isArray(data[category])) {
      const selectedItem = data[category].find(
        (item) => item.id === parseInt(itemId)
      );
      handleSelectedItem(selectedItem);
    } else if (typeof data[category] === "object") {
      // If it's an object, navigate deeper into the structure
      // Assuming each subcategory has an array of items
      const subcategories = Object.keys(data[category]);
      for (const subcategory of subcategories) {
        const selectedItem = data[category][subcategory].find(
          (item) => item.id === parseInt(itemId)
        );
        if (selectedItem) {
          handleSelectedItem(selectedItem);
          break; // Exit the loop if the item is found
        }
      }
    } else {
      console.error(`Invalid data structure for category ${category}.`);
    }
  } else {
    console.error(`Category ${category} not found.`);
  }

  function handleSelectedItem(selectedItem) {
    if (selectedItem) {
      // Check if the item is already in the cart based on the id
      const existingItem = cart.find((item) => item.id === selectedItem.id);

      if (existingItem) {
        // If the item is already in the cart, update the quantity
        existingItem.quantity += 1;
      } else {
        // If the item is not in the cart, add it as a new item
        cart.push({
          id: selectedItem.id,
          name: selectedItem.name,
          price: selectedItem.price,
          image: selectedItem.image,
          quantity: 1,
          category: category,
          occasion: occasion,
        });
      }

      // Update the cart counter, cart display, and save the cart to local storage
      updateCartCounter();
      updateCartItemsList();
      saveCartToLocalStorage();
    } else {
      console.error(
        `Item with ID ${itemId} not found in category ${category}.`
      );
    }
  }
}

let data; // Declare the data variable

// Function to fetch data from the JSON file
async function fetchData() {
  try {
    const response = await fetch("data.json"); // Replace with the correct path
    data = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call the fetchData function when the window loads
window.addEventListener("load", () => {
  fetchData();
  initializeCart();
});
