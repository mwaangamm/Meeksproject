document.addEventListener("DOMContentLoaded", () => {
  let cartCount = 0;
  let cartTotal = 0;
  let cartItems = [];

  // Cart elements
  const cartIcon = document.getElementById("cart-icon");
  const cartSidebar = document.getElementById("cart-sidebar");
  const closeCartBtn = document.getElementById("close-cart");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");

  // Badge
  const badge = document.createElement("span");
  badge.id = "cart-count";
  badge.textContent = cartCount;
  cartIcon.style.position = "relative";
  cartIcon.appendChild(badge);

  // Add to Cart
  const cartButtons = document.querySelectorAll(".btn");
  cartButtons.forEach(button => {
    if (button.textContent.includes("Add to Cart")) {
      button.addEventListener("click", (e) => {
        const product = e.target.closest(".product");
        const name = product.querySelector("h3").textContent;
        const price = (Math.random() * 200 + 50).toFixed(2); // Mock price in ZMW
        const imgSrc = product.querySelector("img").src;

        cartCount++;
        cartTotal += parseFloat(price);
        badge.textContent = cartCount;
        badge.style.display = "inline-block";

        cartItems.push({ name, price, imgSrc });
        renderCart();
      });
    }
  });

  // Render Cart Items
  function renderCart() {
    cartItemsContainer.innerHTML = "";
    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      cartItems.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
          <img src="${item.imgSrc}" alt="${item.name}">
          <div class="cart-item-details">
            <strong>${item.name}</strong><br>
            ZMW ${item.price}
          </div>
          <button class="remove-item" data-index="${index}">❌</button>
        `;
        cartItemsContainer.appendChild(div);
      });

      // Remove item event
      document.querySelectorAll(".remove-item").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const index = e.target.dataset.index;
          cartTotal -= parseFloat(cartItems[index].price);
          cartItems.splice(index, 1);
          cartCount--;
          badge.textContent = cartCount;
          if (cartCount === 0) badge.style.display = "none";
          renderCart();
        });
      });
    }
    cartTotalEl.textContent = cartTotal.toFixed(2);
  }

  // Open cart
  cartIcon.addEventListener("click", (e) => {
    e.preventDefault();
    cartSidebar.classList.add("active");
  });

  // Close cart
  closeCartBtn.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
  });

  // Checkout Modal
  const checkoutBtn = document.getElementById("checkout-btn");
  checkoutBtn.addEventListener("click", () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    document.getElementById("checkout-modal").style.display = "flex";
  });

  // Payment method selection
  document.getElementById("pay-mobile").addEventListener("click", () => {
    alert("You selected Mobile Money. Payment coming soon...");
    closeCheckoutModal();
  });

  document.getElementById("pay-card").addEventListener("click", () => {
    alert("You selected Card Payment. Payment coming soon...");
    closeCheckoutModal();
  });

  document.getElementById("close-checkout").addEventListener("click", closeCheckoutModal);

  function closeCheckoutModal() {
    document.getElementById("checkout-modal").style.display = "none";
  }

  // Contact form
  const contactForm = document.querySelector("form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you! Your message has been sent.");
      contactForm.reset();
    });
  }
});

