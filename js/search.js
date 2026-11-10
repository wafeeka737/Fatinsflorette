
// ===================================
// FATIN'S FLORETTE - WEBSITE SEARCH
// ===================================

const websitePages = [

    {
        title: "Home",
        url: "../index.html",
        description: "Welcome to Fatin's Florette. Flowers for every feeling.",
        keywords: ["home", "welcome", "flowers", "florette"]
    },

    {
        title: "About Us",
        url: "../pages/aboutus.html",
        description: "Learn more about Fatin's Florette.",
        keywords: ["about", "about us", "story", "business"]
    },

    {
        title: "Catalogue",
        url: "../pages/catalog.html",
        description: "Explore our bouquets and flower collections.",
        keywords: ["catalogue", "flowers", "bouquets", "occasional", "lilies", "sunflowers", "dried flowers"]
    },

    {
        title: "Build a Bouquet",
        url: "../pages/custom.bouquet.html",
        description: "Create and customise your own bouquet.",
        keywords: ["build", "customise", "customize", "personalise", "bouquet"]
    },

    {
        title: "FAQ",
        url: "../pages/faq.html",
        description: "Find answers to frequently asked questions.",
        keywords: ["faq", "delivery", "payment", "shipping", "order", "refund", "questions"]
    },

    {
        title: "Contact Us",
        url: "../contact/contact.html",
        description: "Get in touch with Fatin's Florette.",
        keywords: ["contact", "email", "phone", "message", "help"]
    },

    {
        title: "Subscription",
        url: "../subscription/subscription.html",
        description: "Discover our flower subscription service.",
        keywords: ["subscription", "monthly flowers", "flower delivery"]
    }
];


// ===================================
// OPEN AND CLOSE SEARCH BAR
// ===================================

function toggleSearch() {

    const searchContainer =
        document.querySelector(".search-container");

    const searchInput =
        document.getElementById("globalSearch");

    searchContainer.classList.toggle("active");

    if (searchContainer.classList.contains("active")) {
        searchInput.focus();
    } else {
        searchInput.value = "";
    }
}

// ===================================
// SEARCH FUNCTION
// ===================================

function globalSearchFlowers() {

    const searchInput =
        document.getElementById("globalSearch");

    if (!searchInput) return;

    const searchValue =
        searchInput.value.trim().toLowerCase();

    if (searchValue === "") return;

    let bestMatch = null;
    let highestScore = 0;

    websitePages.forEach(page => {

        let score = 0;

        const title = page.title.toLowerCase();

        // Exact page title match
        if (title === searchValue) {
            score += 100;
        }

        // Partial page title match
        else if (title.includes(searchValue)) {
            score += 50;
        }

        // Keyword match
        page.keywords.forEach(keyword => {

            const word = keyword.toLowerCase();

            if (word === searchValue) {
                score += 80;
            }

            else if (word.includes(searchValue)) {
                score += 40;
            }

            else if (searchValue.includes(word)) {
                score += 20;
            }

        });

        // Description match
        if (page.description.toLowerCase().includes(searchValue)) {
            score += 10;
        }

        if (score > highestScore) {
            highestScore = score;
            bestMatch = page;
        }

    });

    if (bestMatch) {

        window.location.href = bestMatch.url;

    } else {

        alert("Sorry, no matching page found. Please try another search.");

    }

}

// ===================================
// PRESS ENTER TO SEARCH
// ===================================

document.addEventListener("DOMContentLoaded", function() {

    const searchInput =
        document.getElementById("globalSearch");

    if (searchInput) {

        searchInput.addEventListener("keydown", function(event) {

            if (event.key === "Enter") {
                globalSearchFlowers();
            }

        });

    }

});
