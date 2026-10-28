document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const flowerId = params.get("flower");
    const flower = getFlowerById(flowerId);

    if (!flower) {
        const productMain = document.querySelector(".product-main");

        if (productMain) {
            productMain.innerHTML = `
                <p>Flower not found.</p>
                <a href="catalog.html">Return to catalogue</a>
            `;
        }

        return;
    }

    // Product information
    document.title = `${flower.name} | Fatin's Florette`;

    document.getElementById("breadcrumb-name").textContent = flower.name;

    const productImage = document.getElementById("product-image");
    productImage.src = flower.image;
    productImage.alt = flower.name;

    document.getElementById("product-category").textContent =
        flower.category.toUpperCase() + " FLOWERS";

    document.getElementById("product-name").textContent = flower.name;
    document.getElementById("product-tagline").textContent = flower.tagline || "";
    document.getElementById("product-description").textContent =
        flower.description || "Please contact us for more details.";

    // Quantity and fixed price
   // Quantity and fixed price
// Quantity and fixed price
let quantity = 1;

const quantityText = document.getElementById("quantity");
const extras = document.getElementById("extra-flowers");
const giftCard = document.getElementById("gift-card");
const price = document.getElementById("product-price");

function updatePrice() {
    const extraPrice = Number(extras.value) || 0;
    const giftCardPrice = Number(giftCard.value) || 0;

    const total = (Number(flower.price) + extraPrice + giftCardPrice) * quantity;

    price.textContent = "BND " + total.toFixed(2);
}

// Update price when an option changes
extras.addEventListener("change", updatePrice);
giftCard.addEventListener("change", updatePrice);

    updatePrice();

    document.getElementById("quantity-minus").addEventListener("click", () => {
        quantity = Math.max(1, quantity - 1);
        quantityText.textContent = quantity;
        updatePrice();
    });

    document.getElementById("quantity-plus").addEventListener("click", () => {
        quantity = Math.min(20, quantity + 1);
        quantityText.textContent = quantity;
        updatePrice();
    });

    extras.addEventListener("change", updatePrice);

    // Favourites
    let favourites = JSON.parse(
        localStorage.getItem("floretteFavourites") || "[]"
    );

    const heart = document.getElementById("favourite-button");

    function drawHeart() {
        const isFavourite = favourites.includes(flower.id);

        heart.textContent = isFavourite ? "♥️" : "♡";
        heart.classList.toggle("is-favourite", isFavourite);
    }

    heart.addEventListener("click", () => {
        favourites = JSON.parse(
            localStorage.getItem("floretteFavourites") || "[]"
        );

        if (favourites.includes(flower.id)) {
            favourites = favourites.filter(id => id !== flower.id);
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

    // Recommendations
    const recommendations = flowers
        .filter(f => f.id !== flower.id)
        .slice(0, 4);

    document.getElementById("recommendations").innerHTML =
        recommendations.map(f => `
            <article class="recommendation-card">
                <a class="recommendation-image"
                   href="product.html?flower=${encodeURIComponent(f.id)}">
                    <img src="${f.image}" alt="${f.name}" loading="lazy">
                </a>

                <div class="recommendation-meta">
                    <a href="product.html?flower=${encodeURIComponent(f.id)}">
                        ${f.name}
                    </a>
                    <span>BND ${Number(f.price).toFixed(2)}</span>
                </div>
            </article>
        `).join("");

    // Add to Cart
document.getElementById("add-to-cart").addEventListener("click", () => {
    const giftCard = document.getElementById("gift-card").value;
    const extraFlowers = Number(extras.value) || 0;
    const cart = getCartItems();

    const existing = cart.find(item =>
        item.id === flower.id &&
        item.giftCard === giftCard &&
        Number(item.extraFlowers) === extraFlowers
    );

    if (existing) {
        existing.quantity = Number(existing.quantity || 1) + quantity;
    } else {
        cart.push({
            id: flower.id,
            quantity,
            giftCard,
            extraFlowers
        });
    }

    saveCartItems(cart);
    updateCartCount();

    document.getElementById("cart-message").textContent =
        flower.name + " added to your cart.";
});


// Buy It Now
document.getElementById("buy-it-now").addEventListener("click", () => {
    const giftCard = document.getElementById("gift-card").value;
    const extraFlowers = Number(extras.value) || 0;
    const cart = getCartItems();

    const existing = cart.find(item =>
        item.id === flower.id &&
        item.giftCard === giftCard &&
        Number(item.extraFlowers) === extraFlowers
    );

    if (existing) {
        existing.quantity = Number(existing.quantity || 1) + quantity;
    } else {
        cart.push({
            id: flower.id,
            quantity,
            giftCard,
            extraFlowers
        });
    }

    saveCartItems(cart);
    updateCartCount();

    // Go directly to the cart page
    window.location.href = "cart.html";
});

});