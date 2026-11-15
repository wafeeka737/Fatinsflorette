document.addEventListener("DOMContentLoaded", () => {
    const occasionFilter =
        document.getElementById("occasion-filter");

    const sortFilter =
        document.getElementById("occasion-sort");

    const container =
        document.getElementById("occasion-sections");

    if (!occasionFilter || !sortFilter || !container) {
        console.error("Occasion page elements could not be found.");
        return;
    }

    const occasions = [
        { id: "birthday", title: "Birthday Flowers" },
        { id: "wedding", title: "Wedding Flowers" },
        { id: "anniversary", title: "Anniversary Flowers" },
        { id: "graduation", title: "Graduation Flowers" },
        { id: "mothers", title: "Mother's Day Flowers" },
        { id: "teachers", title: "Teacher's Day Flowers" }
    ];

    // Standardise occasion names.
    function normalise(value) {
        return String(value ?? "")
            .trim()
            .toLowerCase()
            .replace(/&/g, "and")
            .replace(/[\s_]+/g, "-")
            .replace(/['’]/g, "");
    }

    function canonicalOccasion(value) {
        const key = normalise(value);

        const aliases = {
            "mothers": "mothers",
            "mother": "mothers",
            "mothers-day": "mothers",
            "mother-day": "mothers",

            "teachers": "teachers",
            "teacher": "teachers",
            "teachers-day": "teachers",
            "teacher-day": "teachers"
        };

        return aliases[key] || key;
    }

    function getFlowers() {
        return Array.isArray(window.flowers)
            ? window.flowers
            : [];
    }

    // Filter and sort flower data.
    function getFilteredFlowers() {
        let list = [...getFlowers()];

        const selectedOccasion =
            canonicalOccasion(occasionFilter.value);

        if (selectedOccasion !== "all") {
            list = list.filter(flower =>
                Array.isArray(flower.occasions) &&
                flower.occasions.some(
                    item =>
                        canonicalOccasion(item) === selectedOccasion
                )
            );
        }

        if (sortFilter.value === "low-high") {
            list.sort(
                (a, b) => Number(a.price) - Number(b.price)
            );
        } else if (sortFilter.value === "high-low") {
            list.sort(
                (a, b) => Number(b.price) - Number(a.price)
            );
        } else if (sortFilter.value === "name") {
            list.sort(
                (a, b) =>
                    String(a.name).localeCompare(String(b.name))
            );
        }

        return list;
    }

    // Update cart quantity in the header.
    function updateCartCount() {
        const cartCount =
            document.getElementById("cart-count");

        if (!cartCount) return;

        let cart = [];

        try {
            cart = JSON.parse(
                localStorage.getItem("floretteCart") || "[]"
            );

            if (!Array.isArray(cart)) cart = [];
        } catch {
            cart = [];
        }

        cartCount.textContent = cart.reduce(
            (total, item) =>
                total + Number(item.quantity || 1),
            0
        );
    }

    // Add a flower to the cart.
    function addToCart(flowerId, button) {
        const flower = getFlowers().find(
            item => String(item.id) === String(flowerId)
        );

        if (!flower) {
            alert("Sorry, this flower could not be found.");
            return;
        }

        let cart = [];

        try {
            cart = JSON.parse(
                localStorage.getItem("floretteCart") || "[]"
            );

            if (!Array.isArray(cart)) cart = [];
        } catch {
            cart = [];
        }

        const existing = cart.find(item =>
            String(item.id) === String(flower.id) &&
            !item.giftCard &&
            !Number(item.extraFlowers) &&
            !item.customMessage
        );

        if (existing) {
            existing.quantity =
                Number(existing.quantity || 1) + 1;
        } else {
            cart.push({
                id: flower.id,
                quantity: 1,
                giftCard: "",
                extraFlowers: 0,
                customMessage: ""
            });
        }

        localStorage.setItem(
            "floretteCart",
            JSON.stringify(cart)
        );

        updateCartCount();

        const originalText = button.textContent;

        button.textContent = "ADDED ✓";
        button.disabled = true;

        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 1100);
    }

    function escapeHtml(value) {
        return String(value ?? "").replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[char]));
    }

    // Create a flower card.
    function createFlowerCard(flower) {
        const productUrl =
            `product.html?flower=${encodeURIComponent(String(flower.id))}`;

        return `
            <article class="flower-card">

                <a class="flower-card-image" href="${productUrl}">
                    <img
                        src="${escapeHtml(flower.image)}"
                        alt="${escapeHtml(flower.name)}"
                        loading="lazy"
                    >
                </a>

                <div class="flower-title-row">
                    <a class="flower-name" href="${productUrl}">
                        ${escapeHtml(flower.name)}
                    </a>
                </div>

                <p class="flower-price">
                    BND ${Number(flower.price || 0).toFixed(2)}
                </p>

                <div class="flower-actions">

                    <button
                        class="button button-outline add-to-cart"
                        data-id="${escapeHtml(flower.id)}"
                        type="button"
                    >
                        ADD TO CART
                    </button>

                    <a class="button button-rose" href="${productUrl}">
                        VIEW →
                    </a>

                </div>

            </article>
        `;
    }

    // Render occasion sections.
    function renderFlowers() {
        const flowers = getFilteredFlowers();

        const selectedOccasion =
            canonicalOccasion(occasionFilter.value);

        const groups = selectedOccasion === "all"
            ? occasions
            : occasions.filter(
                occasion => occasion.id === selectedOccasion
            );

        container.innerHTML = "";

        groups.forEach(occasion => {
            const flowersInGroup = flowers.filter(flower =>
                Array.isArray(flower.occasions) &&
                flower.occasions.some(
                    item =>
                        canonicalOccasion(item) === occasion.id
                )
            );

            if (!flowersInGroup.length) return;

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

                        <button
                            class="slider-arrow"
                            data-direction="-1"
                            type="button"
                            aria-label="Scroll left"
                        >
                            ←
                        </button>

                        <button
                            class="slider-arrow"
                            data-direction="1"
                            type="button"
                            aria-label="Scroll right"
                        >
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

        if (!container.children.length) {
            container.innerHTML = `
                <p class="no-results">
                    No flowers are available for this occasion yet.
                </p>
            `;
        }

        // Slider arrows.
        container.querySelectorAll(".slider-arrow")
            .forEach(button => {
                button.addEventListener("click", () => {
                    const slider = button
                        .closest(".catalog-section")
                        ?.querySelector(".flower-slider");

                    if (!slider) return;

                    slider.scrollBy({
                        left:
                            Number(button.dataset.direction || 1) *
                            slider.clientWidth * 0.8,
                        behavior: "smooth"
                    });
                });
            });

        // Add-to-cart buttons.
        container.querySelectorAll(".add-to-cart")
            .forEach(button => {
                button.addEventListener("click", () => {
                    addToCart(button.dataset.id, button);
                });
            });
    }

    // Read occasion from URL.
    const params =
        new URLSearchParams(window.location.search);

    const urlOccasion =
        canonicalOccasion(params.get("occasion") || "");

    const validOccasion = occasions.some(
        occasion => occasion.id === urlOccasion
    );

    if (validOccasion) {
        const matchingOption = [
            ...occasionFilter.options
        ].find(option =>
            canonicalOccasion(option.value) === urlOccasion
        );

        if (matchingOption) {
            occasionFilter.value = matchingOption.value;
        }
    }

    // Listen for changes.
    occasionFilter.addEventListener(
        "change",
        renderFlowers
    );

    sortFilter.addEventListener(
        "change",
        renderFlowers
    );

    updateCartCount();
    renderFlowers();

    // Scroll to selected occasion when opening from a link.
    if (validOccasion) {
        requestAnimationFrame(() => {
            const section =
                document.getElementById(urlOccasion);

            if (section) {
                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    }
});