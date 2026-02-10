// Add all cookies on page load
for (let i = 0; i < 5; i++) document.cookie = "essential" + i + "=value" + i;

for (let i = 0; i < 5; i++) document.cookie = "advertisment" + i + "=value" + i;

for (let i = 0; i < 5; i++) document.cookie = "social_networking" + i + "=value" + i;

for (let i = 0; i < 5; i++) document.cookie = "biometrics" + i + "=value" + i;

// Function to clear all cookies and simulate incognito mode
function clearAllCookies() {
    // Delete all cookies
    document.cookie.split(";").forEach(function(cookie) {
        const cookieName = cookie.split("=")[0].trim();
        document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });

    // Clear localStorage and sessionStorage (incognito mode behavior)
    localStorage.clear();
    sessionStorage.clear();

    // Reload the page to simulate fresh incognito session
    location.reload();
}

// Update cookie count display (only __privaci_* cookies)
function updateCookieCount() {
    const cookies = document.cookie ? document.cookie.split(";") : [];
    const privaciCount = cookies.filter(cookie => {
        const name = cookie.split("=")[0].trim();
        return name.startsWith("__privaci_");
    }).length;

    const countElement = document.getElementById("cookieCount");
    if (countElement) {
        countElement.textContent = privaciCount;
    }
}

// Display __privaci_* cookies with JSON beautification
function displayPrivaciCookies() {
    const cookies = document.cookie.split(";");
    const privaciCookies = [];

    cookies.forEach(cookie => {
        const [name, ...valueParts] = cookie.split("=");
        const trimmedName = name.trim();

        if (trimmedName.startsWith("__privaci_")) {
            const value = valueParts.join("=").trim();

            // Try to parse as JSON and beautify
            let displayValue = value;
            try {
                const parsed = JSON.parse(decodeURIComponent(value));
                displayValue = JSON.stringify(parsed, null, 2);
            } catch (e) {
                // Not JSON or can't parse, use as-is
                displayValue = value;
            }

            privaciCookies.push({ name: trimmedName, value: displayValue });
        }
    });

    const privaciElement = document.getElementById("privaciCookies");
    if (privaciElement) {
        if (privaciCookies.length === 0) {
            privaciElement.innerHTML = '<em style="color: #94a3b8;">No privacy cookies found</em>';
        } else {
            privaciElement.innerHTML = privaciCookies.map(cookie => `
                <div style="margin-bottom: 15px; padding: 10px; background: #fff; border-radius: 6px; border-left: 3px solid #6366f1;">
                    <strong style="color: #6366f1;">${cookie.name}</strong>
                    <pre style="margin: 8px 0 0 0; padding: 8px; background: #f1f5f9; border-radius: 4px; overflow-x: auto; font-size: 0.85rem;">${cookie.value}</pre>
                </div>
            `).join('');
        }
    }
}

// Update count and privacy cookies on load and periodically
updateCookieCount();
displayPrivaciCookies();
setInterval(() => {
    updateCookieCount();
    displayPrivaciCookies();
}, 1000);
