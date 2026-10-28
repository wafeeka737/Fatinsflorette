const flowers = [
  {
    id: "Fresh-Lily-bouquet",
    name: "Fresh Lily Bouquet",
    price: 35,
    category: "fresh",
    color: "pink",
    tagline: "Pure elegance in every bloom.",
    image: "images/lilies 1.jpeg",
    tags: ["best-seller"],
    occasions: []
},
  {
    id: "Sunflower-bouquet",
    name: "Sunflower Bouquet",
    price: 50,
    category: "fresh",
    color: "mixed",
    tagline: "Golden blooms, timeless beauty.",
    description: "A romantic composition of roses and seasonal blooms in soft colours, finished with an elegant wrap.",
    image: "images/sunflower bouquet 1.jpeg",
    tags: ["best-seller"],
    occasions: []
  },
  {
    id: "Rose-bouquet",
    name: "Rose Bouquet",
    price: 45,
    category: "fresh",
    color: "mixed",
    tagline: "Simply, roses",
    description: "Cream roses and delicate peach blooms are paired with eucalyptus for a calm, timeless look.",
    image: "images/rose 1.jpeg",
    tags: ["best-seller"],
    occasions: []
  },
  {
    id: "peonies-bouquet",
    name: "Peonies Bouquet",
    price: 100,
    category: "fresh",
    color: "pink",
    tagline: "Peonies in their prettiest form",
    description: "A soft pastel bouquet of roses and gypsophila, wrapped in blush paper for a gentle and romantic finish.",
    image: "images/peonies 2.jpeg",
    tags: ["best-seller", "seasonal"],
    occasions: []
  },
  {
    id: "lilac-roses",
    name: "Lilac Roses",
    price: 45,
    category: "fresh",
    color: "purple",
    tagline: "A touch of lilac",
    description: "Pink and white roses arranged together in a classic bouquet, perfect for anniversaries, birthdays, and thoughtful surprises.",
    image: "images/fresh purple bouquet.jpeg",
    tags: ["best-seller"],
    occasions: []
  },
  {
    id: "mixed-flower-bouquet",
    name: "Mixed Flower Bouquet",
    price: 90,
    category: "fresh",
    color: "mixed",
    tagline: "Colours that complement.",
    description: "Soft pink and ivory roses with eucalyptus and delicate filler flowers, wrapped in blush paper.",
    image: "images/fresh mixed bouquet.jpeg",
    tags: ["best-seller"],
    occasions: []
  },
  {
    id: "pastel-poetry",
    name: " Pastel Poetry",
    price: 70,
    category: "fresh",
    color: "pink",
    tagline: "A palette of pastels.",
    description: "A fresh, airy arrangement of roses, gypsophila, and eucalyptus for an effortlessly elegant gift.",
    image: "images/pastel theme 2.jpeg",
    tags: ["best-seller"],
    occasions: []
  },
  {
    id: "basket-fresh-flowers",
    name: "Basket Fresh Flowers",
    price: 100,
    category: "basket-series",
    color: "pink",
    tagline: "A basket of blooms.",
    description: "Bright pink tulips arranged in a full bouquet to bring a feeling of freshness, happiness, and joy.",
    image: "images/basket fresh flowers 1.jpeg",
    tags: ["basket-series"],
    occasions: []
  },
  {
    id: "dried-daydream",
    name: "Dried Daydream",
    price: 50,
    category: "dried",
    color: "pink",
    tagline: "Natural dried stems in warm neutral tones.",
    description: "A low-maintenance dried arrangement in warm, earthy shades. A lovely keepsake that lasts beyond the occasion.",
    image: "images/dried flowers 5.jpeg",
    tags: ["dried"],
    occasions: []
  },
  {
    id: "Sunset",
    name: "Sunset",
    price: 40,
    category: "dried",
    color: "mixed",
    tagline: "Golden and beige dried flowers.",
    description: "Golden grasses and dried florals create a warm arrangement with a relaxed, natural feel.",
    image: "images/dried flowers 6.jpeg",
    tags: ["dried"],
    occasions: []
  },
  {
    id: "everlasting-blush",
    name: "Everlasting Blush",
    price: 65,
    category: "artificial",
    color: "pink",
    tagline: "Blush blooms with a lasting finish.",
    description: "A decorative artificial bouquet in blush and cream tones, made to brighten a room without the upkeep of fresh flowers.",
    image: "images/artificial flower basket 2.jpeg",
    tags: ["artificial", "basket series"],
    occasions: []
  },
  {
    id: "Lilac-letters",
    name: "Lilac Letters",
    price: 50,
    category: "artificial",
    color: "purple",
    tagline: "Peach roses and seasonal pastel blooms.",
    description: "A warm, cheerful mix of peach roses and seasonal pastel flowers, suitable for birthdays and celebrations.",
    image: "images/artificial flowers 1.jpeg",
    tags: ["artificial"],
    occasions: []
  },
  {
    id: "sunset-kiss",
    name: "Sunset Kiss",
    price: 50,
    category: "artificial",
    color: "purple",
    tagline: "Peach roses and seasonal pastel blooms.",
    description: "A warm, cheerful mix of peach roses and seasonal pastel flowers, suitable for birthdays and celebrations.",
    image: "images/artificial flower basket 1.jpeg",
    tags: ["artificial", "basket series"],
    occasions: []
  },
  {
    id: "sweet-on-you",
    name: "Sweet On You",
    price: 50,
    category: "petals-pastries",
    color:"purple",
    tagline: "Peach roses and seasonal pastel blooms.",
    description: "A warm, cheerful mix of peach roses and seasonal pastel flowers, suitable for birthdays and celebrations.",
    image: "images/cake in bloom.jpeg",
    tags: ["Petals & Pastries"],
    occasions: []
  },
  {
    id: "sunday-coffee",
    name: "Sunday Coffee",
    price: 50,
    category: "petals-pastries",
    color:"purple",
    tagline: "Peach roses and seasonal pastel blooms.",
    description: "A warm, cheerful mix of peach roses and seasonal pastel flowers, suitable for birthdays and celebrations.",
    image: "images/petals and pastries 2.jpeg",
    tags: ["Petals & Pastries"],
    occasions: []
  },
  {
    id: "yellow-bloom",
    name: "Yellow Bloom",
    price: 50,
    category: "petals-pastries",
    color:"purple",
    tagline: "Peach roses and seasonal pastel blooms.",
    description: "A warm, cheerful mix of peach roses and seasonal pastel flowers, suitable for birthdays and celebrations.",
    image: "images/petals and pastries 3.jpeg",
    tags: ["Petals & Pastries"],
    occasions: []
  },
  {
    id: "bloom-sip",
    name: "Bloom Sip",
    price: 38,
    category: "petals-pastries",
    color:"purple",
    tagline: "Peach roses and seasonal pastel blooms.",
    description: "A warm, cheerful mix of peach roses and seasonal pastel flowers, suitable for birthdays and celebrations.",
    image: "images/petals and pastries 15.jpeg",
    tags: ["Petals & Pastries"],
    occasions: []
  },
  {
    id: "just-because",
    name: "Just-Because",
    price: 38,
    category: "petals-pastries",
    color:"Red",
    tagline: "Peach roses and seasonal pastel blooms.",
    description: "A warm, cheerful mix of peach roses and seasonal pastel flowers, suitable for birthdays and celebrations.",
    image: "images/petals and pastries 8.jpeg",
    tags: ["Petals & Pastries"],
    occasions: []
  },
   {
    id: "for-you",
    name: "For You",
    price: 38,
    category: "petals-pastries",
    color:"pink",
    tagline: "Peach roses and seasonal pastel blooms.",
    description: "A warm, cheerful mix of peach roses and seasonal pastel flowers, suitable for birthdays and celebrations.",
    image: "images/petals and pastries 7.jpeg",
    tags: ["Petals & Pastries"],
    occasions: []
  },
  {
    id: "bloom-&amp-butter",
    name: "Bloom &amp Butter",
    price: 38,
    category: "petals-pastries",
    color:"Green",
    tagline: "Peach roses and seasonal pastel blooms.",
    description: "A warm, cheerful mix of peach roses and seasonal pastel flowers, suitable for birthdays and celebrations.",
    image: "images/petals and pastries 12.jpeg",
    tags: ["Petals & Pastries"],
    occasions: []
  },
  {
    id: "Backburner",
    name: "Backburner",
    price: 38,
    category: "petals-pastries",
    color:"purple",
    tagline: "Peach roses and seasonal pastel blooms.",
    description: "A warm, cheerful mix of peach roses and seasonal pastel flowers, suitable for birthdays and celebrations.",
    image: "images/petals and pastries 13.jpeg",
    tags: ["Petals & Pastries"],
    occasions: []
  },
  {
    id: "Backburner",
    name: "Backburner",
    price: 38,
    category: "basket-series",
    color:"pink",
    tagline: "Peach roses and seasonal pastel blooms.",
    description: "A warm, cheerful mix of peach roses and seasonal pastel flowers, suitable for birthdays and celebrations.",
    image: "images/basket fresh flowers 3.jpeg",
    tags: ["basket series"],
    occasions: ["anniversary"]
  },
  {
    id: "frontburner",
    name: "frontburner",
    price: 38,
    category: "basket-series",
    color:"pink",
    tagline: "Peach roses and seasonal pastel blooms.",
    description: "A warm, cheerful mix of peach roses and seasonal pastel flowers, suitable for birthdays and celebrations.",
    image: "images/basket fresh flowers 4.jpeg",
    tags: ["basket series"],
    occasions: ["birthday"]
  },
  {
    id: "sunflower",
    name: "sunflower",
    price: 50,
    category: "fresh",
    color:"yellow",
    tagline: "sunflower",
    description: "sunflower",
    image: "images/sunflower 4.jpeg",
    tags: ["Petals & Pastries"],
    occasions: ["graduation"]
  },
  {
    id: "carnation",
    name: "carnation",
    price: 900,
    category: "fresh",
    color:"mixed",
    tagline: "carnation",
    description: "carnation",
    image: "images/fresh flower bouquet 4.jpeg",
    tags: ["Petals & Pastries"],
    occasions: ["teachers", "mothers"]
  },
  {
    id: "wedding",
    name: "wedding",
    price: 900,
    category: "fresh",
    color:"white",
    tagline: "wedding",
    description: "wedding",
    image: "images/bridal bouquet 2.jpeg",
    tags: ["wedding"],
    occasions: ["wedding"]
  },
  {
    id: "papal",
    name: "papal",
    price: 900,
    category: "fresh",
    color:"purple",
    tagline: "gift",
    description: "gift",
    image: "images/fresh flower bouquet 7.jpeg",
    tags: ["best-seller"],
    occasions: ["mothers"]
  },
  {
    id: "bridal",
    name: "bridal",
    price: 900,
    category: "fresh",
    color:"white",
    tagline: "wedding",
    description: "bridal",
    image: "images/bridal bouquet 4.jpeg",
    tags: ["best-seller"],
    occasions: ["wedding"]
  },
  {
    id: "hydrangea",
    name: "hydrangea",
    price: 800,
    category: "fresh",
    color:"white",
    tagline: "engagement",
    description: "engagement",
    image: "images/bridal bouquet 5.jpeg",
    tags: ["wedding"],
    occasions: ["wedding"]
  },
  {
    id: "wed",
    name: "wed",
    price: 700,
    category: "fresh",
    color:"blue",
    tagline: "engagement",
    description: "engagement",
    image: "images/bridal bouquet 6.jpeg",
    tags: ["wedding"],
    occasions: ["wedding"]
  },
  {
    id: "basket",
    name: "basket",
    price: 600,
    category: "basket-series",
    color:"yellow",
    tagline: "basket",
    description: "bas",
    image: "images/basket fresh flowers 5.jpeg",
    tags: ["basket series"]
  },
  {
    id: "hand",
    name: "hand",
    price: 600,
    category: "fresh",
    color:"pink",
    tagline: "basket",
    description: "bas",
    image: "images/basket fresh flowers 5.jpeg",
    tags: ["basket series"],
  },
  {
    id: "dry",
    name: "dry",
    price: 600,
    category: "dried",
    color:"pink",
    tagline: "dry",
    description: "bas",
    image: "images/dried flowers 7.jpeg",
    tags: ["dried"]
  },
  {
    id: "fav",
    name: "fav",
    price: 600,
    category: "dried",
    color:"blue",
    tagline: "dry",
    description: "fav",
    image: "images/dried flowers 8.jpeg",
    tags: ["dried"],
  },
  {
    id: "lily",
    name: "lily",
    price: 600,
    category: "fresh",
    color:"white",
    tagline: "white",
    description: "white",
    image: "images/fresh flower bouquet 8.jpeg",
    tags: ["anniversary"],
    occasions: ["anniversary"]
  },
  {
    id: "rose",
    name: "rose",
    price: 600,
    category: "fresh",
    color:"white",
    tagline: "white",
    description: "white",
    image: "images/bridal bouquet 8.jpeg",
    tags: ["wedding"],
    occasions: ["wedding"]
  },
  {
    id: "roses",
    name: "roses",
    price: 600,
    category: "fresh",
    color:"red",
    tagline: "white",
    description: "white",
    image: "images/bridal bouquet 9.jpeg",
    tags: ["wedding"],
    occasions: ["wedding"]
  },
  {
    id: "blu",
    name: "blu",
    price: 600,
    category: "dried",
    color:"blue",
    tagline: "blue",
    description: "blue",
    image: "images/dried flowers 10.jpeg",
    tags: ["best-seller"],
  },
  {
    id: "orchid",
    name: "orchid",
    price: 600,
    category: "fresh",
    color:"mixed",
    tagline: "tcr",
    description: "tcr",
    image: "images/fresh flower bouquet 9.jpeg",
    tags: ["fresh"],
    occasions: ["mothers"]
  },
  {
    id: "sun",
    name: "sun",
    price: 600,
    category: "artificial",
    color:"yellow",
    tagline: "home deco",
    description: "yello",
    image: "images/artificial flower 3.jpeg",
    tags: ["artificial"]
  },
  {
    id: "orange",
    name: "orange",
    price: 600,
    category: "fresh",
    color:"yellow",
    tagline: "oranges",
    description: "fresh orange",
    image: "images/fresh flower bouquet 10.jpeg",
    tags: ["fresh"]
  },
  {
    id: "wedd",
    name: "wedd",
    price: 600,
    category: "dried",
    color:"pruple",
    tagline: "wedd",
    description: "dried wed",
    image: "images/bridal bouquet 10.jpeg",
    tags: ["wedding"],
    occasions: ["wedding"]
  },
  {
    id: "dingg",
    name: "dingg",
    price: 600,
    category: "fresh",
    color:"white",
    tagline: "wedd",
    description: " wed",
    image: "images/bridal bouquet 11.jpeg",
    tags: ["wedding"],
    occasions: ["wedding"]
  },
  {
    id: "wedding-lily",
    name: "wedding lily",
    price: 600,
    category: "fresh",
    color:"purple",
    tagline: "wedd",
    description: "purple wed",
    image: "images/bridal bouquet 12.jpeg",
    tags: ["wedding"],
    occasions: ["wedding"]
  },
  {
    id: "gents",
    name: "gents",
    price: 600,
    category: "fresh",
    color:"blue",
    tagline: "for the gets",
    description: "gentlemen",
    image: "images/fresh flower bouquet 11.jpeg",
    tags: ["anniversary"],
    occasions: ["anniversary"]
  },
  {
    id: "lads",
    name: "lads",
    price: 600,
    category: "fresh",
    color:"blue",
    tagline: "for the lads",
    description: "ladies",
    image: "images/fresh flower bouquet 13.jpeg",
    tags: ["fresh"],
    occasions: ["anniversary", "mothers","graduation"]
  },
  {
    id: "home",
    name: "ladhomes",
    price: 600,
    category: "dried",
    color:"mixed",
    tagline: "for the home",
    description: "home",
    image: "images/dried flowers 12.jpeg",
    tags: ["dried"]
  },
  {
    id: "mom",
    name: "mom",
    price: 600,
    category: "fresh",
    color:"mixed",
    tagline: "for the moms",
    description: "momsies",
    image: "images/fresh flower bouquet 14.jpeg",
    tags: ["fresh"],
    occasions: ["mothers", "anniversary"]
  },
  {
    id: "mom",
    name: "mom",
    price: 600,
    category: "dried",
    color:"mixed",
    tagline: "for the aunt",
    description: "foyou",
    image: "images/basket .jpeg",
    tags: ["basket-series"],
  },
  {
    id: "wed",
    name: "wed",
    price: 600,
    category: "fresh",
    color:"purple",
    tagline: "for the wed",
    description: "wed",
    image: "images/bridal bouquet 2.jpeg",
    tags: ["wedding"],
    occasions: ["wedding"]
  },
  {
    id: "grad",
    name: "grad",
    price: 600,
    category: "fresh",
    color:"pink",
    tagline: "for the grad",
    description: "grad",
    image: "images/fresh flower bouquet 6.jpeg",
    tags: ["graduation"],
    occasions: ["graduation"]
  },
  {
    id: "sunshine",
    name: "sunshine",
    price: 600,
    category: "fresh",
    color:"yellow",
    tagline: "for the sun",
    description: "shine",
    image: "images/fresh yellow theme.jpeg",
    tags: ["fresh"]
  },
  {
    id: "grape",
    name: "grape",
    price: 600,
    category: "fresh",
    color:"purple",
    tagline: "for the grape",
    description: "grape",
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

    document.getElementById("product-tagline").textContent =
        flower.tagline || "";

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
