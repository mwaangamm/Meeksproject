document.addEventListener("DOMContentLoaded", () => {
  const checkoutTotalEl = document.getElementById("checkout-total");
  const cardForm = document.getElementById("card-form");
  const backBtn = document.getElementById("back-btn");

  // Load total from localStorage
  const total = localStorage.getItem("checkoutTotal") || 0;
  checkoutTotalEl.textContent = total;

  // Handle Card Payment form submission
  cardForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("card-name").value.trim();
    const number = document.getElementById("card-number").value.trim();
    const expiry = document.getElementById("expiry").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    if (!name || !number || !expiry || !cvv) {
      alert("Please fill in all fields.");
      return;
    }

    alert("Payment successful!\n\nAmount: ZMW " + total + "\nThank you for your purchase.");
    cardForm.reset();
  });

  // Back button → return to index.html
  backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});

// Open Checkout
document.getElementById("checkout-btn").addEventListener("click", function () {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  document.getElementById("checkout-modal").style.display = "flex";
  document.getElementById("checkout-total").textContent = total.toFixed(2);
});

// Close Checkout
document.getElementById("close-checkout").addEventListener("click", function () {
  document.getElementById("checkout-modal").style.display = "none";
});

// Submit Payment
document.getElementById("card-form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Payment processing... (demo only)");
  document.getElementById("checkout-modal").style.display = "none";
  cart = [];
  total = 0;
  updateCartCount();
  renderCart();
});
