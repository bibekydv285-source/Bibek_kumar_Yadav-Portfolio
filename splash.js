// =========================================================
// splash.js
// Shows the splash on: first visit, and every page refresh.
// Hides the splash when: navigating via an internal link
// (About, Education, etc.) to another page.
// =========================================================

// ---- Part 1: tag internal link clicks BEFORE navigation ----
// Runs immediately so it catches clicks even on slow-loading pages.
document.addEventListener("click", function (e) {
    var link = e.target.closest("a[href]");
    if (!link) return;

    var isSameOrigin = link.origin === window.location.origin;
    var opensNewTab = link.target === "_blank";
    var isModifiedClick = e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1;
    var isHashOnly = link.pathname === window.location.pathname && link.hash;

    // Only tag "real" internal navigations to another page in THIS tab.
    if (isSameOrigin && !opensNewTab && !isModifiedClick && !isHashOnly) {
        sessionStorage.setItem("skipSplash", "true");
    }
}, true); // capture phase, so this always runs before the browser navigates

// ---- Part 2: splash display logic ----
(function () {
    // If we were sent here by an internal link click, skip the splash
    // and clear the flag so a later refresh on THIS page still shows it.
    if (sessionStorage.getItem("skipSplash")) {
        sessionStorage.removeItem("skipSplash");
        var existing = document.querySelector(".splash");
        if (existing) existing.remove();
        return;
    }

    var DURATION = 2000; // total splash time in ms
    var started = false;

    function runSplash() {
        if (started) return;
        started = true;

        var splash = document.querySelector(".splash");
        if (!splash) return;

        var fill = document.querySelector(".splash-fill");
        var percentLabel = document.getElementById("splashPercent");
        var start = performance.now();

        function tick(now) {
            var elapsed = now - start;
            var pct = Math.min(100, Math.round((elapsed / DURATION) * 100));
            if (fill) fill.style.width = pct + "%";
            if (percentLabel) percentLabel.textContent = pct + "%";
            if (elapsed < DURATION) {
                requestAnimationFrame(tick);
            } else {
                splash.classList.add("hide");
                splash.setAttribute("aria-hidden", "true");
                setTimeout(function () {
                    splash.remove();
                }, 600);
            }
        }
        requestAnimationFrame(tick);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", runSplash);
    } else {
        runSplash();
    }

    setTimeout(runSplash, 3000);
})();