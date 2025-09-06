let cart = [];

// Add to Cart
function addToCart(productName, price) {
  cart.push({ name: productName, price: price });
  updateCartCount();
  openCart(); // auto-open cart when adding
}

// Update Cart Count in Navbar
function updateCartCount() {
  document.getElementById("cartCount").innerText = cart.length;
}

// Open Cart Modal
function openCart() {
  let cartModal = document.getElementById("cartModal");
  let cartItemsContainer = document.getElementById("cartItems");

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price;
      cartItemsContainer.innerHTML += `
        <div class="cart-item">
          <span>${item.name} - $${item.price}</span>
          <button onclick="removeFromCart(${index})">Remove</button>
        </div>
      `;
    });

    cartItemsContainer.innerHTML += `
      <hr>
      <p><strong>Total: $${total}</strong></p>
    `;
  }

  cartModal.style.display = "block";
}

// Close Cart
function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

// Remove Item
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  openCart(); // refresh cart
}

// Buy Now
function buyNow(productName, price) {
  let paymentMethod = prompt(
    `You selected ${productName} ($${price}).\nChoose payment method: Card or Mobile Money`
  );

  if (paymentMethod) {
    alert(`Redirecting to secure ${paymentMethod} payment for ${productName}.`);
  }
}

// Checkout (from Cart)
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let total = cart.reduce((sum, item) => sum + item.price, 0);
  alert(`Proceeding to checkout.\nTotal Amount: $${total}`);

  cart = [];
  updateCartCount();
  closeCart();
}

// Contact Form Submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;

  if (name && email && message) {
    alert("Thank you, " + name + "! Your message has been sent.");
    document.getElementById("contactForm").reset();
  } else {
    alert("Please fill in all fields.");
  }
});

