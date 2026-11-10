
// ============================
// LOAD CART
// ============================

const cartItemsContainer =
    document.getElementById("cartItems");

const emptyCart =
    document.getElementById("emptyCart");

const itemCount =
    document.getElementById("itemCount");

const subtotalEl =
    document.getElementById("subtotal");

const totalPriceEl =
    document.getElementById("totalPrice");


// ============================
// ESCAPE HTML
// ============================

function escapeHTML(text) {
    return String(text).replace(/[&<>"']/g, function (character) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[character];
    });
}


// ============================
// GET CART
// ============================

let cart =
    JSON.parse(
        localStorage.getItem("floretteCart")
    ) || [];


// ============================
// SAVE CART
// ============================

function saveCart() {

    localStorage.setItem(
        "floretteCart",
        JSON.stringify(cart)
    );

}


// ============================
// RENDER CART
// ============================

function renderCart() {

    cartItemsContainer.innerHTML = "";


    // EMPTY CART

    if (cart.length === 0) {

        emptyCart.style.display = "block";

        itemCount.textContent = "Items (0)";

        subtotalEl.textContent = "BND $0.00";

        totalPriceEl.textContent = "BND $0.00";

        return;
    }


    emptyCart.style.display = "none";


    // CALCULATE CART

    let subtotal = 0;

    let totalItems = 0;


    cart.forEach((item, index) => {


        // =====================================
        // CUSTOM BUILD-A-BOUQUET
        // =====================================

        if (item.type === "customBouquet") {

            const quantity =
                Number(item.quantity || 1);

            const pricePerItem =
                Number(item.price || 0);

            const itemTotal =
                pricePerItem * quantity;

            totalItems += quantity;

            subtotal += itemTotal;


            // FLOWER NAME LIST

            const flowerList =
                Array.isArray(item.flowers)
                    ? item.flowers.map(flower => {

                        if (typeof flower === "string") {
                            return flower;
                        }

                        if (flower && typeof flower === "object") {

                            const name =
                                flower.name ||
                                flower.id ||
                                flower.flowerName ||
                                "Unknown Flower";

                            const qty =
                                Number(flower.qty || flower.quantity || 1);

                            return `${name} × ${qty}`;

                        }

                        return "Unknown Flower";

                    }).join(", ")
                    : "No flowers selected";


            // CREATE CART ITEM

            const cartItem =
                document.createElement("div");

            cartItem.className = "cart-item";


            cartItem.innerHTML = `

                <div class="item-details">

                    <h2>
                        ${escapeHTML(item.name || "Custom Build-a-Bouquet")}
                    </h2>


                    <p class="item-option">
                        <strong>Flowers (${item.totalFlowers || 0}):</strong>
                        ${escapeHTML(flowerList)}
                    </p>


                    <p class="item-option">
                        <strong>Wrapper:</strong>
                        ${escapeHTML(item.wrapper || "None")}
                    </p>


                    <p class="item-option">
                        <strong>Ribbon:</strong>
                        ${escapeHTML(item.ribbon || "None")}
                    </p>


                    <p class="item-option">
                        <strong>Gift Card:</strong>
                        ${escapeHTML(item.card || "No Card")}
                        ${Number(item.cardPrice || 0) > 0
                            ? `(+BND $${Number(item.cardPrice).toFixed(2)})`
                            : ""}
                    </p>


                    ${item.cardMessage ? `

                        <div class="cart-personalised-message">

                            <p class="item-option">
                                <strong>Personalised Message:</strong>
                            </p>

                            <p class="message-text">
                                ${escapeHTML(item.cardMessage)}
                            </p>

                        </div>

                    ` : ""}


                    <p class="item-price">
                        BND $${pricePerItem.toFixed(2)} each
                    </p>


                    <p class="item-total">
                        Item Total:
                        BND $${itemTotal.toFixed(2)}
                    </p>


                    <div class="quantity-controls">

                        <button
                            class="minus-btn"
                            data-index="${index}"
                        >
                            -
                        </button>

                        <span>${quantity}</span>

                        <button
                            class="plus-btn"
                            data-index="${index}"
                        >
                            +
                        </button>

                    </div>


                    <button
                        class="remove-btn"
                        data-index="${index}"
                    >
                        Remove
                    </button>

                </div>

            `;


            cartItemsContainer.appendChild(cartItem);

            return;
        }


        // =====================================
        // NORMAL CATALOGUE FLOWERS
        // =====================================

        const flower =
            flowers.find(f => f.id === item.id);


        if (!flower) return;


        const quantity =
            Number(item.quantity || 1);

        totalItems += quantity;


        const basePrice =
            Number(flower.price);


        let giftCardPrice = 0;

        let giftCardLabel = "No Gift Card";


        if (
            item.giftCard === "printed" ||
            item.giftCard === "2"
        ) {

            giftCardPrice = 2;

            giftCardLabel = "Printed Gift Card";

        }

        else if (item.giftCard === "handwritten") {

            giftCardLabel = "Handwritten Gift Card";

        }


        const extraFlowersPrice =
            Number(item.extraFlowers || 0);


        const customMessage =
            String(item.customMessage || "").trim();


        const pricePerItem =
            basePrice +
            giftCardPrice +
            extraFlowersPrice;


        const itemTotal =
            pricePerItem * quantity;


        subtotal += itemTotal;


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <img
                src="${escapeHTML(flower.image)}"
                alt="${escapeHTML(flower.name)}"
            >

            <div class="item-details">

                <h2>${escapeHTML(flower.name)}</h2>

                <p>
                    ${escapeHTML(flower.description || "")}
                </p>


                <p class="item-price">
                    BND $${basePrice.toFixed(2)} each
                </p>


                <p class="item-option">
                    Gift Card: ${giftCardLabel}
                    (+BND $${giftCardPrice.toFixed(2)})
                </p>


                ${customMessage ? `

                    <div class="cart-personalised-message">

                        <p class="item-option">
                            <strong>Personalised Message:</strong>
                        </p>

                        <p class="message-text">
                            ${escapeHTML(customMessage)}
                        </p>

                    </div>

                ` : ""}


                ${extraFlowersPrice > 0 ? `

                    <p class="item-option">
                        Extra Flowers:
                        +BND $${extraFlowersPrice.toFixed(2)}
                    </p>

                ` : ""}


                ${(giftCardPrice > 0 || extraFlowersPrice > 0) ? `

                    <p class="item-price">
                        Price per bouquet:
                        BND $${pricePerItem.toFixed(2)}
                    </p>

                ` : ""}


                <p class="item-total">
                    Item Total:
                    BND $${itemTotal.toFixed(2)}
                </p>


                <div class="quantity-controls">

                    <button
                        class="minus-btn"
                        data-index="${index}"
                    >
                        -
                    </button>

                    <span>${quantity}</span>

                    <button
                        class="plus-btn"
                        data-index="${index}"
                    >
                        +
                    </button>

                </div>


                <button
                    class="remove-btn"
                    data-index="${index}"
                >
                    Remove
                </button>

            </div>

        `;


        cartItemsContainer.appendChild(cartItem);

    });


    // DISPLAY SUMMARY

    itemCount.textContent =
        `Items (${totalItems})`;

    subtotalEl.textContent =
        `BND $${subtotal.toFixed(2)}`;

    totalPriceEl.textContent =
        `BND $${subtotal.toFixed(2)}`;

}


// ============================
// CART EVENTS
// ============================

document.addEventListener("click", function (event) {

    // PLUS QUANTITY

    if (event.target.classList.contains("plus-btn")) {

        const index =
            Number(event.target.dataset.index);

        if (!cart[index]) return;

        cart[index].quantity =
            Number(cart[index].quantity || 1) + 1;

        saveCart();

        renderCart();
    }


    // MINUS QUANTITY

    if (event.target.classList.contains("minus-btn")) {

        const index =
            Number(event.target.dataset.index);

        if (!cart[index]) return;

        const currentQuantity =
            Number(cart[index].quantity || 1);

        if (currentQuantity > 1) {

            cart[index].quantity =
                currentQuantity - 1;

        }

        saveCart();

        renderCart();
    }


    // REMOVE ITEM

    if (event.target.classList.contains("remove-btn")) {

        const index =
            Number(event.target.dataset.index);

        if (!cart[index]) return;

        cart.splice(index, 1);

        saveCart();

        renderCart();
    }

});


// ============================
// CHECKOUT
// ============================

const checkoutBtn =
    document.getElementById("checkoutBtn");

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", function () {

        window.location.href = "checkout.html";

    });

}


// ============================
// START
// ============================

renderCart();
