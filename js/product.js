
// Add to Cart
document.getElementById("add-to-cart").addEventListener("click", () => {
    const giftCard = document.getElementById("gift-card").value;
    const extraFlowers = Number(extras.value) || 0;
    const customMessage = giftMessage.value.trim();
    const cart = getCartItems();

    const existing = cart.find(item =>
        item.id === flower.id &&
        item.giftCard === giftCard &&
        Number(item.extraFlowers) === extraFlowers &&
        item.customMessage === customMessage
    );

    if (existing) {
        existing.quantity = Number(existing.quantity || 1) + quantity;
    } else {
        cart.push({
            id: flower.id,
            quantity,
            giftCard,
            extraFlowers,
            customMessage
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
    const customMessage = giftMessage.value.trim();
    const cart = getCartItems();

    const existing = cart.find(item =>
        item.id === flower.id &&
        item.giftCard === giftCard &&
        Number(item.extraFlowers) === extraFlowers &&
        item.customMessage === customMessage
    );

    if (existing) {
        existing.quantity = Number(existing.quantity || 1) + quantity;
    } else {
        cart.push({
            id: flower.id,
            quantity,
            giftCard,
            extraFlowers,
            customMessage
        });
    }

    saveCartItems(cart);
    updateCartCount();

    // Go directly to the cart page
    window.location.href = "cart.html";
});
