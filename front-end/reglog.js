const registerForm = document.querySelector(".registerForm")
const loginForm = document.querySelector(".loginForm")
const toggleLogin = document.querySelector(".toggleLogin")
const toggleRegister = document.querySelector(".toggleRegister")
const linkRegister = document.querySelector(".linkRegister")
const linkLogin = document.querySelector(".linkLogin")
const registerBtn = document.querySelector(".register-btn")
const loginBtn = document.querySelector(".login-btn")

document.querySelector('.guest').addEventListener('click', () => {
    Swal.fire({
        title: "Отлично!",
        text: `Вы зашли как гость!`,
        icon: "success",
        heightAuto: false       
    })
    setTimeout(() => {
        document.location.href = './index.html'
    }, 2000)
})

document.querySelector('.register-btn').addEventListener('click' , () => {
    
    Swal.fire({
        title: "Отлично!",
        text: `Вы успешно зарегистрировались! Теперь войдите в свой аккаунт`,
        icon: "success",
        heightAuto: false
    })
})

function showLoginForm() {
    registerForm.classList.add("hidden")
    loginForm.classList.remove("hidden")
}

function showRegisterForm() {
    loginForm.classList.add("hidden")
    registerForm.classList.remove("hidden")
}

toggleLogin.addEventListener("click", showLoginForm)
toggleRegister.addEventListener("click", showRegisterForm)
linkRegister.addEventListener("click", showRegisterForm)
linkLogin.addEventListener("click", showLoginForm)