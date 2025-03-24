document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const messageInput = document.getElementById("message");
    const submitButton = document.getElementById("submit-btn");
    const btnText = submitButton.querySelector(".btn-text");
    const btnLoader = submitButton.querySelector(".btn-loader");
    const confirmationMessage = document.getElementById("confirmation-message");

    function showError(input, message) {
        const parent = input.parentElement;
        const errorSpan = parent.querySelector(".error-message");
        errorSpan.textContent = message;
        input.classList.add("input-error");
    }

    function clearError(input) {
        const parent = input.parentElement;
        const errorSpan = parent.querySelector(".error-message");
        errorSpan.textContent = "";
        input.classList.remove("input-error");
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^[0-9]{10}$/;
        return re.test(phone);
    }

    form.addEventListener("submit", function (e) {
        let isValid = true;

        if (nameInput.value.trim() === "") {
            showError(nameInput, "Name is required.");
            isValid = false;
        } else {
            clearError(nameInput);
        }

        if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, "Enter a valid email.");
            isValid = false;
        } else {
            clearError(emailInput);
        }

        if (!validatePhone(phoneInput.value.trim())) {
            showError(phoneInput, "Enter a valid 10-digit phone number.");
            isValid = false;
        } else {
            clearError(phoneInput);
        }

        if (messageInput.value.trim() === "") {
            showError(messageInput, "Message cannot be empty.");
            isValid = false;
        } else {
            clearError(messageInput);
        }

        if (!isValid) {
            e.preventDefault();
        } else {
            e.preventDefault(); // Prevent actual form submission
            btnText.style.display = "none";
            btnLoader.style.display = "inline-block";
            submitButton.disabled = true;

            setTimeout(() => {
                // Show success message at the top of the page
                confirmationMessage.innerHTML = `<p>Thanks for submitting! We’ll contact you shortly.</p>`;
                confirmationMessage.style.display = "block";

                // Reset form
                form.reset();
                btnText.style.display = "inline";
                btnLoader.style.display = "none";
                submitButton.disabled = false;

                // Auto-hide message after 5 seconds
                setTimeout(() => {
                    confirmationMessage.style.display = "none";
                }, 5000);
            }, 2000);
        }
    });
});
