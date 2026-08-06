/* ================================================================
   CONTACT FORM -> WHATSAPP REDIRECT
   Intercepts the "Send a Message" form submit, builds a pre-filled
   WhatsApp message from the entered fields, and opens wa.me with it.
   ================================================================ */

(function () {
    "use strict";

    // Your WhatsApp number in international format, no + or leading 00
    var whatsappNumber = "9779763244805";

    document.addEventListener("DOMContentLoaded", function () {
        var form = document.getElementById("whatsappContactForm");
        if (!form) return;

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            var nameEl = document.getElementById("cf-name");
            var emailEl = document.getElementById("cf-email");
            var phoneEl = document.getElementById("cf-phone");
            var subjectEl = document.getElementById("cf-subject");
            var messageEl = document.getElementById("cf-message");

            var name = nameEl.value.trim();
            var email = emailEl.value.trim();
            var phone = phoneEl.value.trim();
            var subject = subjectEl.value.trim();
            var message = messageEl.value.trim();

            if (!name || !email || !message) {
                alert("Please fill in your name, email, and message.");
                return;
            }

            var lines = [
                "New message from portfolio site:",
                "",
                "Name: " + name,
                "Email: " + email
            ];

            if (phone) lines.push("Phone: " + phone);
            if (subject) lines.push("Subject: " + subject);

            lines.push("");
            lines.push("Message:");
            lines.push(message);

            var text = encodeURIComponent(lines.join("\n"));
            var url = "https://wa.me/" + whatsappNumber + "?text=" + text;

            window.open(url, "_blank", "noopener");

            form.reset();
        });
    });
})();
