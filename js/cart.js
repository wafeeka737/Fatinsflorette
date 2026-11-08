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

const CARD_FEE = 2;
const SHIPPING_FEE = 3;

// ============================
// GET CART
// ============================

let cart =
    JSON.parse(localStorage.getItem("floretteCart")) || [];

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

    let subtotal = 0;
    let totalItems = 0;

    cart.forEach((item, index) => {

        const flower =
            flowers.find(
                f => f.id === item.id
            );

        if (!flower) return;

        const quantity =
            Number(item.quantity || 1);

        totalItems += quantity;

        const itemTotal =
            flower.price * quantity;

        subtotal += itemTotal;

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

                <p class="item-price">
                    BND $${flower.price.toFixed(2)}
                </p>

                <div class="quantity-controls">

                    <button class="minus-btn"
                            data-index="${index}">
                        -
                    </button>

                    <span>
                        ${quantity}
                    </span>

                    <button class="plus-btn"
                            data-index="${index}">
                        +
                    </button>

                </div>

                <button
                    class="remove-btn"
                    data-index="${index}">
                    Remove
                </button>

            </div>
        `;

        cartItemsContainer.appendChild(
            cartItem
        );

    });

    itemCount.textContent =
        `Items (${totalItems})`;

    subtotalEl.textContent =
        `BND $${subtotal.toFixed(2)}`;

    totalPriceEl.textContent =
        `BND $${(
            subtotal +
            CARD_FEE +
            SHIPPING_FEE
        ).toFixed(2)}`;
}

// ============================
// CART EVENTS
// ============================

document.addEventListener("click",
function (event) {

    if (
        event.target.classList.contains(
            "plus-btn"
        )
    ) {

        const index =
            event.target.dataset.index;

        cart[index].quantity++;

        saveCart();
        renderCart();
    }

    if (
        event.target.classList.contains(
            "minus-btn"
        )
    ) {

        const index =
            event.target.dataset.index;

        if (
            cart[index].quantity > 1
        ) {
            cart[index].quantity--;
        }

        saveCart();
        renderCart();
    }

    if (
        event.target.classList.contains(
            "remove-btn"
        )
    ) {

        const index =
            event.target.dataset.index;

        cart.splice(index, 1);

        saveCart();
        renderCart();
    }
});

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