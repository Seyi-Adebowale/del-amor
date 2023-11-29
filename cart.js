// Your cart array to store items
let cart = [];

function initializeCart() {
  loadCartFromLocalStorage(); // Initialize the cart from local storage
  updateCartCounter(); // Update the cart counter
}

// Function to open the cart modal
function openCartModal() {
  const cartModal = document.getElementById("cart-modal");
  cartModal.classList.add("open");
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
    });
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
      cartMessage.style.display = "none"; // Hide the message when there are items in the cart
      checkoutButton.style.display = "block"; // Show the checkout button
      clearCartButton.style.display = "block"; // Show the clear cart button
    } else {
      cartCounter.textContent = "0";
      cartMessage.style.display = "block"; // Display the message when the cart is empty
      checkoutButton.style.display = "none"; // Hide the checkout button
      clearCartButton.style.display = "none"; // Hide the clear cart button

      // Clear local storage when the cart is empty
      localStorage.removeItem("cart");
    }
  }
}

// Function to update the cart items list
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
    totalCartPriceElement.innerHTML = `<p>Total: ₦${totalCartPrice}</p>`;
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

window.addEventListener("load", initializeCart);
