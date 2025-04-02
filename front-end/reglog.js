const loginForm = document.querySelector('.login-Form');
const toggleLogin = document.querySelector(".toggleLogin");
const toggleRegister = document.querySelector(".toggleRegister");
const guestButton = document.querySelector(".guest");
const linkRegister = document.querySelector(".linkRegister");
const linkLogin = document.querySelector(".linkLogin");
const registerFormDiv = document.querySelector('.registerForm'); // Получаем div
const registerForm = registerFormDiv.querySelector('form'); // Получаем form внутри div

function showLoginForm() {
    if (loginForm) {
        loginForm.classList.remove('hidden');
    }
    if (registerFormDiv) {
        registerFormDiv.classList.add('hidden');
    }
}

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Получаем значения полей
        const name = registerForm.name.value;
        const surname = registerForm.surname.value;
        const email = registerForm.email.value;
        const password = registerForm.password.value;
        const confirmPassword = registerForm.confirmPassword.value;

        // Логируем значения для отладки
        console.log('name:', name);
        console.log('surname:', surname);
        console.log('email:', email);
        console.log('password:', password);
        console.log('confirmPassword:', confirmPassword);

        // Проверка на пустые поля
        if (!name || !surname || !email || !password || !confirmPassword) {
            return Swal.fire({
                title: 'Ошибка',
                text: 'Пожалуйста, заполните все поля',
                icon: 'error',
                heightAuto: false
            });
        }

        // Проверка на совпадение паролей
        if (password !== confirmPassword) {
            return Swal.fire({
                title: 'Ошибка',
                text: 'Пароли не совпадают',
                icon: 'error',
                heightAuto: false
            });
        }

        try {
            const res = await fetch('http://localhost:4000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    client_name: name,
                    client_surname: surname,
                    email,
                    password
                })
            });

            const data = await res.json();

            if (res.ok) {
                Swal.fire({
                    title: 'Успешно!',
                    text: 'Регистрация прошла успешно. Войдите в аккаунт.',
                    icon: 'success',
                    heightAuto: false
                });
                registerForm.reset();
                showLoginForm();
            } else {
                Swal.fire({
                    title: 'Ошибка',
                    text: data.message || 'Что-то пошло не так',
                    icon: 'error',
                    heightAuto: false
                });
            }
        } catch (err) {
            Swal.fire({
                title: 'Ошибка',
                text: 'Сервер недоступен',
                icon: 'error',
                heightAuto: false
            });
            console.error(err);
        }
    });
}
if (linkRegister) {
    linkRegister.addEventListener("click", () => {
        loginForm.classList.add("hidden");
        registerForm.classList.remove("hidden");
    });
}

if (linkLogin) {
    linkLogin.addEventListener("click", () => {
        registerForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const emailInput = loginForm.querySelector('input[name="email"]');
        const passwordInput = loginForm.querySelector('input[name="password"]');

        if (!emailInput || !passwordInput) {
            console.error('Поля email или password не найдены');
            return;
        }

        const email = emailInput.value;
        const password = passwordInput.value;

        console.log('login email:', email);
        console.log('login password:', password);

        if (!email || !password) {
            return Swal.fire({
                title: 'Ошибка',
                text: 'Пожалуйста, заполните все поля',
                icon: 'error',
                heightAuto: false
            });
        }

        try {
            const res = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                Swal.fire({
                    title: 'Успешно!',
                    text: 'Вход выполнен успешно.',
                    icon: 'success',
                    heightAuto: false
                });

                // После успешного входа перенаправляем пользователя на index.html
                setTimeout(() => {
                    window.location.href = './lk.html';
                }, 2000);
            } else {
                Swal.fire({
                    title: 'Ошибка',
                    text: data.message || 'Не удалось войти',
                    icon: 'error',
                    heightAuto: false
                });
            }
        } catch (err) {
            Swal.fire({
                title: 'Ошибка',
                text: 'Сервер недоступен',
                icon: 'error',
                heightAuto: false
            });
            console.error(err);
        }
    });
}


if (toggleRegister) {
    toggleRegister.addEventListener('click', () => {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden')
    })
}

if (toggleLogin) {
    toggleLogin.addEventListener('click', () => {
        registerForm.classList.add('hidden')
        loginForm.classList.remove('hidden')
    })
}

if (guestButton) {
    guestButton.addEventListener('click', () => {
        window.location.href = './index.html'
    })
}
