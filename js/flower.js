const flowers = [
  {
    id: "Fresh-Lily-bouquet",
    name: "Fresh Lily Bouquet",
    price: 35,
    category: "fresh",
    description: "Fresh lilies arranged in a delicate bouquet, bringing a touch of elegance and beauty to any special occasion.",
    color: "pink",
    image: "images/lilies 1.jpeg",
    tags: ["best-seller"],
  },
  {
    id: "Sunflower-bouquet",
    name: "Sunflower Bouquet",
    price: 50,
    category: "fresh",
    color: "mixed",
    description: "Bright sunflowers bring warmth and happiness to this cheerful bouquet, making it a lovely gift for someone special.",
    image: "images/sunflower bouquet 1.jpeg",
    tags: ["best-seller"],
    occasions: ["graduation"]
  },
  {
    id: "Rose-bouquet",
    name: "Rose Bouquet",
    price: 45,
    category: "fresh",
    color: "mixed",
    description: "A timeless arrangement of roses, carefully gathered into a classic bouquet that expresses love and appreciation.",
    image: "images/rose 1.jpeg",
    tags: ["best-seller"],
    occasions: ["anniversary"]
  },
  {
    id: "peonies-bouquet",
    name: "Peonies Bouquet",
    price: 100,
    category: "fresh",
    color: "pink",
    description: "Soft and beautiful peonies create a full, romantic arrangement, perfect for celebrating meaningful moments.",
    image: "images/peonies 2.jpeg",
    tags: ["best-seller", "seasonal"],
    occasions: ["anniversary"]
  },
  {
    id: "lilac-roses",
    name: "Lilac Roses",
    price: 45,
    category: "fresh",
    color: "purple",
    description: "	Lovely lilac roses come together in a graceful arrangement, adding a soft and charming touch to any occasion.",
    image: "images/fresh purple bouquet.jpeg",
    tags: ["best-seller"],
  },
  {
    id: "mixed-flower-bouquet",
    name: "Mixed Flower Bouquet",
    price: 90,
    category: "fresh",
    color: "mixed",
    description: "A beautiful mix of seasonal blooms arranged together to create a colourful and cheerful gift.",
    image: "images/fresh mixed bouquet.jpeg",
    tags: ["best-seller"],
    occasions: ["graduation"]
  },
  {
    id: "pastel-poetry",
    name: " Pastel Poetry",
    price: 70,
    category: "fresh",
    color: "pink",
    description: "		A beautiful mix of dried flowers arranged in a natural style, making a lovely decorative piece that can be enjoyed for longer.",
    image: "images/pastel theme 2.jpeg",
    tags: ["best-seller"],
    occasions: ["birthday"]
  },
  {
    id: "basket-fresh-flowers",
    name: "Basket Fresh Flowers",
    price: 100,
    category: "basket-series",
    color: "pink",
    description: "	Fresh pink blooms are beautifully arranged in a charming basket, creating a thoughtful gift for someone you love.",
    image: "images/basket fresh flowers 1.jpeg",
    tags: ["basket-series"],
    occasions: ["mothers"]
  },
  {
    id: "dried-daydream",
    name: "Dried Daydream",
    price: 50,
    category: "dried",
    color: "pink",
    description: "	A lovely arrangement of dried flowers in soft, warm tones, creating a charming keepsake that lasts beyond the occasion.",
    image: "images/dried flowers 5.jpeg",
    tags: ["dried"],
  },
  {
    id: "Sunset",
    name: "Sunset",
    price: 40,
    category: "dried",
    color: "mixed",
    description: "	Warm golden grasses and dried blooms come together in a natural arrangement, bringing a cosy and rustic touch to any space.",
    image: "images/dried flowers 6.jpeg",
    tags: ["dried"],
  },
  {
    id: "everlasting-blush",
    name: "Everlasting Blush",
    price: 65,
    category: "artificial",
    color: "pink",
    description: "	Soft blush and cream artificial blooms create a beautiful arrangement that adds lasting charm to any room.",
    image: "images/artificial flower basket 2.jpeg",
    tags: ["artificial", "basket series"],
  },
  {
    id: "Lilac-letters",
    name: "Lilac Letters",
    price: 50,
    category: "artificial",
    color: "purple",
    description: "	Lovely lilac blooms bring a soft and graceful touch to this artificial arrangement, perfect for gifting or decorating.",
    image: "images/artificial flowers 1.jpeg",
    tags: ["artificial"],
    occasions: ["teachers"]
  },
  {
    id: "sunset-kiss",
    name: "Sunset Kiss",
    price: 50,
    category: "artificial",
    color: "purple",
    description: "	Warm-toned artificial flowers create a cheerful arrangement that keeps its beauty without the need for regular care.",
    image: "images/artificial flower basket 1.jpeg",
    tags: ["artificial", "basket series"],
  },
  {
    id: "sweet-on-you",
    name: "Sweet On You",
    price: 50,
    category: "petals-pastries",
    color:"purple",
    description: "A sweet combination of beautiful blooms and delicious treats, thoughtfully put together to make someone's day extra special.",
    image: "images/cake in bloom.jpeg",
    tags: ["Petals & Pastries"],
    occasions: ["birthday"]
  },
  {
    id: "sunday-coffee",
    name: "Sunday Coffee",
    price: 50,
    category: "petals-pastries",
    color:"purple",
    description: "	A cosy pairing of lovely flowers and a coffee-inspired treat, perfect for slow mornings and thoughtful surprises.",
    image: "images/petals and pastries 2.jpeg",
    tags: ["Petals & Pastries"],
    occasions: ["birthday", "anniversary"]
  },
  {
    id: "yellow-bloom",
    name: "Yellow Bloom",
    price: 50,
    category: "petals-pastries",
    color:"purple",
    description: "	Bright yellow blooms paired with a delightful treat, creating a cheerful gift filled with sunshine and sweetness.",
    image: "images/petals and pastries 3.jpeg",
    tags: ["Petals & Pastries"],
    occasions: ["birthday"]
  },
  {
    id: "bloom-sip",
    name: "Bloom Sip",
    price: 38,
    category: "petals-pastries",
    color:"purple",
    description: "A lovely floral and beverage pairing, perfect for sharing a little happiness with someone special.",
    image: "images/petals and pastries 15.jpeg",
    tags: ["Petals & Pastries"],
    occasions: ["birthday"]
  },
  {
    id: "just-because",
    name: "Just-Because",
    price: 38,
    category: "petals-pastries",
    color:"Red",
    description: "A sweet little surprise featuring beautiful blooms and treats, because sometimes you don't need a reason to make someone smile.",
    image: "images/petals and pastries 8.jpeg",
    tags: ["Petals & Pastries"],
  },
   {
    id: "for-you",
    name: "For You",
    price: 38,
    category: "petals-pastries",
    color:"pink",
    description: "A thoughtful combination of flowers and sweet treats, made to remind someone just how special they are.",
    image: "images/petals and pastries 7.jpeg",
    tags: ["Petals & Pastries"],
    occasions: ["birthday"]
  },
  {
    id: "bloom-and-butter",
    name: "Bloom & Butter",
    price: 38,
    category: "petals-pastries",
    color:"Green",
    description: "	A charming floral and pastry pairing, bringing together the beauty of fresh blooms and the sweetness of a little treat.",
    image: "images/petals and pastries 12.jpeg",
    tags: ["Petals & Pastries"],
  },
  {
    id: "Lilac-butter",
    name: "Lilac Butter",
    price: 38,
    category: "petals-pastries",
    color:"purple",
    description: "	Soft lilac-inspired blooms paired with a delightful treat, creating a sweet and thoughtful gift for any occasion.",
    image: "images/petals and pastries 13.jpeg",
    tags: ["Petals & Pastries"],
    occasions: ["birthday"]
  },
  {
    id: "Blossom",
    name: "Blossom",
    price: 100,
    category: "basket-series",
    color:"pink",
    description: "	A lovely basket filled with delicate blooms, bringing a romantic and graceful touch to special celebrations.",
    image: "images/basket fresh flowers 3.jpeg",
    tags: ["basket series"],
    occasions: ["anniversary"]
  },
  {
    id: "Mariposa",
    name: "Mariposa",
    price: 95,
    category: "basket-series",
    color:"pink",
    description: "	A charming floral basket featuring soft pink tones, perfect for making birthdays feel a little more special.",
    image: "images/basket fresh flowers 4.jpeg",
    tags: ["basket series"],
    occasions: ["birthday"]
  },
  {
    id: "Golden-Hour",
    name: "Golden Hour",
    price: 50,
    category: "fresh",
    color:"yellow",
    description: "	A gentle blend of pastel blooms creates a soft and dreamy bouquet, perfect for birthdays and thoughtful surprises.",
    image: "images/sunflower 4.jpeg",
    tags: ["Petals & Pastries"],
    occasions: ["graduation"]
  },
  {
    id: "carnation-bouquet",
    name: "Carnation Bouquet",
    price: 50,
    category: "fresh",
    color:"mixed",
    description: "	Delicate carnations are arranged into a lovely bouquet, making it a thoughtful gift for mothers, teachers, and loved ones.",
    image: "images/fresh flower bouquet 4.jpeg",
    tags: ["Petals & Pastries"],
    occasions: ["teachers", "mothers"]
  },
  {
    id: "Ever-After",
    name: "Ever After",
    price: 65,
    category: "fresh",
    color:"white",
    description: "	An elegant bridal bouquet featuring delicate blooms, beautifully arranged for a timeless and romantic wedding look.",
    image: "images/bridal bouquet 2.jpeg",
    tags: ["wedding"],
    occasions: ["wedding"]
  },
  {
    id: "mixed-purple-bouquet",
    name: "Mixed-Purple-Bouquet",
    price: 50,
    category: "fresh",
    color:"purple",
    description: "	A charming mix of purple blooms creates a graceful bouquet filled with colour and elegance.",
    image: "images/fresh flower bouquet 7.jpeg",
    tags: ["best-seller"],
    occasions: ["mothers"]
  },
  {
    id: "Love-in-bloom",
    name: "Love In Bloom",
    price: 65,
    category: "fresh",
    color:"white",
    description: "	A romantic arrangement of fresh flowers, thoughtfully styled to complement a beautiful wedding celebration.",
    image: "images/bridal bouquet 4.jpeg",
    tags: ["best-seller"],
    occasions: ["wedding"]
  },
  {
    id: "Pure-Serenity",
    name: "Pure Serenity",
    price: 100,
    category: "fresh",
    color:"white",
    description: "	Soft white blooms come together in an elegant arrangement, creating a graceful and timeless bridal bouquet.",
    image: "images/bridal bouquet 5.jpeg",
    tags: ["wedding"],
    occasions: ["wedding"]
  },
  {
    id: "Blue-Serenity",
    name: "Blue Serenity",
    price: 95,
    category: "fresh",
    color:"blue",
    description: "	Beautiful blue and white blooms create a dreamy arrangement, perfect for adding a unique touch to a wedding.",
    image: "images/bridal bouquet 6.jpeg",
    tags: ["wedding"],
    occasions: ["wedding"]
  },
  {
    id: "Cotton-Candy",
    name: "Cotton Candy",
    price: 100,
    category: "basket-series",
    color:"yellow",
    description: "A sweet arrangement of soft yellow blooms presented in a beautiful basket, bringing warmth and happiness to any space.",
    image: "images/basket fresh flowers 5.jpeg",
    tags: ["basket series"]
  },
  {
    id: "Lune-Bleue",
    name: "Lune Bleue",
    price: 40,
    category: "dried",
    color:"blue",
    description: "	Soft blue dried flowers create a dreamy arrangement, offering a unique and lasting gift for someone special.",
    image: "images/dried flowers 8.jpeg",
    tags: ["dried"],
  },
  {
    id: "Satin-Bloom",
    name: "Satin Bloom",
    price: 85,
    category: "fresh",
    color:"white",
    description: "	A graceful arrangement of soft blooms, bringing a delicate and elegant touch to anniversaries and special celebrations.",
    image: "images/fresh flower bouquet 8.jpeg",
    tags: ["anniversary"],
    occasions: ["anniversary"]
  },
  {
    id: "white-rose",
    name: "White Rose",
    price: 65,
    category: "fresh",
    color:"white",
    description: "white",
    image: "images/bridal bouquet 8.jpeg",
    tags: ["wedding"],
    occasions: ["wedding"]
  },
  {
    id: "Mixed-roses",
    name: "Mixed Roses",
    price: 65,
    category: "fresh",
    color:"red",
    description: "white",
    image: "images/bridal bouquet 9.jpeg",
    tags: ["wedding"],
    occasions: ["wedding"]
  },
  {
    id: "blue-reverie",
    name: "Blue Reverie",
    price: 40,
    category: "dried",
    color:"blue",
    description: "	A delicate blend of blue dried blooms creates a calming arrangement, perfect for adding a soft touch to your home.",
    image: "images/dried flowers 10.jpeg",
    tags: ["best-seller"],
  },
  {
    id: "Blanc de Rose",
    name: "Blanc de Rose",
    price: 50,
    category: "fresh",
    color:"mixed",
    description: "	A lovely combination of fresh blooms arranged in a soft and elegant style, perfect for showing love and appreciation.",
    image: "images/fresh flower bouquet 9.jpeg",
    tags: ["fresh"],
    occasions: ["mothers"]
  },
  {
    id: "sundaze",
    name: "Sundaze",
    price: 52,
    category: "artificial",
    color:"yellow",
    description: "	Bright yellow artificial blooms bring a little sunshine into any space, making a lovely long-lasting decorative piece.",
    image: "images/artificial flower 3.jpeg",
    tags: ["artificial"]
  },
  {
    id: "orange-roses",
    name: "Orange Roses",
    price: 50,
    category: "fresh",
    color:"yellow",
    description: "Warm orange roses bring a cheerful and vibrant touch to this bouquet, making it a lovely way to brighten someone's day.",
    image: "images/fresh flower bouquet 10.jpeg",
    tags: ["fresh"]
  },
  {
    id: "purple-dusk",
    name: "Purple Dusk",
    price: 45,
    category: "dried",
    color:"pruple",
    description: "Deep purple tones give this dried arrangement a charming and elegant look, perfect for those who love something different.",
    image: "images/bridal bouquet 10.jpeg",
    tags: ["wedding"],
    occasions: ["wedding"]
  },
  {
    id: "Maison-Rosé",
    name: "Maison Rosé",
    price: 65,
    category: "fresh",
    color:"white",
    description: " 	An elegant arrangement of delicate blooms, designed with a romantic finish for a beautiful wedding celebration.",
    image: "images/bridal bouquet 11.jpeg",
    tags: ["wedding"],
    occasions: ["wedding"]
  },
  {
    id: "wedding-lily",
    name: "wedding lily",
    price: 65,
    category: "fresh",
    color:"purple",
    description: "	Beautiful lilies create a graceful and sophisticated bridal bouquet, perfect for a timeless wedding look.",
    image: "images/bridal bouquet 12.jpeg",
    tags: ["wedding"],
    occasions: ["wedding"]
  },
  {
    id: "for-the-gents",
    name: "For The Gents",
    price: 85,
    category: "fresh",
    color:"blue",
    description: "	A stylish arrangement of blue-toned blooms, offering a thoughtful and unique floral gift for someone special.",
    image: "images/fresh flower bouquet 11.jpeg",
    tags: ["anniversary"],
    occasions: ["anniversary"]
  },
  {
    id: "for-the-lads",
    name: "For The Lads",
    price: 50,
    category: "fresh",
    color:"blue",
    description: "A charming arrangement of fresh flowers, bringing a lovely touch of colour and appreciation to any celebration.",
    image: "images/fresh flower bouquet 13.jpeg",
    tags: ["fresh"],
    occasions: ["anniversary", "mothers","graduation"]
  },
  {
    id: "Petal-Poetry",
    name: "Petal Poetry",
    price: 90,
    category: "dried",
    color:"mixed",
    description: "home",
    image: "images/dried flowers 12.jpeg",
    tags: ["dried"]
  },
  {
    id: "Sunset-Serenade",
    name: "Sunset Serenade",
    price: 45,
    category: "fresh",
    color:"mixed",
    description: "	A warm mix of colourful blooms creates a cheerful arrangement, perfect for celebrating mothers and loved ones.",
    image: "images/fresh flower bouquet 14.jpeg",
    tags: ["fresh"],
    occasions: ["mothers", "anniversary"]
  },
  {
    id: "Confetti",
    name: "Confetti",
    price: 90,
    category: "dried",
    color:"mixed",
    description: "	A colourful mix of dried blooms arranged in a charming basket, making a lovely decorative gift for any occasion.",
    image: "images/basket .jpeg",
    tags: ["basket-series"],
    occasions: ["mothers"]
  },
  {
    id: "Lavender-Muse",
    name: "Lavender Muse",
    price: 45,
    category: "fresh",
    color:"purple",
    description: "	Soft lavender-toned blooms create a romantic and graceful arrangement, perfect for a dreamy wedding celebration.",
    image: "images/bridal bouquet 2.jpeg",
    tags: ["wedding"],
    occasions: ["wedding"]
  },
  {
    id: "Serene-Blush",
    name: "Serene Blush",
    price: 45,
    category: "fresh",
    color:"pink",
    description: "Delicate blush flowers come together in a soft and elegant bouquet, making it a lovely gift for graduation day.",
    image: "images/fresh flower bouquet 6.jpeg",
    tags: ["graduation"],
    occasions: ["graduation"]
  },
  {
    id: "Buttercup-Dreams",
    name: "Buttercup Dreams",
    price: 45,
    category: "fresh",
    color:"yellow",
    description: "Bright yellow blooms create a cheerful arrangement filled with warmth, happiness, and a little sunshine.",
    image: "images/fresh yellow theme.jpeg",
    tags: ["fresh"]
  },
  {
    id: "Fleur-de-Nuit",
    name: "Fleur de Nuit",
    price: 55,
    category: "fresh",
    color:"purple",
    description: "Rich purple blooms create a striking and elegant arrangement, perfect for adding a touch of charm to any occasion.",
    image: "images/fresh purple theme.jpeg",
    tags: ["best-seller"]
  },
];

