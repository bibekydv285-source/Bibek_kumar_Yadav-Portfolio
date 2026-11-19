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

    var DURATION = 2400; // time for the progress bar to fill, in ms
    var HOLD = 350;      // short "Ready!" pause before the splash leaves
    var started = false;

    // loading messages shown as the bar fills
    var STEPS = [
        [0, "Loading portfolio…"],
        [30, "Fetching projects…"],
        [60, "Polishing pixels…"],
        [90, "Almost there…"],
        [100, "Ready!"]
    ];

    function runSplash() {
        if (started) return;
        started = true;

        var splash = document.querySelector(".splash");
        if (!splash) return;

        var fill = document.querySelector(".splash-fill");
        var percentLabel = document.getElementById("splashPercent");
        var statusLabel = document.getElementById("splashStatus");
        var start = performance.now();
        var lastStatus = "";

        function finish() {
            splash.classList.add("hide");
            splash.setAttribute("aria-hidden", "true");
            setTimeout(function () {
                splash.remove();
            }, 750);
        }

        // a timer (not requestAnimationFrame) so progress keeps moving even when
        // a phone throttles animation frames (battery saver, app switching)
        var timer = setInterval(function () { tick(performance.now()); }, 30);

        function tick(now) {
            var t = Math.min(1, (now - start) / DURATION);
            var eased = 1 - Math.pow(1 - t, 2); // fast start, gentle finish
            var pct = Math.round(eased * 100);
            if (fill) fill.style.width = pct + "%";
            if (percentLabel) percentLabel.textContent = pct + "%";

            if (statusLabel) {
                var text = STEPS[0][1];
                for (var i = 0; i < STEPS.length; i++) {
                    if (pct >= STEPS[i][0]) text = STEPS[i][1];
                }
                if (text !== lastStatus) {
                    statusLabel.textContent = text;
                    lastStatus = text;
                }
            }

            if (t >= 1 && !splash.classList.contains("is-ready")) {
                clearInterval(timer);
                splash.classList.add("is-ready");
                setTimeout(finish, HOLD);
            }
        }

        // safety net: never leave the splash up if animation frames are throttled
        setTimeout(function () {
            if (document.body.contains(splash) && !splash.classList.contains("hide")) finish();
        }, DURATION + HOLD + 2500);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", runSplash);
    } else {
        runSplash();
    }

    setTimeout(runSplash, 3000);
})();