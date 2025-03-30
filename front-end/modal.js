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

    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('closeBtn');
    const authButton = document.getElementById('authButton');
    const submitBtn = document.getElementById('submitBtn');
    const greeting = document.getElementById('greeting');

    authButton.onclick = () => {
        modal.classList.remove('hidden'); // Показываем модальное окно
    };
    
    // Закрытие модального окна
    closeBtn.onclick = () => {
        modal.classList.add('hidden'); // Скрываем модальное окно
    };
    
    // Закрытие модального окна, если пользователь кликнул вне его
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.classList.add('hidden'); // Скрыть модальное окно при клике вне его
        }
    };
    
    // Отправка данных из формы авторизации
    submitBtn.onclick = async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        if (!email || !password) {
            alert('Пожалуйста, заполните все поля');
            return;
        }
    
        try {
            const res = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            if (res.ok) {
                const data = await res.json();
            
                const userName = data.client.client_name;  // Если name нет, то используем email
            
                // Сохраняем имя пользователя в localStorage
                localStorage.setItem('userName', userName);
            
                // Обновляем текст и кнопку
                greeting.innerText = `Привет, ${userName}!`;
                authButton.innerText = 'Выйти';
            
                // Закрыть модальное окно
                modal.classList.add('hidden');
            
                // Обработчик для кнопки "Выйти"
                authButton.onclick = logout;
            } else {
                alert('Ошибка авторизации');
            }
        } catch (error) {
            alert('Ошибка запроса');
            console.log(error);
        }
    };
    
    // Функция выхода
    const logout = () => {
        // Очищаем localStorage
        localStorage.removeItem('userName');
    
        // Обновляем текст и кнопку
        greeting.innerText = 'Уже есть аккаунт?';
        authButton.innerText = 'Войти';
    
        // Устанавливаем обработчик на кнопку "Войти"
        authButton.onclick = () => {
            modal.classList.remove('hidden');  // Открыть модальное окно
        };
    };
    
    // Проверка при загрузке страницы
    const userName = localStorage.getItem('userName');
    if (userName) {
        greeting.innerText = `Привет, ${userName}`;
        authButton.innerText = 'Выйти';
        authButton.onclick = logout;
    }

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