window.flowers = flowers;

function getFlowerById(id) {
    return flowers.find(flower => flower.id === id);
}

function getCartItems() {
  try {
    return JSON.parse(localStorage.getItem("floretteCart")) || [];
  } catch (e) {
    return [];
  }
}

function saveCartItems(items) {
  localStorage.setItem("floretteCart", JSON.stringify(items));
}

function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (!el) return;

  el.textContent = getCartItems().reduce(
    (sum, item) => sum + Number(item.quantity || 1),
    0
  );
}

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(location.search);
    const flower = getFlowerById(params.get("flower"));

    // Check whether the selected flower exists
    if (!flower) {
        document.querySelector(".product-main").innerHTML =
            "<p>Flower not found. Please return to the catalogue.</p>";
        return;
    }

    // Display the selected flower's information
    document.title = flower.name + " | Fatin's Florette";

    document.getElementById("breadcrumb-name").textContent =
        flower.name;

    const productImage = document.getElementById("product-image");

    // Product page is inside the pages folder
    productImage.src = flower.image;
    productImage.alt = flower.name;

    document.getElementById("product-category").textContent =
        flower.category.toUpperCase() + " FLOWERS";

    document.getElementById("product-name").textContent =
        flower.name;

    document.getElementById("product-description").textContent =
        flower.description || "Please contact us for more details.";

    // Quantity and price
    let quantity = 1;

    const quantityText = document.getElementById("quantity");
    const extras = document.getElementById("extra-flowers");
    const price = document.getElementById("product-price");

    function updatePrice() {
    const extraPrice = Number(extras.value) || 0;
    const giftCardPrice = Number(giftCard.value) || 0;

    const total = (
        Number(flower.price) +
        extraPrice +
        giftCardPrice
    ) * quantity;

    price.textContent = "BND " + total.toFixed(2);
}

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

    // Favourite button
    let favourites = JSON.parse(
        localStorage.getItem("floretteFavourites") || "[]"
    );

    const heart = document.getElementById("favourite-button");

    function drawHeart() {
        const isFavourite = favourites.includes(flower.id);
        heart.textContent = isFavourite ? "♥" : "♡";
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

    // Recommended products
    const recommendations = flowers
        .filter(f => f.id !== flower.id)
        .slice(0, 4);

    document.getElementById("recommendations").innerHTML =
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

    // Add selected flower to cart
    document.getElementById("add-to-cart").addEventListener("click", () => {
        const giftCard = document.getElementById("gift-card").value;
        const extraFlowers = Number(extras.value);
        const cart = getCartItems();

        const existing = cart.find(item =>
            item.id === flower.id &&
            item.giftCard === giftCard &&
            Number(item.extraFlowers) === extraFlowers
        );

        if (existing) {
            existing.quantity =
                Number(existing.quantity || 1) + quantity;
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
});
