document.addEventListener("DOMContentLoaded", function () {
    const quizForm = document.querySelector("#flower-quiz-form");
    const quizResult = document.querySelector("#quiz-result");
    const resultTitle = document.querySelector("#result-title");
    const resultDescription = document.querySelector("#result-description");
    const resultDetails = document.querySelector("#result-details");
    const retakeButton = document.querySelector("#retake-quiz");

    if (
        !quizForm ||
        !quizResult ||
        !resultTitle ||
        !resultDescription ||
        !resultDetails ||
        !retakeButton
    ) {
        return;
    }

    const flowerStyles = {
        bright: {
            title: "Bright & Cheerful Blooms 🌼",
            description:
                "You might love colourful arrangements that feel lively, joyful and full of personality.",
            suggestions:
                "Style idea: explore vibrant colours and mixed-flower arrangements."
        },

        romantic: {
            title: "Classic & Romantic Blooms 🌹",
            description:
                "You might prefer timeless arrangements with an elegant, romantic feeling.",
            suggestions:
                "Style idea: explore rose-inspired designs and classic colour combinations."
        },

        simple: {
            title: "Sweet & Simple Blooms 🌷",
            description:
                "You might enjoy delicate arrangements that feel natural, thoughtful and understated.",
            suggestions:
                "Style idea: explore smaller bouquets with a simple, elegant look."
        },

        pastel: {
            title: "Soft Pastel Blooms 🪻",
            description:
                "You might love gentle colours and dreamy arrangements with a soft, delicate look.",
            suggestions:
                "Style idea: explore blush pink, cream and other soft colour combinations."
        }
    };

    const occasionMessages = {
        birthday: "For a birthday, consider something cheerful and celebratory.",
        romance: "For a romantic occasion, consider a thoughtful and elegant arrangement.",
        celebration: "For a celebration, consider flowers that make the moment feel special.",
        "just-because": "For no particular reason, a little bouquet can be a lovely surprise.",
        other: "Choose an arrangement that reflects the person and the meaning behind your gift."
    };

    const budgetMessages = {
        "budget-friendly":
            "Start by exploring simpler arrangements that fit your budget.",
        "mid-range":
            "Compare different bouquet sizes and designs to find the right balance.",
        flexible:
            "Explore different arrangements and confirm the final price before ordering."
    };

    quizForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!quizForm.reportValidity()) {
            return;
        }

        const formData = new FormData(quizForm);

        const selectedStyle = formData.get("style");
        const selectedBudget = formData.get("budget");
        const selectedOccasion = formData.get("occasion");

        const flowerMatch = flowerStyles[selectedStyle];

        if (!flowerMatch) {
            return;
        }

        resultTitle.textContent = flowerMatch.title;
        resultDescription.textContent = flowerMatch.description;

        resultDetails.textContent =
            flowerMatch.suggestions +
            " " +
            occasionMessages[selectedOccasion] +
            " " +
            budgetMessages[selectedBudget];

        quizResult.hidden = false;

        quizResult.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });

    retakeButton.addEventListener("click", function () {
        quizForm.reset();
        quizResult.hidden = true;

        quizForm.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});
