/* ================================================================
   MOBILE NAVIGATION
   Hamburger button opens/closes the menu; the menu also closes on
   Escape, a tap outside it, choosing a link, or growing past the
   mobile breakpoint. Keeps aria-expanded in sync for screen readers.
   ================================================================ */

(function () {
    "use strict";

    var btn = document.querySelector(".navtoggle");
    var menu = document.getElementById("tabs");
    if (!btn || !menu) return;

    var MOBILE = window.matchMedia("(max-width: 980px)");

    btn.setAttribute("aria-controls", "tabs");
    btn.setAttribute("aria-expanded", "false");

    function setOpen(open) {
        menu.classList.toggle("open", open);
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        btn.innerHTML = open ? "&#10005;" : "&#9776;";
    }

    btn.addEventListener("click", function (e) {
        e.stopPropagation();
        setOpen(!menu.classList.contains("open"));
    });

    // close after choosing a link
    menu.addEventListener("click", function (e) {
        if (e.target.closest("a")) setOpen(false);
    });

    // close on a tap/click anywhere outside the header
    document.addEventListener("click", function (e) {
        if (menu.classList.contains("open") && !e.target.closest(".site-header")) setOpen(false);
    });

    // close on Escape and give focus back to the button
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && menu.classList.contains("open")) {
            setOpen(false);
            btn.focus();
        }
    });

    // rotating a tablet / resizing to desktop never leaves it stuck open
    var onChange = function () { if (!MOBILE.matches) setOpen(false); };
    if (MOBILE.addEventListener) MOBILE.addEventListener("change", onChange);
    else if (MOBILE.addListener) MOBILE.addListener(onChange);

    setOpen(false);
})();
