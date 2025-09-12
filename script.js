document.addEventListener("DOMContentLoaded", () => {
  let cartCount = 0;
  let cartTotal = 0;
  let cartItems = [];

  // Elements
  const cartIcon = document.getElementById("cart-icon");
  const cartSidebar = document.getElementById("cart-sidebar");
  const closeCartBtn = document.getElementById("close-cart");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  // Badge
  const badge = document.createElement("span");
  badge.id = "cart-count";
  badge.textContent = cartCount;
  badge.style.position = "absolute";
  badge.style.top = "-5px";
  badge.style.right = "-10px";
  badge.style.background = "red";
  badge.style.color = "white";
  badge.style.fontSize = "12px";
  badge.style.padding = "2px 6px";
  badge.style.borderRadius = "50%";
  badge.style.display = "none";
  cartIcon.appendChild(badge);

  // Add to Cart
  document.querySelectorAll(".add-cart").forEach(button => {
    button.addEventListener("click", (e) => {
      const product = e.target.closest(".product");
      const name = product.querySelector("h3").textContent;
      const price = parseFloat(product.querySelector(".price").dataset.price);
      const imgSrc = product.querySelector("img").src;

      cartCount++;
      cartTotal += price;
      badge.textContent = cartCount;
      badge.style.display = "inline-block";

      cartItems.push({ name, price, imgSrc });
      renderCart();
    });
  });

  // Buy Now
  document.querySelectorAll(".buy-now").forEach(button => {
    button.addEventListener("click", (e) => {
      const product = e.target.closest(".product");
      const name = product.querySelector("h3").textContent;
      const price = parseFloat(product.querySelector(".price").dataset.price);

      openCheckout([{ name, price }]); // Checkout only this item
    });
  });

  // Render Cart
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

      // Remove item
      document.querySelectorAll(".remove-item").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const index = e.target.dataset.index;
          cartTotal -= cartItems[index].price;
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

  // Checkout from cart
  checkoutBtn.addEventListener("click", () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    openCheckout(cartItems);
  });

  // Checkout modal functions
  function openCheckout(items) {
    let total = items.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("checkout-total").textContent = total.toFixed(2);
    document.getElementById("checkout-modal").style.display = "flex";
  }

  document.getElementById("pay-mobile").addEventListener("click", () => {
    alert("You selected Mobile Money. Payment integration coming soon...");
    closeCheckoutModal();
  });

  document.getElementById("pay-card").addEventListener("click", () => {
    alert("You selected Card Payment. Payment integration coming soon...");
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

