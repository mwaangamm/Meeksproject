let cart = [];
let total = 0;

function updateCartCount() {
  const badge = document.getElementById("cart-count");
  badge.textContent = cart.length;
  badge.style.display = cart.length > 0 ? "inline-block" : "none";
}

function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  updateCartCount();
  renderCart();
}

function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  updateCartCount();
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    let li = document.createElement("li");
    li.classList.add("cart-item");
    li.innerHTML = `
      ${item.name} - ZMW ${item.price.toFixed(2)}
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItems.appendChild(li);
  });
  document.getElementById("cart-total").textContent = total.toFixed(2);
}

// Sidebar open/close
document.getElementById("cart-icon").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("cart-sidebar").classList.add("active");
});

document.getElementById("close-cart").addEventListener("click", () => {
  document.getElementById("cart-sidebar").classList.remove("active");
});

// Add to Cart & Buy Now
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);
    addToCart(name, price);
  });
});

document.querySelectorAll(".buy-now").forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);
    addToCart(name, price);
    document.getElementById("checkout-btn").click();
  });
});



