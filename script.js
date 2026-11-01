document.addEventListener("DOMContentLoaded", function () {
// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.textContent = isOpen ? "×" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });
}

// Update footer year
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Green Score
const scoreElement = document.getElementById("greenScore");
const messageElement = document.getElementById("scoreMessage");
const actionButtons = document.querySelectorAll(".action-button");

let greenScore = Number(localStorage.getItem("ecotrackScore")) || 0;
let completedActions = [];

try {
    completedActions = JSON.parse(
        localStorage.getItem("ecotrackActions") || "[]"
    );
} catch (error) {
    completedActions = [];
}

if (!Array.isArray(completedActions)) {
    completedActions = [];
}

function updateScore() {
    if (scoreElement) {
        scoreElement.textContent = greenScore;
    }

    localStorage.setItem("ecotrackScore", String(greenScore));
    localStorage.setItem(
        "ecotrackActions",
        JSON.stringify(completedActions)
    );
}

// Restore previously completed actions
actionButtons.forEach(function (button) {
    const actionName = button.dataset.action;

    if (completedActions.includes(actionName)) {
        button.classList.add("completed");
        button.innerHTML = "✓ Completed";
        button.disabled = true;
    }

    button.addEventListener("click", function () {
        if (completedActions.includes(actionName)) {
            return;
        }

        const points = Number(button.dataset.points) || 0;

        greenScore += points;
        completedActions.push(actionName);

        button.classList.add("completed");
        button.innerHTML = "✓ Completed";
        button.disabled = true;

        updateScore();

        if (messageElement) {
            messageElement.textContent =
                "🌿 Amazing! You earned " + points +
                " green points. Keep making a difference!";
        }
    });
});

updateScore();

// Smooth navigation for internal links
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
        const targetId = link.getAttribute("href");
        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

console.log("EcoTrack is ready! 🌱");


});
