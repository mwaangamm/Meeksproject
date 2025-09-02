let cart = [];

// Add to cart
function addToCart(product, price) {
  cart.push({ product, price });
  updateCart();
  alert(`${product} added to cart`);
}

// Update cart count & total
function updateCart() {
  document.getElementById("cartCount").innerText = cart.length;
}

// Show Cart Modal
function showCart() {
  let cartItems = document.getElementById("cartItems");
  let cartTotal = document.getElementById("cartTotal");
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    let li = document.createElement("li");
    li.innerText = `${item.product} - $${item.price}`;
    cartItems.appendChild(li);
    total += item.price;
  });
  cartTotal.innerText = total;
  document.getElementById("cartModal").style.display = "block";
}

// Close Cart
function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

// Checkout
function checkout() {
  alert("Proceeding to checkout...");
  cart = [];
  updateCart();
  closeCart();
}

// Buy Now Modal
function buyNow(product, price) {
  document.getElementById("buyNowItem").innerText = `${product} - $${price}`;
  document.getElementById("buyNowModal").style.display = "block";
}

// Close Buy Now
function closeBuyNow() {
  document.getElementById("buyNowModal").style.display = "none";
}

// Confirm Payment
function confirmPayment() {
  alert("Payment successful! Thank you for your purchase.");
  closeBuyNow();
}

// Handle Contact Form
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let name = document.getElementById("name").value;
  alert(`Thank you, ${name}! Your message has been received.`);
  document.getElementById("contactForm").reset();
});
