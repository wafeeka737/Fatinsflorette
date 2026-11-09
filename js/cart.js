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


    // ============================
    // EMPTY CART
    // ============================

    if (cart.length === 0) {

        emptyCart.style.display = "block";

        itemCount.textContent =
            "Items (0)";

        subtotalEl.textContent =
            "BND $0.00";

        totalPriceEl.textContent =
            "BND $0.00";

        return;

    }


    emptyCart.style.display = "none";


    // ============================
    // CALCULATE CART
    // ============================

    let subtotal = 0;

    let totalItems = 0;


    cart.forEach((item, index) => {


        // Find flower from flower.js
        const flower =
            flowers.find(
                f => f.id === item.id
            );


        // Skip if flower doesn't exist
        if (!flower) return;


        // ============================
        // QUANTITY
        // ============================

        const quantity =
            Number(item.quantity || 1);

        totalItems += quantity;


        // ============================
        // PRICES
        // ============================

        // Original flower price
        const basePrice =
            Number(flower.price);


        // Gift card price
       // Gift card price and selection
let giftCardPrice = 0;
let giftCardLabel = "No Gift Card";

if (item.giftCard === "printed" || item.giftCard === "2") {
    giftCardPrice = 2;
    giftCardLabel = "Printed Gift Card";
}
else if (item.giftCard === "handwritten") {
    giftCardLabel = "Handwritten Gift Card";
}


        // Extra flowers price
        const extraFlowersPrice =
            Number(item.extraFlowers || 0);


        // Price of ONE bouquet
        const pricePerItem =
            basePrice +
            giftCardPrice +
            extraFlowersPrice;


        // Total for this cart item
        const itemTotal =
            pricePerItem * quantity;


        // Add to subtotal
        subtotal += itemTotal;


        // ============================
        // CREATE CART ITEM
        // ============================

        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <img
                src="${flower.image}"
                alt="${flower.name}"
            >

            <div class="item-details">

                <h2>${flower.name}</h2>

                <p>
                    ${flower.description}
                </p>


                <!-- Base Price -->

                <p class="item-price">
                    BND $${basePrice.toFixed(2)} each
                </p>

<!-- Gift Card -->

<p class="item-option">
    Gift Card: ${giftCardLabel}
    (+BND $${giftCardPrice.toFixed(2)})
</p>


                <!-- Extra Flowers -->

                ${extraFlowersPrice > 0 ? `

                    <p class="item-option">
                        Extra Flowers:
                        +BND $${extraFlowersPrice.toFixed(2)}
                    </p>

                ` : ""}


                <!-- Price Per Bouquet -->

                ${(giftCardPrice > 0 || extraFlowersPrice > 0) ? `

                    <p class="item-price">
                        Price per bouquet:
                        BND $${pricePerItem.toFixed(2)}
                    </p>

                ` : ""}


                <!-- Item Total -->

                <p class="item-total">
                    Item Total:
                    BND $${itemTotal.toFixed(2)}
                </p>


                <!-- Quantity Controls -->

                <div class="quantity-controls">

                    <button
                        class="minus-btn"
                        data-index="${index}"
                    >
                        -
                    </button>


                    <span>
                        ${quantity}
                    </span>


                    <button
                        class="plus-btn"
                        data-index="${index}"
                    >
                        +
                    </button>

                </div>


                <!-- Remove Button -->

                <button
                    class="remove-btn"
                    data-index="${index}"
                >
                    Remove
                </button>

            </div>

        `;


        cartItemsContainer.appendChild(
            cartItem
        );

    });


    // ============================
    // DISPLAY SUMMARY
    // ============================

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

document.addEventListener(
    "click",
    function (event) {


        // ============================
        // PLUS QUANTITY
        // ============================

        if (
            event.target.classList.contains(
                "plus-btn"
            )
        ) {

            const index =
                Number(
                    event.target.dataset.index
                );


            cart[index].quantity =
                Number(
                    cart[index].quantity || 1
                ) + 1;


            saveCart();

            renderCart();

        }


        // ============================
        // MINUS QUANTITY
        // ============================

        if (
            event.target.classList.contains(
                "minus-btn"
            )
        ) {

            const index =
                Number(
                    event.target.dataset.index
                );


            const currentQuantity =
                Number(
                    cart[index].quantity || 1
                );


            if (currentQuantity > 1) {

                cart[index].quantity =
                    currentQuantity - 1;

            }


            saveCart();

            renderCart();

        }


        // ============================
        // REMOVE ITEM
        // ============================

        if (
            event.target.classList.contains(
                "remove-btn"
            )
        ) {

            const index =
                Number(
                    event.target.dataset.index
                );


            cart.splice(
                index,
                1
            );


            saveCart();

            renderCart();

        }

    }
);


// ============================
// CHECKOUT
// ============================

const checkoutBtn =
    document.getElementById(
        "checkoutBtn"
    );


if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        function () {

            window.location.href =
                "checkout.html";

        }
    );

}


// ============================
// START
// ============================

renderCart();