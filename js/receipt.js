console.log("Receipt JS Loaded");

// ============================
// INVOICE NUMBER
// ============================

const invoiceNumber =
    "INV-" + Math.floor(Math.random() * 1000000);

document.getElementById("invoiceNumber").textContent =
    invoiceNumber;


// ============================
// PAYMENT TIME
// ============================

const currentTime = new Date();

document.getElementById("paymentTime").textContent =
    currentTime.toLocaleString();


// ============================
// PAYMENT METHOD
// ============================

const paymentMethod =
    localStorage.getItem("paymentMethod");

document.getElementById("paymentMethod").textContent =
    paymentMethod || "Not Selected";


// ============================
// LOAD CART
// ============================

const cart =
    JSON.parse(
        localStorage.getItem("floretteCart")
    ) || [];

const receiptItems =
    document.getElementById("receiptItems");


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

    const itemTotal =
        flower.price * quantity;

    const itemRow =
        document.createElement("div");

    itemRow.className =
        "table-row";

    itemRow.innerHTML = `
        <span>
            ${flower.name} × ${quantity}
        </span>

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

const cardFee =
    Number(
        localStorage.getItem("cardFee")
    ) || 0;

const shippingFee =
    Number(
        localStorage.getItem("shippingFee")
    ) || 0;

const total =
    Number(
        localStorage.getItem("orderTotal")
    ) || 0;
document.getElementById("receiptSubtotal").textContent =
    `BND $${subtotal.toFixed(2)}`;

document.getElementById("receiptCardFee").textContent =
    `BND $${cardFee.toFixed(2)}`;

document.getElementById("receiptShipping").textContent =
    `BND $${shippingFee.toFixed(2)}`;

document.getElementById("receiptTotal").textContent =
    `BND $${total.toFixed(2)}`;


// ============================
// DOWNLOAD / PRINT RECEIPT
// ============================

const downloadReceiptBtn =
    document.getElementById("downloadReceiptBtn");

downloadReceiptBtn.addEventListener(
    "click",
    function () {
        window.print();
    }
);


// ============================
// BACK TO HOME
// ============================

const backHomeBtn =
    document.getElementById("backHomeBtn");

backHomeBtn.addEventListener(
    "click",
    function () {

        window.location.href =
            "../index.html";

    }
);