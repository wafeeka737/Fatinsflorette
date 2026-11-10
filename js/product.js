
document.addEventListener("DOMContentLoaded", async () => {

    // =====================================
    // GET PRODUCT ID FROM URL
    // =====================================

    const params = new URLSearchParams(window.location.search);
    const flowerId = params.get("flower");

    const localFlowers = window.flowers || [];

    const productMain = document.querySelector(".product-main");

    function showNotFoundError() {
        if (productMain) {
            productMain.innerHTML = `
                <p>Flower not found. Please return to the catalogue.</p>
                <a href="catalog.html">Return to catalogue</a>
            `;
        }
    }

    if (!flowerId) {
        showNotFoundError();
        return;
    }

    // =====================================
    // FIND PRODUCT IN LOCAL FLOWERS.JS
    // =====================================

    const localFlower = localFlowers.find(
        f => String(f.id).trim() === String(flowerId).trim()
    );

    let flower = localFlower;

    if (!flower) {
        showNotFoundError();
        return;
    }

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

                // Always keep local image and extra information
                image: localFlower.image,
                category: localFlower.category,
                color: localFlower.color,
                tags: localFlower.tags,
                occasions: localFlower.occasions,

                description:
                    databaseFlower.description ||
                    localFlower.description
            };
        }

    } catch (error) {
        console.warn(
            "Database unavailable. Using local flower information.",
            error
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

    if (breadcrumb) breadcrumb.textContent = flower.name;

    if (productImage) {
        productImage.src = flower.image;
        productImage.alt = flower.name;

        productImage.onerror = function () {
            console.error("Image could not be found:", flower.image);
        };
    }

    if (productCategory) {
        productCategory.textContent =
            (flower.category || "fresh").toUpperCase() + " FLOWERS";
    }

    if (productName) productName.textContent = flower.name;

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
    const extras = document.getElementById("extra-flowers");
    const giftCardSelect = document.getElementById("gift-card");
    const price = document.getElementById("product-price");

    function getGiftCardPrice() {
        if (!giftCardSelect) return 0;

        return giftCardSelect.value === "printed" ? 2 : 0;
    }

    function updatePrice() {
        const extraPrice = extras
            ? Number(extras.value) || 0
            : 0;

        const giftCardPrice = getGiftCardPrice();

        const total = (
            Number(flower.price) +
            extraPrice +
            giftCardPrice
        ) * quantity;

        if (price) {
            price.textContent = "BND " + total.toFixed(2);
        }
    }

    extras?.addEventListener("change", updatePrice);
    giftCardSelect?.addEventListener("change", updatePrice);

    document.getElementById("quantity-minus")?.addEventListener("click", () => {
        quantity = Math.max(1, quantity - 1);

        if (quantityText) {
            quantityText.textContent = quantity;
        }

        updatePrice();
    });

    document.getElementById("quantity-plus")?.addEventListener("click", () => {
        quantity = Math.min(20, quantity + 1);

        if (quantityText) {
            quantityText.textContent = quantity;
        }

        updatePrice();
    });

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
        favourites = JSON.parse(
            localStorage.getItem("floretteFavourites") || "[]"
        );
    } catch (error) {
        favourites = [];
    }

    const heart = document.getElementById("favourite-button");

    if (heart) {

        function drawHeart() {
            const isFavourite = favourites.includes(flower.id);

            heart.textContent = isFavourite ? "♥" : "♡";
            heart.classList.toggle("is-favourite", isFavourite);
        }

        heart.addEventListener("click", () => {

            if (favourites.includes(flower.id)) {
                favourites = favourites.filter(
                    id => id !== flower.id
                );
            } else {
                favourites.push(flower.id);
            }

            localStorage.setItem(
                "floretteFavourites",
                JSON.stringify(favourites)
            );

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

                    <a class="recommendation-image"
                       href="product.html?flower=${encodeURIComponent(f.id)}">

                        <img src="${f.image}"
                             alt="${f.name}"
                             loading="lazy">

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

    function addProductToCart() {

        const giftCard = giftCardSelect
            ? giftCardSelect.value
            : "none";

        const extraFlowers = extras
            ? Number(extras.value) || 0
            : 0;

        const customMessage = giftMessage
            ? giftMessage.value.trim()
            : "";

        const cart = getCartItems();

        const existing = cart.find(item =>
            item.id === flower.id &&
            item.giftCard === giftCard &&
            Number(item.extraFlowers) === extraFlowers &&
            (item.customMessage || "") === customMessage
        );

        if (existing) {

            existing.quantity =
                Number(existing.quantity || 1) + quantity;

        } else {

            cart.push({
                id: flower.id,
                quantity: quantity,
                giftCard: giftCard,
                extraFlowers: extraFlowers,
                customMessage: customMessage
            });
        }

        saveCartItems(cart);
        updateCartCount();

        const cartMessage =
            document.getElementById("cart-message");

        if (cartMessage) {
            cartMessage.textContent =
                flower.name + " added to your cart.";
        }
    }

    document.getElementById("add-to-cart")?.addEventListener(
        "click",
        addProductToCart
    );

    // =====================================
    // BUY IT NOW
    // =====================================

    document.getElementById("buy-it-now")?.addEventListener(
        "click",
        () => {
            addProductToCart();
            window.location.href = "cart.html";
        }
    );

});
