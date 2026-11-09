
document.addEventListener("DOMContentLoaded", () => {

    console.log("Receipt JS Loaded");


    // ============================
    // BILLING INFORMATION
    // ============================

    const firstName =
        localStorage.getItem("firstName") || "";

    const lastName =
        localStorage.getItem("lastName") || "";

    const email =
        localStorage.getItem("email") || "N/A";

    const phone =
        localStorage.getItem("phone") || "N/A";

    const city =
        localStorage.getItem("city") || "";

    const address =
        localStorage.getItem("address") || "";

    const zip =
        localStorage.getItem("zip") || "";


    document.getElementById("receipt-name").textContent =
        `${firstName} ${lastName}`.trim() || "N/A";

    document.getElementById("receipt-email").textContent =
        email;

    document.getElementById("receipt-phone").textContent =
        phone;

    document.getElementById("receipt-address").innerHTML =
        `${address}<br>${city} ${zip}`.trim();


    // ============================
    // INVOICE NUMBER
    // ============================

    const invoiceNumber =
        "INV-" + Math.floor(Math.random() * 1000000);

    document.getElementById("receipt-order-number").textContent =
        invoiceNumber;


    // ============================
    // PAYMENT TIME
    // ============================

    const currentTime = new Date();

    document.getElementById("receipt-date").textContent =
        currentTime.toLocaleString();


    // ============================
    // PAYMENT METHOD
    // ============================

    const paymentMethod =
        localStorage.getItem("paymentMethod");

    document.getElementById("receipt-payment-method").textContent =
        paymentMethod || "Not Selected";


    // ============================
    // LOAD CART
    // ============================

   // ============================
// LOAD PURCHASED ITEMS
// ============================
// change it here so taht cart loads from floretteOrderItems instead of floretteCart and remove and store receipt//
const cart =
    JSON.parse(
        localStorage.getItem("floretteOrderItems")
    ) || [];

    const receiptItems =
        document.getElementById("receipt-items-container");


    // ============================
    // DISPLAY ORDER ITEMS
    // ============================

    cart.forEach(item => {

        const flower =
            flowers.find(
                f => f.id === item.id
            );

        if (!flower) return;

        const quantity =
            Number(item.quantity || 1);


        // Base flower price
        const basePrice =
            Number(flower.price);


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


        // Price per customised bouquet
        const pricePerItem =
            basePrice +
            giftCardPrice +
            extraFlowersPrice;


        // Total for this cart item
        const itemTotal =
            pricePerItem * quantity;


        // Create receipt item
        const itemRow =
            document.createElement("div");

        itemRow.className = "table-row";

        itemRow.innerHTML = `
            <div class="receipt-item-details">

                <strong>${flower.name} × ${quantity}</strong>

                <p>Base Price: BND $${basePrice.toFixed(2)}</p>

                <p>
                    Gift Card: ${giftCardLabel}
                    (+BND $${giftCardPrice.toFixed(2)})
                </p>

                ${extraFlowersPrice > 0 ? `
                    <p>
                        Extra Flowers:
                        +BND $${extraFlowersPrice.toFixed(2)}
                    </p>
                ` : ""}

            </div>

            <span>
                BND $${itemTotal.toFixed(2)}
            </span>
        `;

        receiptItems.appendChild(itemRow);

    });


    // ============================
    // DISPLAY TOTALS
    // ============================

    const subtotal =
        Number(
            localStorage.getItem("orderSubtotal")
        ) || 0;

    const shippingFee =
        Number(
            localStorage.getItem("shippingFee")
        ) || 0;

    const total =
        Number(
            localStorage.getItem("orderTotal")
        ) || 0;


    document.getElementById("receipt-subtotal").textContent =
        `BND $${subtotal.toFixed(2)}`;

    document.getElementById("receipt-shipping").textContent =
        `BND $${shippingFee.toFixed(2)}`;

    document.getElementById("receipt-total").textContent =
        `BND $${total.toFixed(2)}`;

});
