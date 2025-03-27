document.addEventListener("DOMContentLoaded", function () {
    const openModalBtn = document.getElementById("openModal");
    const closeModalBtn = document.getElementById("closeModal");
    const paymentModal = document.getElementById("paymentModal");

    const openPaymentModalBtn = document.getElementById("openPaymentModal");
    const paymentConfirmModal = document.getElementById("paymentConfirmModal");
    const closePaymentModalBtn = document.getElementById("closePaymentModal");
    const confirmPaymentBtn = document.getElementById("confirmPayment");

    const inputs = document.querySelectorAll("input");
    const payButton = document.getElementById("openPaymentModal");

    function checkInputs() {
        let allFilled = true;
        inputs.forEach(input => {
            if (input.value.trim() === "") {
                allFilled = false;
            }
        });

        if (allFilled) {
            payButton.removeAttribute("disabled");
            payButton.classList.remove("opacity-50", "cursor-not-allowed");
        } else {
            payButton.setAttribute("disabled", "true");
            payButton.classList.add("opacity-50", "cursor-not-allowed");
        }
    }

    inputs.forEach(input => {
        input.addEventListener("input", checkInputs);
    });

    checkInputs();

    if (openModalBtn && closeModalBtn && paymentModal) {
        openModalBtn.addEventListener("click", function () {
            paymentModal.classList.remove("hidden");
        });

        closeModalBtn.addEventListener("click", function () {
            paymentModal.classList.add("hidden");
        });

        paymentModal.addEventListener("click", function (event) {
            if (event.target === paymentModal) {
                paymentModal.classList.add("hidden");
            }
        });
    }

    if (openPaymentModalBtn && closePaymentModalBtn && paymentConfirmModal && confirmPaymentBtn) {
        openPaymentModalBtn.addEventListener("click", function () {
            paymentConfirmModal.classList.remove("hidden");
        });

        closePaymentModalBtn.addEventListener("click", function () {
            paymentConfirmModal.classList.add("hidden");
        });

        confirmPaymentBtn.addEventListener("click", function () {
            paymentConfirmModal.classList.add("hidden");
            alert("Оплата успешно произведена!");
        });

        paymentConfirmModal.addEventListener("click", function (event) {
            if (event.target === paymentConfirmModal) {
                paymentConfirmModal.classList.add("hidden");
            }
        });
    }
});
