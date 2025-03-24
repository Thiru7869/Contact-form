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

    // Function to display error message
    function showError(input, message) {
        const parent = input.parentElement;
        const errorSpan = parent.querySelector(".error-message");
        errorSpan.textContent = message;
        input.classList.add("input-error");
    }

    // Function to clear error message
    function clearError(input) {
        const parent = input.parentElement;
        const errorSpan = parent.querySelector(".error-message");
        errorSpan.textContent = "";
        input.classList.remove("input-error");
    }

    // Function to validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Function to validate phone number (10-digit)
    function validatePhone(phone) {
        const re = /^[0-9]{10}$/;
        return re.test(phone);
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent default submission

        let isValid = true;

        // Validate Name
        if (nameInput.value.trim() === "") {
            showError(nameInput, "Name is required.");
            isValid = false;
        } else {
            clearError(nameInput);
        }

        // Validate Email
        if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, "Enter a valid email.");
            isValid = false;
        } else {
            clearError(emailInput);
        }

        // Validate Phone
        if (!validatePhone(phoneInput.value.trim())) {
            showError(phoneInput, "Enter a valid 10-digit phone number.");
            isValid = false;
        } else {
            clearError(phoneInput);
        }

        // Validate Message
        if (messageInput.value.trim() === "") {
            showError(messageInput, "Message cannot be empty.");
            isValid = false;
        } else {
            clearError(messageInput);
        }

        // If form is invalid, stop submission
        if (!isValid) return;

        // Show loading state
        btnText.style.display = "none";
        btnLoader.style.display = "inline-block";
        submitButton.disabled = true;

        // Web3Forms Submission
        const formData = new FormData(form);

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Display success message
                confirmationMessage.innerHTML = `<p>Thanks for submitting! We’ll contact you shortly.</p>`;
                confirmationMessage.style.display = "block";

                // Reset form
                form.reset();
            } else {
                confirmationMessage.innerHTML = `<p style="color: red;">Error: ${data.message}</p>`;
                confirmationMessage.style.display = "block";
            }
        })
        .catch(() => {
            confirmationMessage.innerHTML = `<p style="color: red;">Submission failed. Try again later.</p>`;
            confirmationMessage.style.display = "block";
        })
        .finally(() => {
            // Reset button state
            btnText.style.display = "inline";
            btnLoader.style.display = "none";
            submitButton.disabled = false;

            // Hide confirmation message after 5 seconds
            setTimeout(() => {
                confirmationMessage.style.display = "none";
            }, 5000);
        });
    });
});
