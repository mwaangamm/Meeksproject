document.addEventListener("DOMContentLoaded", () => {
  let cartCount = 0;
  let cartTotal = 0;
  const cartItems = [];

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

  // Handle Add to Cart
  const cartButtons = document.querySelectorAll(".btn");
  cartButtons.forEach(button => {
    if (button.textContent.includes("Add to Cart")) {
      button.addEventListener("click", (e) => {
        const product = e.target.closest(".product");
        const name = product.querySelector("h3").textContent;
        const priceText = product.querySelector(".price").textContent.replace("ZMW", "").trim();
        const price = parseFloat(priceText);

        const imgSrc = product.querySelector("img").src;

        // Update cart
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
      cartItems.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
          <img src="${item.imgSrc}" alt="${item.name}">
          <div class="cart-item-details">
            <strong>${item.name}</strong><br>
            $${item.price}
          </div>
        `;
        cartItemsContainer.appendChild(div);
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

  // ✅ Buy Now (direct checkout with one product)
  const buyNowButtons = document.querySelectorAll(".btn");
  buyNowButtons.forEach(button => {
    if (button.textContent.includes("Buy Now")) {
      button.addEventListener("click", (e) => {
        const product = e.target.closest(".product");
        const name = product.querySelector("h3").textContent;
        const priceText = product.querySelector(".price").textContent.replace("ZMW", "").trim();
        const price = parseFloat(priceText);
      
      });
    }
  });

  // ✅ Checkout (for all cart items)
  window.checkout = function () {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    let items = cartItems.map(item => `${item.name} - ZMW ${item.price}`).join("\n");
    let total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

              alert(
                    "Checkout:\n\n" + items +
                    "\n\nTotal: ZMW " + total.toFixed(2) +
                    "\n\nPayment widget here (Card / Mobile Money)."
          );


    // Clear cart after checkout
    cartItems.length = 0;
    cartCount = 0;
    cartTotal = 0;
    badge.textContent = cartCount;
    renderCart();
  };

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



