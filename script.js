document.addEventListener("DOMContentLoaded", () => {
  let cartItems = [];

  // Cart elements
  const cartIcon = document.getElementById("cart-icon");
  const cartSidebar = document.getElementById("cart-sidebar");
  const closeCartBtn = document.getElementById("close-cart");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  // Badge on cart
  const badge = document.createElement("span");
  badge.id = "cart-count";
  badge.textContent = "0";
  badge.style.position = "absolute";
  badge.style.top = "0";
  badge.style.right = "0";
  badge.style.background = "red";
  badge.style.color = "white";
  badge.style.fontSize = "12px";
  badge.style.padding = "2px 5px";
  badge.style.borderRadius = "50%";
  badge.style.display = "none";
  cartIcon.style.position = "relative";
  cartIcon.appendChild(badge);

  // Handle Add to Cart
  const addToCartButtons = document.querySelectorAll(".btn");
  addToCartButtons.forEach(button => {
    if (button.textContent.includes("Add to Cart")) {
      button.addEventListener("click", (e) => {
        const product = e.target.closest(".product");
        const name = product.querySelector("h3").textContent;
        const price = parseFloat(product.querySelector(".price").textContent.replace("ZMW", "").trim());
        const imgSrc = product.querySelector("img").src;

        cartItems.push({ name, price, imgSrc });
        renderCart();
      });
    }
  });

  // Handle Buy Now
  const buyNowButtons = document.querySelectorAll(".btn");
  buyNowButtons.forEach(button => {
    if (button.textContent.includes("Buy Now")) {
      button.addEventListener("click", (e) => {
        const product = e.target.closest(".product");
        const price = parseFloat(product.querySelector(".price").textContent.replace("ZMW", "").trim());

        localStorage.setItem("checkoutTotal", price);
        window.location.href = "checkout.html";
      });
    }
  });

  // Render Cart
  function renderCart() {
    cartItemsContainer.innerHTML = "";
    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      badge.style.display = "none";
    } else {
      cartItems.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
          <img src="${item.imgSrc}" alt="${item.name}">
          <div class="cart-item-details">
            <strong>${item.name}</strong><br>
            ZMW ${item.price.toFixed(2)}
          </div>
          <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(div);
      });

      // Add event listener for remove buttons
      document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const index = e.target.getAttribute("data-index");
          cartItems.splice(index, 1);
          renderCart();
        });
      });

      badge.textContent = cartItems.length;
      badge.style.display = "inline-block";
    }

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    cartTotalEl.textContent = total.toFixed(2);
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

  // Checkout button (from cart)
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cartItems.length === 0) {
        alert("Your cart is empty.");
        return;
      }
      const total = cartItems.reduce((sum, item) => sum + item.price, 0);
      localStorage.setItem("checkoutTotal", total.toFixed(2));
      window.location.href = "checkout.html";
    });
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




