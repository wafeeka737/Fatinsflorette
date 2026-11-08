document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("catalog-sections");
    const category = document.getElementById("category-filter");
    const color = document.getElementById("color-filter");
    const sort = document.getElementById("sort-filter");
    const searchToggle = document.getElementById("search-toggle");
    const searchPanel = document.getElementById("search-panel");
    const searchInput = document.getElementById("catalog-search");

    if (!container || !category || !color || !sort) {
        console.error("Catalogue elements could not be found.");
        return;
    }

    // Catalogue sections
    const sectionDefs = [
        {
            id: "best-sellers",
            title: "Best Sellers",
            test: f => f.tags?.includes("best-seller")
        },
        {
            id: "fresh-flowers",
            title: "Fresh Flowers",
            test: f => f.category === "fresh"
        },
        {
            id: "dried-flowers",
            title: "Dried Flowers",
            test: f => f.category === "dried"
        },
        {
            id: "artificial-flowers",
            title: "Artificial Flowers",
            test: f => f.category === "artificial"
        },
        {
            id: "seasonal-flowers",
            title: "Seasonal Flowers",
            test: f => f.tags?.includes("seasonal")
        },
        {
            id: "petals-pastries",
            title: "Petals & Pastries",
            test: f => f.category === "petals-pastries"
        },
        {
            id: "basket-series",
            title: "Basket Series",
            test: f => f.category === "basket-series"
        }
        
    ];

    // Sort products using fixed prices
    function sortList(list) {
        const result = [...list];

        if (sort.value === "low-high") {
            result.sort((a, b) => Number(a.price) - Number(b.price));
        }

        if (sort.value === "high-low") {
            result.sort((a, b) => Number(b.price) - Number(a.price));
        }

        if (sort.value === "name") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        }

        return result;
    }

    // Product card
    function card(f) {
        return `
            <article class="flower-card">

                <a class="flower-card-image"
                   href="product.html?flower=${encodeURIComponent(f.id)}">

                    <img src="${f.image}"
                         alt="${f.name}"
                         loading="lazy">
                </a>

                <div class="flower-title-row">

                    <a class="flower-name"
                       href="product.html?flower=${encodeURIComponent(f.id)}">
                        ${f.name}
                    </a>

                    <button class="heart-button card-heart"
                            data-favourite="${f.id}"
                            aria-label="Favourite ${f.name}"
                            type="button">
                        ♡
                    </button>

                </div>

                <p class="flower-description">
                    ${f.tagline || ""}
                </p>

                <p class="flower-price">
                    BND ${Number(f.price).toFixed(2)}
                </p>

                <div class="flower-actions">

                    <button class="button button-outline add-to-cart"
                            data-id="${f.id}"
                            type="button">
                        ADD TO CART
                    </button>

                    <a class="button button-rose"
                       href="product.html?flower=${encodeURIComponent(f.id)}">
                        VIEW →
                    </a>

                </div>

            </article>
        `;
    }

    // Filter products
    function filteredProducts() {
    let list = [...flowers];

    // Filter by navigation category
    if (category.value === "best-seller") {
        list = list.filter(f => f.tags?.includes("best-seller"));

    } else if (category.value === "seasonal") {
        list = list.filter(f => f.tags?.includes("seasonal"));

    } else if (category.value === "petals-pastries") {
        list = list.filter(f => f.category === "petals-pastries");

    } else if (category.value === "basket-series") {
        list = list.filter(f => f.category === "basket-series");

    } else if (category.value === "all") {
        list = [...flowers];

    } else {
        list = list.filter(f => f.category === category.value);
    }

    // Filter by colour
    if (color.value !== "all") {
        list = list.filter(f => f.color === color.value);
    }

    // Filter by search
    const term = (searchInput?.value || "").trim().toLowerCase();

    if (term) {
        list = list.filter(f =>
            `${f.name} ${f.tagline} ${f.category} ${f.color}`
                .toLowerCase()
                .includes(term)
        );
    }

    return sortList(list);
}

    // Render catalogue
    function render() {
        container.innerHTML = "";

        const list = filteredProducts();

        const isFiltered =
            category.value !== "all" ||
            color.value !== "all" ||
            (searchInput?.value || "").trim() !== "";

        if (isFiltered) {
            const selectedOption = category.options[category.selectedIndex];
            const title = selectedOption ? selectedOption.text : "Our Products";

            const section = document.createElement("section");
            section.className = "catalog-section";

            section.innerHTML = `
                <div class="section-heading">
                    <div>
                        <p class="eyebrow">FATINS FLORETTE</p>
                        <h2>${title === "All bouquets" ? "Our Products" : title}</h2>
                    </div>

                    <span class="result-count">
                        ${list.length} products
                    </span>
                </div>

                ${
                    list.length
                        ? `<div class="flower-grid">${list.map(card).join("")}</div>`
                        : `<p class="no-results">No flowers found. Try another filter.</p>`
                }
            `;

            container.appendChild(section);

        } else {
            sectionDefs.forEach(def => {
                const products = sortList(list.filter(def.test));

                if (!products.length) return;

                const section = document.createElement("section");
                section.className = "catalog-section";
                section.id = def.id;

                section.innerHTML = `
                    <div class="section-heading">

                        <div>
                            <p class="eyebrow">FATINS FLORETTE</p>
                            <h2>${def.title}</h2>
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
                        ${products.map(card).join("")}
                    </div>
                `;

                container.appendChild(section);
            });
        }

        attachEvents();
    }

    const shopAllLink = document.getElementById("shop-all-link");

        if (shopAllLink) {
            shopAllLink.addEventListener("click", function (event) {
                event.preventDefault();

                category.value = "all";
                color.value = "all";
                if (searchInput) searchInput.value = "";

                render();

                document.getElementById("catalog-sections")
                    .scrollIntoView({ behavior: "smooth" });
            });
        }
    const petalsLink = document.getElementById("petals-pastries-link");

        if (petalsLink) {
            petalsLink.addEventListener("click", function (event) {
                event.preventDefault();

                category.value = "petals-pastries";
                render();

                document.getElementById("catalog-sections")
                    .scrollIntoView({ behavior: "smooth" });
            });

    const basketLink = document.getElementById("basket-series-link");

        if (basketLink)
            basketLink.addEventListener("click", function (event) {
                event.preventDefault();

                category.value = "basket-series";
                render();

                document.getElementById("catalog-sections")
                    .scrollIntoView({ behavior: "smooth" });
            });
        }

    // Product card events
    function attachEvents() {

        // Slider arrows
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

        // Add to cart
        container.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", () => {
                const flower = getFlowerById(button.dataset.id);

                if (!flower) return;

                const cart = getCartItems();

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

                saveCartItems(cart);
                updateCartCount();

                const originalText = button.textContent;
                button.textContent = "ADDED ✓";

                setTimeout(() => {
                    button.textContent = originalText;
                }, 1100);
            });
        });

        // Favourites
        container.querySelectorAll("[data-favourite]").forEach(button => {
            const id = button.dataset.favourite;

            function updateHeart() {
                const favourites = JSON.parse(
                    localStorage.getItem("floretteFavourites") || "[]"
                );

                const active = favourites.includes(id);

                button.textContent = active ? "♥️" : "♡";
                button.classList.toggle("is-favourite", active);
            }

            updateHeart();

            button.addEventListener("click", () => {
                const favourites = JSON.parse(
                    localStorage.getItem("floretteFavourites") || "[]"
                );

                const index = favourites.indexOf(id);

                if (index >= 0) {
                    favourites.splice(index, 1);
                } else {
                    favourites.push(id);
                }

                localStorage.setItem(
                    "floretteFavourites",
                    JSON.stringify(favourites)
                );

                updateHeart();
            });
        });
    }

    // Filter and sorting events
    [category, color, sort].forEach(element => {
        element.addEventListener("change", render);
    });

    // Search toggle
    if (searchToggle && searchPanel && searchInput) {
        searchToggle.addEventListener("click", () => {
            searchPanel.hidden = !searchPanel.hidden;

            if (!searchPanel.hidden) {
                searchInput.focus();
            }
        });

        searchInput.addEventListener("input", render);
    }

    render();
});