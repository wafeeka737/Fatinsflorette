
document.addEventListener("DOMContentLoaded", () => {
  const occasionFilter = document.getElementById("occasion-filter");
  const sortFilter = document.getElementById("occasion-sort");
  const container = document.getElementById("occasion-sections");

  // Stop if the required elements do not exist
  if (!occasionFilter || !sortFilter || !container) {
    return;
  }

  // Occasion groups and their headings
  const occasions = [
    { id: "birthday", title: "Birthday Flowers" },
    { id: "wedding", title: "Wedding Flowers" },
    { id: "anniversary", title: "Anniversary Flowers" },
    { id: "graduation", title: "Graduation Flowers" },
    { id: "mothers", title: "Mother's Day Flowers" },
    { id: "teachers", title: "Teacher's Day Flowers" }

  ];

  // Get the flower data from flowers.js
  function getFlowers() {
    return window.flowers || [];
  }

  // Filter and sort flowers
  function getFilteredFlowers() {
    let list = [...getFlowers()];
    const selectedOccasion = occasionFilter.value;
    const selectedSort = sortFilter.value;

    // Filter by selected occasion
    if (selectedOccasion !== "all") {
      list = list.filter(flower =>
        Array.isArray(flower.occasions) &&
        flower.occasions.includes(selectedOccasion)
      );
    }

    // Sort the flowers
    if (selectedSort === "low-high") {
      list.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (selectedSort === "high-low") {
      list.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (selectedSort === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }

  // Update the cart number in the navigation
  function updateCartCount() {
    const cartCount = document.getElementById("cart-count");

    if (!cartCount) return;

    let cart = [];

    try {
      cart = JSON.parse(localStorage.getItem("floretteCart") || "[]");

      if (!Array.isArray(cart)) {
        cart = [];
      }
    } catch (error) {
      cart = [];
    }

    const total = cart.reduce(
      (sum, item) => sum + Number(item.quantity || 1),
      0
    );

    cartCount.textContent = total;
  }

  // Add a flower to the shopping cart
  function addToCart(flowerId, button) {
    const flower = getFlowers().find(item => item.id === flowerId);

    if (!flower) {
      alert("Sorry, this flower could not be found.");
      return;
    }

    let cart = [];

    try {
      cart = JSON.parse(localStorage.getItem("floretteCart") || "[]");

      if (!Array.isArray(cart)) {
        cart = [];
      }
    } catch (error) {
      cart = [];
    }

    // Match a basic flower cart item without extras
    const existing = cart.find(item =>
      item.id === flower.id &&
      !item.giftCard &&
      !Number(item.extraFlowers)
    );

    if (existing) {
      existing.quantity = Number(existing.quantity || 1) + 1;
    } else {
      cart.push({
        id: flower.id,
        quantity: 1,
        giftCard: "",
        extraFlowers: 0
      });
    }

    localStorage.setItem("floretteCart", JSON.stringify(cart));

    updateCartCount();

    button.textContent = "ADDED ✓";
    button.disabled = true;

    setTimeout(() => {
      button.textContent = "ADD TO CART";
      button.disabled = false;
    }, 1100);
  }

  // Create one flower card
  function createFlowerCard(flower) {
    const productLink =
      `product.html?flower=${encodeURIComponent(flower.id)}`;

    return `
      <article class="flower-card">
        <a class="flower-card-image" href="${productLink}">
          <img
            src="${flower.image}"
            alt="${flower.name}"
            loading="lazy"
          >
        </a>

        <div class="flower-title-row">
          <a class="flower-name" href="${productLink}">
            ${flower.name}
          </a>
        </div>

        <p class="flower-price">
          BND ${Number(flower.price).toFixed(2)}
        </p>

        <div class="flower-actions">
          <button
            class="button button-outline add-to-cart"
            data-id="${flower.id}"
            type="button"
          >
            ADD TO CART
          </button>

          <a class="button button-rose" href="${productLink}">
            VIEW <span>→</span>
          </a>
        </div>
      </article>
    `;
  }

  // Display the occasion groups
  function renderFlowers() {
    const flowers = getFilteredFlowers();
    const selectedOccasion = occasionFilter.value;

    const groups = selectedOccasion === "all"
      ? occasions
      : occasions.filter(occasion =>
          occasion.id === selectedOccasion
        );

    container.innerHTML = "";

    groups.forEach(occasion => {
      // Get flowers belonging to this occasion
      const flowersInGroup = flowers.filter(flower =>
        Array.isArray(flower.occasions) &&
        flower.occasions.includes(occasion.id)
      );

      // Do not display headings for empty groups
      if (flowersInGroup.length === 0) {
        return;
      }

      const section = document.createElement("section");
section.className = "catalog-section";
section.id = occasion.id;

section.innerHTML = `
    <div class="section-heading">

        <div>
            <p class="eyebrow">FATINS FLORETTE</p>
            <h2>${occasion.title}</h2>
        </div>

        <div class="slider-controls">

            <button class="slider-arrow"
                    data-direction="-1"
                    type="button"
                    aria-label="Scroll left">
                ←
            </button>

            <button class="slider-arrow"
                    data-direction="1"
                    type="button"
                    aria-label="Scroll right">
                →
            </button>

        </div>

    </div>

    <div class="flower-slider">
        ${flowersInGroup.map(createFlowerCard).join("")}
    </div>
`;

container.appendChild(section);
    });

    // Display a message if there are no matching flowers
    if (container.children.length === 0) {
      container.innerHTML = `
        <p class="no-results">
          No flowers are available for this occasion yet.
        </p>
      `;
    }

    // Connect the slider arrows
container.querySelectorAll(".slider-arrow").forEach(button => {
    button.addEventListener("click", () => {
        const slider = button
            .closest(".catalog-section")
            .querySelector(".flower-slider");

        if (!slider) return;

        slider.scrollBy({
            left: Number(button.dataset.direction) * slider.clientWidth * 0.8,
            behavior: "smooth"
        });
    });
});

// Connect the Add to Cart buttons
container.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        addToCart(button.dataset.id, button);
    });
});
  }

  // Read the selected occasion from the URL
const params = new URLSearchParams(window.location.search);
const selectedOccasion = params.get("occasion");

if (
  selectedOccasion &&
  occasions.some(occasion => occasion.id === selectedOccasion)
) {
  occasionFilter.value = selectedOccasion;
}

  // Listen for filter and sorting changes
  occasionFilter.addEventListener("change", renderFlowers);
  sortFilter.addEventListener("change", renderFlowers);

  // Update cart count and display the flowers
updateCartCount();
renderFlowers();

// Smoothly scroll to the selected occasion
if (selectedOccasion) {
  requestAnimationFrame(() => {
    const section = document.getElementById(selectedOccasion);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
}
});

