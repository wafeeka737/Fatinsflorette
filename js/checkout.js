// =====================================
// CHECKOUT SUMMARY
// =====================================

// Get cart from localStorage
const cart =
    JSON.parse(
        localStorage.getItem("floretteCart")
    ) || [];

// Get checkout elements
const itemCountEl =
    document.getElementById("checkoutItemCount");

const subtotalEl =
    document.getElementById("checkoutSubtotal");

const shippingFeeEl =
    document.getElementById("shippingFee");

const totalEl =
    document.getElementById("checkoutTotal");


// =====================================
// FEES
// =====================================

let subtotal = 0;
let totalItems = 0;

let cardFee = 2;
let shippingFee = 0;


// =====================================
// CALCULATE CART
// =====================================

cart.forEach(item => {

    const flower =
        flowers.find(
            f => f.id === item.id
        );

    if (!flower) return;

    const quantity =
        Number(item.quantity || 1);

    totalItems += quantity;

    subtotal +=
        flower.price * quantity;

});


// =====================================
// DISPLAY CART SUMMARY
// =====================================

if (itemCountEl) {

    itemCountEl.textContent =
        `Items (${totalItems})`;

}

if (subtotalEl) {

    subtotalEl.textContent =
        `BND $${subtotal.toFixed(2)}`;

}


// =====================================
// UPDATE TOTAL
// =====================================

function updateTotal() {

    const total =
        subtotal +
        cardFee +
        shippingFee;

    // Update shipping
    shippingFeeEl.textContent =
        `BND $${shippingFee.toFixed(2)}`;

    // Update card fee display
    const cardFeeEl =
        document.getElementById("cardFee");

    if (cardFeeEl) {

        cardFeeEl.textContent =
            `BND $${cardFee.toFixed(2)}`;

    }

    // Update total
    totalEl.textContent =
        `BND $${total.toFixed(2)}`;

}


// =====================================
// PAYMENT METHOD
// =====================================

const creditCard =
    document.getElementById("creditCard");

const paypal =
    document.getElementById("paypal");

const bankTransfer =
    document.getElementById("bankTransfer");

const creditCardSection =
    document.getElementById("creditCardSection");

const paypalSection =
    document.getElementById("paypalSection");

const bankTransferSection =
    document.getElementById("bankTransferSection");


// Show payment section
function updatePaymentMethod() {

    if (creditCard.checked) {

        creditCardSection.style.display = "block";
        paypalSection.style.display = "none";
        bankTransferSection.style.display = "none";

        // Card fee
        cardFee = 2;

    }

    else if (paypal.checked) {

        creditCardSection.style.display = "none";
        paypalSection.style.display = "block";
        bankTransferSection.style.display = "none";

        // No card fee
        cardFee = 0;

    }

    else if (bankTransfer.checked) {

        creditCardSection.style.display = "none";
        paypalSection.style.display = "none";
        bankTransferSection.style.display = "block";

        // No card fee
        cardFee = 0;

    }

    updateTotal();

}


// Payment listeners
creditCard.addEventListener(
    "change",
    updatePaymentMethod
);

paypal.addEventListener(
    "change",
    updatePaymentMethod
);

bankTransfer.addEventListener(
    "change",
    updatePaymentMethod
);


// =====================================
// DELIVERY METHOD
// =====================================

const shipping =
    document.getElementById("shipping");

const pickup =
    document.getElementById("pickup");

const shippingSection =
    document.getElementById("shippingSection");

const pickupSection =
    document.getElementById("pickupSection");


// Default state
shippingSection.style.display = "none";
pickupSection.style.display = "none";


// SHIPPING SELECTED
shipping.addEventListener(
    "change",
    function () {

        shippingSection.style.display = "block";

        pickupSection.style.display = "none";

        // Reset until area is selected
        shippingFee = 0;

        updateTotal();

    }
);


// PICKUP SELECTED
pickup.addEventListener(
    "change",
    function () {

        shippingSection.style.display = "none";

        pickupSection.style.display = "block";

        // Pickup is free
        shippingFee = 0;

        // Uncheck shipping areas
        document
            .querySelectorAll(
                'input[name="shippingArea"]'
            )
            .forEach(option => {

                option.checked = false;

            });

        updateTotal();

    }
);


// =====================================
// SHIPPING AREA
// =====================================

const shippingAreas =
    document.querySelectorAll(
        'input[name="shippingArea"]'
    );


