// Load checkout total from localStorage
document.addEventListener("DOMContentLoaded", () => {
  const total = localStorage.getItem("checkoutTotal") || 0;
  document.getElementById("checkout-total").textContent = total;

  // Handle payment buttons
  document.getElementById("pay-mobile").addEventListener("click", () => {
    alert("Redirecting to Mobile Money payment...");
  });

  document.getElementById("pay-card").addEventListener("click", () => {
    alert("Redirecting to Card payment...");
  });
});
