document.addEventListener("DOMContentLoaded", async () => {

    // =====================================
    // CHECK THAT THIS IS THE PRODUCT PAGE
    // =====================================

    const productMain = document.querySelector(".product-main");

    // Do not run product-page code on other pages.
    if (!productMain) return;

    // =====================================
    // GET PRODUCT ID FROM URL
    // =====================================

    const params = new URLSearchParams(window.location.search);
    const flowerId = params.get("flower");

    const localFlowers = window.flowers || [];

    function showNotFoundError() {
        productMain.innerHTML = `
            <div class="product-error">
                <h2>Flower not found</h2>
                <p>Please return to the catalogue and select a flower.</p>
                <a href="catalog.html">Return to Catalogue</a>
            </div>
        `;
    }

    if (!flowerId) {
        showNotFoundError();
        return;
    }

    // =====================================
    // FIND PRODUCT IN LOCAL FLOWER DATA
    // =====================================

    const localFlower = localFlowers.find(
        f => String(f.id).trim() === String(flowerId).trim()
    );

    if (!localFlower) {
        showNotFoundError();
        return;
    }

    let flower = { ...localFlower };

    // =====================================
    // GET PRODUCT INFORMATION FROM DATABASE
    // =====================================

    try {
        const response = await fetch(
            `http://localhost:5000/products/${encodeURIComponent(flowerId)}`
        );

        if (!response.ok) {
            throw new Error("Database product not found.");
        }

        const databaseFlower = await response.json();

        if (databaseFlower && databaseFlower.id) {
            flower = {
                ...localFlower,
                ...databaseFlower,

                // Preserve local image and category information.
                image: localFlower.image,
                category: localFlower.category,
                color: localFlower.color,
                tags: localFlower.tags,
                occasions: localFlower.occasions,

                // Keep local information if the database fields are empty.
                name: databaseFlower.name || localFlower.name,

                price: Number.isFinite(Number(databaseFlower.price))
                    ? Number(databaseFlower.price)
                    : localFlower.price,

                description:
                    databaseFlower.description ||
                    localFlower.description,

                tagline:
                    databaseFlower.tagline ||
                    localFlower.tagline ||
                    ""
            };
        }

    } catch (error) {
        console.warn(
            "Database unavailable. Using local flower information.",
            error.message
        );
    }

    // =====================================
    // DISPLAY PRODUCT INFORMATION
    // =====================================

    document.title = `${flower.name} | Fatin's Florette`;

    const breadcrumb = document.getElementById("breadcrumb-name");
    const productImage = document.getElementById("product-image");
    const productCategory = document.getElementById("product-category");
    const productName = document.getElementById("product-name");
    const productDescription = document.getElementById("product-description");
    const tagline = document.getElementById("product-tagline");

    if (breadcrumb) {
        breadcrumb.textContent = flower.name;
    }

    if (productImage) {
        productImage.src = flower.image;
        productImage.alt = flower.name;

        productImage.onerror = function () {
            console.error("Image could not be found:", flower.image);
        };
    }

    if (productCategory) {
        productCategory.textContent =
            `${(flower.category || "fresh").toUpperCase()} FLOWERS`;
    }

    if (productName) {
        productName.textContent = flower.name;
    }

    if (productDescription) {
        productDescription.textContent =
            flower.description || "Please contact us for more details.";
    }

    if (tagline) {
        tagline.textContent = flower.tagline || "";
    }

    // =====================================
    // QUANTITY AND PRICE
    // =====================================

    let quantity = 1;

    const quantityText = document.getElementById("quantity");
    const quantityMinus = document.getElementById("quantity-minus");
    const quantityPlus = document.getElementById("quantity-plus");

    const extras = document.getElementById("extra-flowers");
    const giftCardSelect = document.getElementById("gift-card");
    const price = document.getElementById("product-price");

    function getExtraPrice() {
        return extras ? Number(extras.value) || 0 : 0;
    }

    function getGiftCardPrice() {
        if (!giftCardSelect) return 0;

        // Only printed gift cards cost BND 2.
        return giftCardSelect.value === "printed" ? 2 : 0;
    }

    function updatePrice() {
        const basePrice = Number(flower.price) || 0;

        const total = (
            basePrice +
            getExtraPrice() +
            getGiftCardPrice()
        ) * quantity;

        if (price) {
            price.textContent = `BND ${total.toFixed(2)}`;
        }
    }

    if (quantityMinus) {
        quantityMinus.addEventListener("click", () => {
            quantity = Math.max(1, quantity - 1);

            if (quantityText) {
                quantityText.textContent = quantity;
            }

            updatePrice();
        });
    }

    if (quantityPlus) {
        quantityPlus.addEventListener("click", () => {
            quantity = Math.min(20, quantity + 1);

            if (quantityText) {
                quantityText.textContent = quantity;
            }

            updatePrice();
        });
    }

    if (extras) {
        extras.addEventListener("change", updatePrice);
    }

    if (giftCardSelect) {
        giftCardSelect.addEventListener("change", updatePrice);
    }

    updatePrice();

    // =====================================
    // GIFT MESSAGE AND CHARACTER COUNTER
    // =====================================

    const giftMessage = document.getElementById("gift-message");
    const messageCount = document.getElementById("messageCount");

    if (giftMessage && messageCount) {
        messageCount.textContent = giftMessage.value.length;

        giftMessage.addEventListener("input", () => {
            messageCount.textContent = giftMessage.value.length;
        });
    }

    // =====================================
    // FAVOURITE BUTTON
    // =====================================

    let favourites = [];

    try {
        const savedFavourites = JSON.parse(
            localStorage.getItem("floretteFavourites") || "[]"
        );

        favourites = Array.isArray(savedFavourites)
            ? savedFavourites
            : [];

    } catch (error) {
        favourites = [];
    }

    const heart = document.getElementById("favourite-button");

    if (heart) {

        function drawHeart() {
            const isFavourite = favourites.includes(flower.id);

            heart.textContent = isFavourite ? "♥" : "♡";

            heart.classList.toggle(
                "is-favourite",
                isFavourite
            );

            heart.setAttribute(
                "aria-pressed",
                String(isFavourite)
            );
        }

        heart.addEventListener("click", () => {

            if (favourites.includes(flower.id)) {
                favourites = favourites.filter(
                    id => id !== flower.id
                );
            } else {
                favourites.push(flower.id);
            }

            try {
                localStorage.setItem(
                    "floretteFavourites",
                    JSON.stringify(favourites)
                );
            } catch (error) {
                console.error("Unable to save favourites:", error);
            }

            drawHeart();
        });

        drawHeart();
    }

    // =====================================
    // RECOMMENDED PRODUCTS
    // =====================================

    const recommendationsContainer =
        document.getElementById("recommendations");

    if (recommendationsContainer) {

        const recommendations = localFlowers
            .filter(f => f.id !== flower.id)
            .slice(0, 4);

        recommendationsContainer.innerHTML =
            recommendations.map(f => `
                <article class="recommendation-card">

                    <a
                        class="recommendation-image"
                        href="product.html?flower=${encodeURIComponent(f.id)}"
                    >
                        <img
                            src="${f.image}"
                            alt="${f.name}"
                            loading="lazy"
                        >
                    </a>

                    <div class="recommendation-meta">

                        <a href="product.html?flower=${encodeURIComponent(f.id)}">
                            ${f.name}
                        </a>

                        <span>
                            BND ${Number(f.price).toFixed(2)}
                        </span>

                    </div>

                </article>
            `).join("");
    }

    // =====================================
    // ADD TO CART
    // =====================================

    const addToCartButton = document.getElementById("add-to-cart");
    const cartMessage = document.getElementById("cart-message");

    function addProductToCart() {

        const giftCard = giftCardSelect
            ? giftCardSelect.value
            : "none";

        const extraFlowers = getExtraPrice();

        const customMessage = giftMessage
            ? giftMessage.value.trim()
            : "";

        // These helper functions must exist in flower.js.
        if (
            typeof getCartItems !== "function" ||
            typeof saveCartItems !== "function"
        ) {
            console.error(
                "Cart functions are missing. Check flower.js."
            );

            if (cartMessage) {
                cartMessage.textContent =
                    "Sorry, your cart could not be updated. Please try again.";
            }

            return false;
        }

        const cart = getCartItems();

        const existing = cart.find(item =>
            item.id === flower.id &&
            item.giftCard === giftCard &&
            Number(item.extraFlowers || 0) === extraFlowers &&
            (item.customMessage || "") === customMessage
        );

        if (existing) {
            existing.quantity =
                Number(existing.quantity || 1) + quantity;
        } else {
            cart.push({
                id: flower.id,
                name: flower.name,
                price: Number(flower.price),
                image: flower.image,
                quantity: quantity,
                giftCard: giftCard,
                extraFlowers: extraFlowers,
                customMessage: customMessage
            });
        }

        saveCartItems(cart);

        if (typeof updateCartCount === "function") {
            updateCartCount();
        }

        if (cartMessage) {
            cartMessage.textContent =
                `${flower.name} added to your cart!`;
        }

        return true;
    }

    if (addToCartButton) {
        addToCartButton.addEventListener("click", () => {
            addProductToCart();
        });
    }

    // =====================================
    // BUY IT NOW
    // =====================================

    const buyNowButton = document.getElementById("buy-it-now");

    if (buyNowButton) {
        buyNowButton.addEventListener("click", () => {
            const added = addProductToCart();

            if (added) {
                window.location.href = "cart.html";
            }
        });
    }

});