shippingAreas.forEach(option => {

    option.addEventListener(
        "change",
        function () {

            shippingFee =
                Number(this.value);

            updateTotal();

        }
    );

});


// =====================================
// FORM SUBMISSION
// =====================================

const checkoutForm =
    document.getElementById("checkout-form");


checkoutForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // =============================
        // CONTACT INFO
        // =============================

        const firstName =
            document
                .getElementById("firstName")
                .value
                .trim();

        const lastName =
            document
                .getElementById("lastName")
                .value
                .trim();

        const email =
            document
                .getElementById("email")
                .value
                .trim();

        const phone =
            document
                .getElementById("phone")
                .value
                .trim();


        // =============================
        // SHIPPING INFO
        // =============================

        const country =
            document
                .getElementById("country")
                .value
                .trim();

        const city =
            document
                .getElementById("city")
                .value
                .trim();

        const address =
            document
                .getElementById("address")
                .value
                .trim();

        const zip =
            document
                .getElementById("zip")
                .value
                .trim();


        // =============================
        // EMPTY VALIDATION
        // =============================

        if (

            firstName === "" ||
            lastName === "" ||
            email === "" ||
            phone === "" ||
            country === "" ||
            city === "" ||
            address === "" ||
            zip === ""

        ) {

            alert(
                "Please fill in all required fields."
            );

            return;

        }


        // =============================
        // EMAIL VALIDATION
        // =============================

        if (
            !email.includes("@") ||
            !email.includes(".")
        ) {

            alert(
                "Please enter a valid email address."
            );

            return;

        }


        // =============================
        // PHONE VALIDATION
        // =============================

        const phonePattern =
            /^[+]?[0-9]+$/;

        if (
            !phonePattern.test(phone)
        ) {

            alert(
                "Please enter a valid phone number."
            );

            return;

        }


        // =============================
        // DELIVERY VALIDATION
        // =============================

        if (
            !shipping.checked &&
            !pickup.checked
        ) {

            alert(
                "Please select a delivery method."
            );

            return;

        }


        // If shipping is selected,
        // customer must choose an area
        if (
            shipping.checked &&
            shippingFee === 0
        ) {

            alert(
                "Please select your delivery area."
            );

            return;

        }


        // =============================
        // GET PAYMENT METHOD
        // =============================

        let paymentMethod = "";

        if (creditCard.checked) {

            paymentMethod =
                "Credit Card";

        }

        else if (paypal.checked) {

            paymentMethod =
                "PayPal";

        }

        else if (bankTransfer.checked) {

            paymentMethod =
                "Bank Transfer";

        }


        // =============================
        // GET DELIVERY METHOD
        // =============================

        let deliveryMethod = "";

        if (pickup.checked) {

            deliveryMethod =
                "Pickup";

        }

        else if (shipping.checked) {

            const selectedArea =
                document.querySelector(
                    'input[name="shippingArea"]:checked'
                );

            deliveryMethod =
                selectedArea.dataset.area;

        }


        // =============================
        // SAVE CHECKOUT INFO
        // =============================

        localStorage.setItem(
            "firstName",
            firstName
        );

        localStorage.setItem(
            "lastName",
            lastName
        );

        localStorage.setItem(
            "email",
            email
        );

        localStorage.setItem(
            "phone",
            phone
        );

        localStorage.setItem(
            "country",
            country
        );

        localStorage.setItem(
            "city",
            city
        );

        localStorage.setItem(
            "address",
            address
        );

        localStorage.setItem(
            "zip",
            zip
        );


        // Save payment
        localStorage.setItem(
            "paymentMethod",
            paymentMethod
        );


        // Save delivery
        localStorage.setItem(
            "deliveryMethod",
            deliveryMethod
        );

        localStorage.setItem(
            "shippingFee",
            shippingFee
        );


        // Save final total
        localStorage.setItem(
            "orderSubtotal",
            subtotal.toFixed(2)
        );

        localStorage.setItem(
            "cardFee",
            cardFee.toFixed(2)
        );

        localStorage.setItem(
            "orderTotal",
            (
                subtotal +
                cardFee +
                shippingFee
            ).toFixed(2)
        );


        // Success
        alert(
            "Order placed successfully!"
        );


        // Go to receipt
        window.location.href =
            "receipt.html";

    }
);


// =====================================
// START
// =====================================

// Set default payment method
updatePaymentMethod();

// Show initial total
updateTotal();