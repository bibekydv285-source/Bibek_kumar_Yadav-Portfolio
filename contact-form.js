/* ================================================================
   CONTACT FORM -> WHATSAPP
   Validates the "Send a Message" form, then opens wa.me with a
   pre-filled WhatsApp message to my number. No email, no backend.
   Also handles the topic chips, the character counter, the inline
   status line and the "almost done" panel.
   ================================================================ */

(function () {
    "use strict";

    var WHATSAPP_NUMBER = "9779763244805"; // international format, no + or 00

    document.addEventListener("DOMContentLoaded", function () {
        var form = document.getElementById("whatsappContactForm");
        if (!form) return;

        var $ = function (id) { return document.getElementById(id); };
        var nameEl = $("cf-name");
        var emailEl = $("cf-email");
        var phoneEl = $("cf-phone");
        var subjectEl = $("cf-subject");
        var messageEl = $("cf-message");
        var statusEl = $("cf-status");
        var countEl = $("cf-count");
        var successEl = $("cf-success");
        var againBtn = $("cf-again");
        var topics = form.querySelectorAll(".cf-topic");

        var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        /* ---------- helpers ---------- */
        function setStatus(text, type) {
            if (!statusEl) return;
            statusEl.textContent = text;
            statusEl.className = "cf-status" + (type ? " is-" + type : "");
        }

        function updateCount() {
            if (!countEl || !messageEl) return;
            var max = messageEl.getAttribute("maxlength") || 1000;
            countEl.textContent = messageEl.value.length + " / " + max;
        }

        function clearTopics() {
            Array.prototype.forEach.call(topics, function (b) {
                b.setAttribute("aria-pressed", "false");
            });
        }

        function markInvalid(el, bad) {
            el.closest(".cf-field").classList.toggle("is-invalid", bad);
            el.setAttribute("aria-invalid", bad ? "true" : "false");
        }

        // Returns the field values, or null (and shows an error) if invalid
        function validate() {
            var d = {
                name: nameEl.value.trim(),
                email: emailEl.value.trim(),
                phone: phoneEl.value.trim(),
                subject: subjectEl.value.trim(),
                message: messageEl.value.trim()
            };
            var badName = !d.name;
            var badEmail = !EMAIL_RE.test(d.email);
            var badMsg = !d.message;
            markInvalid(nameEl, badName);
            markInvalid(emailEl, badEmail);
            markInvalid(messageEl, badMsg);

            if (badName || badEmail || badMsg) {
                setStatus(badEmail && d.email
                    ? "Please enter a valid email address so I can reply."
                    : "Please fill in your name, email and message.", "error");
                (badName ? nameEl : badEmail ? emailEl : messageEl).focus();
                return null;
            }
            return d;
        }

        function resetForm() {
            form.reset();
            clearTopics();
            updateCount();
            [nameEl, emailEl, messageEl].forEach(function (el) { markInvalid(el, false); });
        }

        /* ---------- topic chips fill the Subject ---------- */
        Array.prototype.forEach.call(topics, function (btn) {
            btn.addEventListener("click", function () {
                var wasActive = btn.getAttribute("aria-pressed") === "true";
                clearTopics();
                if (wasActive) {
                    if (subjectEl.value === btn.dataset.topic) subjectEl.value = "";
                } else {
                    btn.setAttribute("aria-pressed", "true");
                    subjectEl.value = btn.dataset.topic;
                }
            });
        });

        // live counter + clear the red state as the visitor fixes a field
        messageEl.addEventListener("input", updateCount);
        [nameEl, emailEl, messageEl].forEach(function (el) {
            el.addEventListener("input", function () {
                if (el.closest(".cf-field").classList.contains("is-invalid")) {
                    markInvalid(el, el === emailEl ? !EMAIL_RE.test(el.value.trim()) : !el.value.trim());
                }
            });
        });
        updateCount();

        /* ---------- Send via WhatsApp ---------- */
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            var d = validate();
            if (!d) return;

            var lines = [
                "New message from portfolio site:",
                "",
                "Name: " + d.name,
                "Email: " + d.email
            ];
            if (d.phone) lines.push("Phone: " + d.phone);
            if (d.subject) lines.push("Subject: " + d.subject);
            lines.push("", "Message:", d.message);

            window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");

            resetForm();
            setStatus("", "");
            if (successEl) {
                form.hidden = true;
                successEl.hidden = false;
                if (againBtn) againBtn.focus();
            }
        });

        /* ---------- Send another ---------- */
        if (againBtn) {
            againBtn.addEventListener("click", function () {
                successEl.hidden = true;
                form.hidden = false;
                nameEl.focus();
            });
        }
    });
})();
