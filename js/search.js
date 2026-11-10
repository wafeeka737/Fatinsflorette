
// ===================================
// FATIN'S FLORETTE - WEBSITE SEARCH
// ===================================

const websitePages = [

    {
        title: "Home",
        url: "index.html",
        description: "Welcome to Fatin's Florette. Flowers for every feeling.",
        keywords: ["home", "welcome", "flowers", "florette"]
    },

    {
        title: "About Us",
        url: "aboutus.html",
        description: "Learn more about Fatin's Florette.",
        keywords: ["about", "about us", "story", "business"]
    },

    {
        title: "Catalogue",
        url: "catalog.html",
        description: "Explore our bouquets and flower collections.",
        keywords: ["catalogue", "flowers", "bouquets", "occasional", "lilies", "sunflowers", "dried flowers"]
    },

    {
        title: "Build a Bouquet",
        url: "custom.build.html",
        description: "Create and customise your own bouquet.",
        keywords: ["build", "customise", "customize", "personalise", "bouquet"]
    },

    {
        title: "FAQ",
        url: "faq.html",
        description: "Find answers to frequently asked questions.",
        keywords: ["faq", "delivery", "payment", "shipping", "order", "refund", "questions"]
    },

    {
        title: "Contact Us",
        url: "contact.html",
        description: "Get in touch with Fatin's Florette.",
        keywords: ["contact", "email", "phone", "message", "help"]
    },

    {
        title: "Subscription",
        url: "subscription.html",
        description: "Discover our flower subscription service.",
        keywords: ["subscription", "monthly flowers", "flower delivery"]
    }
];


// ===================================
// SEARCH FUNCTION
// ===================================

function globalSearchFlowers() {

    const searchInput = document.getElementById("globalSearch");

    if (!searchInput) return;

    const searchValue = searchInput.value.trim();

    if (searchValue === "") return;

    window.location.href =
        "search-results.html?q=" + encodeURIComponent(searchValue);
}
