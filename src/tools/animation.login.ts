const container: HTMLElement | null = document.getElementById('container');
const registerBtn: HTMLElement | null = document.getElementById('register');
const loginBtn: HTMLElement | null = document.getElementById('login');

if (container && registerBtn && loginBtn) {
    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });
}
