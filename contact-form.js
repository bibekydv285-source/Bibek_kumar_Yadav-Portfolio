/* ================================================================
   CONTACT FORM
   - "Send Message": emails the message to my inbox through
     FormSubmit (https://formsubmit.co), no backend needed.
   - "WhatsApp": opens wa.me with the same message pre-filled.
   Also handles the topic chips, the character counter, the
   inline status line and the success panel.
   ================================================================ */

(function () {
    "use strict";

    var EMAIL_TO = "bibekydv51@gmail.com";
    var ENDPOINT = "https://formsubmit.co/ajax/" + EMAIL_TO;
    var WHATSAPP_NUMBER = "9779763244805"; // international format, no + or 00
    var TIMEOUT_MS = 15000;

    document.addEventListener("DOMContentLoaded", function () {
        var form = document.getElementById("whatsappContactForm");
        if (!form) return;

        var $ = function (id) { return document.getElementById(id); };
        var nameEl = $("cf-name");
        var emailEl = $("cf-email");
        var phoneEl = $("cf-phone");
        var subjectEl = $("cf-subject");
        var messageEl = $("cf-message");
        var honeyEl = $("cf-company");
        var statusEl = $("cf-status");
        var countEl = $("cf-count");
        var sendBtn = $("cf-send");
        var waBtn = $("cf-whatsapp");
        var successEl = $("cf-success");
        var successText = $("cf-success-text");
        var againBtn = $("cf-again");
        var topics = form.querySelectorAll(".cf-topic");

        var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        /* ---------- helpers ---------- */
        function setStatus(text, type) {
            if (!statusEl) return;
            statusEl.innerHTML = "";
            if (typeof text === "string") statusEl.textContent = text;
            else if (text) statusEl.appendChild(text);
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

        function readFields() {
            return {
                name: nameEl.value.trim(),
                email: emailEl.value.trim(),
                phone: phoneEl.value.trim(),
                subject: subjectEl.value.trim(),
                message: messageEl.value.trim()
            };
        }

        // Returns the field values, or null (and shows an error) if invalid
        function validate() {
            var d = readFields();
            var badName = !d.name;
            var badEmail = !EMAIL_RE.test(d.email);
            var badMsg = !d.message;
            markInvalid(nameEl, badName);
            markInvalid(emailEl, badEmail);
            markInvalid(messageEl, badMsg);

            if (badName || badEmail || badMsg) {
                var msg = badEmail && d.email
                    ? "Please enter a valid email address so I can reply."
                    : "Please fill in your name, email and message.";
                setStatus(msg, "error");
                (badName ? nameEl : badEmail ? emailEl : messageEl).focus();
                return null;
            }
            return d;
        }

        function setLoading(on) {
            sendBtn.classList.toggle("is-loading", on);
            sendBtn.disabled = on;
            waBtn.disabled = on;
            sendBtn.querySelector(".cf-submit-text").textContent = on ? "Sending…" : "Send Message";
        }

        function resetForm() {
            form.reset();
            clearTopics();
            updateCount();
            [nameEl, emailEl, messageEl].forEach(function (el) { markInvalid(el, false); });
        }

        function showSuccess(d) {
            successText.textContent = "Thanks " + d.name.split(" ")[0] +
                "! Your message is in my inbox. I'll reply to " + d.email + " soon.";
            form.hidden = true;
            successEl.hidden = false;
            againBtn.focus();
        }

        function mailtoFallback(d) {
            var body = d.message + "\n\n" + d.name + (d.phone ? "\n" + d.phone : "");
            var a = document.createElement("a");
            a.href = "mailto:" + EMAIL_TO + "?subject=" +
                encodeURIComponent(d.subject || "Portfolio enquiry") + "&body=" + encodeURIComponent(body);
            a.textContent = "send it from your email app";
            var wrap = document.createElement("span");
            wrap.appendChild(document.createTextNode("Sorry, the message couldn't be sent right now. Please try again, or "));
            wrap.appendChild(a);
            wrap.appendChild(document.createTextNode("."));
            return wrap;
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

        /* ---------- Send Message -> email via FormSubmit ---------- */
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            if (sendBtn.disabled) return;

            var d = validate();
            if (!d) return;

            // Bots fill the hidden field; pretend success and drop it
            if (honeyEl && honeyEl.value) {
                showSuccess(d);
                resetForm();
                return;
            }

            setLoading(true);
            setStatus("", "");

            var controller = "AbortController" in window ? new AbortController() : null;
            var timer = setTimeout(function () { if (controller) controller.abort(); }, TIMEOUT_MS);

            fetch(ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify({
                    name: d.name,
                    email: d.email,            // FormSubmit uses this as the reply-to address
                    phone: d.phone || "Not given",
                    topic: d.subject || "Not given",
                    message: d.message,
                    _subject: "New portfolio message from " + d.name + (d.subject ? " – " + d.subject : ""),
                    _template: "table",
                    _captcha: "false",
                    _honey: ""
                }),
                signal: controller ? controller.signal : undefined
            })
                .then(function (res) {
                    return res.json().catch(function () { return {}; }).then(function (data) {
                        return { ok: res.ok, data: data };
                    });
                })
                .then(function (r) {
                    var msg = (r.data && r.data.message) || "";
                    var ok = r.ok && (r.data.success === true || r.data.success === "true");
                    if (/activat/i.test(msg)) {
                        // Not delivered yet: FormSubmit has only emailed the owner an
                        // "Activate Form" link (it can report success:true for this).
                        setStatus("Almost there! This form is waiting for a one-time activation by the site owner, so your message wasn't delivered yet. Please use WhatsApp for now.", "error");
                    } else if (ok) {
                        showSuccess(d);
                        resetForm();
                    } else {
                        setStatus(mailtoFallback(d), "error");
                    }
                })
                .catch(function () {
                    setStatus(mailtoFallback(d), "error");
                })
                .then(function () {
                    clearTimeout(timer);
                    setLoading(false);
                });
        });

        /* ---------- WhatsApp alternative ---------- */
        waBtn.addEventListener("click", function () {
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
            setStatus("WhatsApp opened with your message. Just press send there!", "success");
        });

        /* ---------- Send another ---------- */
        againBtn.addEventListener("click", function () {
            successEl.hidden = true;
            form.hidden = false;
            setStatus("", "");
            nameEl.focus();
        });
    });
})();
