// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle("dark");
    // Save dark mode state to sessionStorage
    sessionStorage.setItem("darkModeEnabled", document.body.classList.contains("dark"));
}

// Check sessionStorage for dark mode state on page load
window.onload = function() {
    var darkModeEnabled = sessionStorage.getItem("darkModeEnabled");
    if (darkModeEnabled === "true") {
        document.body.classList.add("dark");
    }
};

// Add click event listener to toggle dark mode button
document.getElementById("darkModeToggle").addEventListener("click", toggleDarkMode);
