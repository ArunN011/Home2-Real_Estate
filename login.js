document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("loginForm");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const message = document.getElementById("loginMessage");
    const togglePassword = document.getElementById("togglePassword");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            message.textContent = "";
            message.classList.remove("text-danger", "text-success");

            const storedUser = JSON.parse(localStorage.getItem("stacklyUser"));

            if (!storedUser) {
                message.classList.add("text-danger");
                message.textContent = "No account found. Please register.";
                return;
            }

            if (
                email.value.trim() === storedUser.email &&
                password.value === storedUser.password
            ) {
                localStorage.setItem("loggedInUser", JSON.stringify(storedUser));

                message.classList.add("text-success");
                message.textContent = "Login Successful! Redirecting...";

                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1200);

            } else {
                message.classList.add("text-danger");
                message.textContent = "Incorrect email or password.";
            }
        });
    }


    if (togglePassword && password) {
        togglePassword.addEventListener("click", function () {
            if (password.type === "password") {
                password.type = "text";
                togglePassword.classList.replace("bi-eye-slash", "bi-eye");
            } else {
                password.type = "password";
                togglePassword.classList.replace("bi-eye", "bi-eye-slash");
            }
        });
    }

    const userArea = document.getElementById("userArea");
    if (!userArea) return;

    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedUser && loggedUser.firstName) {

        const firstLetter = loggedUser.firstName.charAt(0).toUpperCase();

        userArea.innerHTML = `
            <div class="user-wrapper">
                <div class="user-circle" id="userToggle">
                    ${firstLetter}
                </div>

                <ul class="custom-dropdown" id="userDropdown">
                    <li><a href="#">My Account</a></li>
                    <li><a href="#" id="logoutBtn">Logout</a></li>
                </ul>
            </div>
        `;

        const userToggle = document.getElementById("userToggle");
        const userDropdown = document.getElementById("userDropdown");
        const logoutBtn = document.getElementById("logoutBtn");

        if (userToggle && userDropdown) {

            userToggle.addEventListener("click", function (e) {
                e.stopPropagation();
                userDropdown.classList.toggle("show-dropdown");
            });

            userDropdown.addEventListener("click", function (e) {
                e.stopPropagation();   
            });

            document.addEventListener("click", function () {
                userDropdown.classList.remove("show-dropdown");
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener("click", function (e) {
                e.preventDefault();
                localStorage.removeItem("loggedInUser");
                window.location.reload();
            });
        }

    } else {

        const userDropdown = userArea.querySelector(".custom-dropdown");
        if (!userDropdown) return;

        userArea.addEventListener("click", function (e) {
            e.stopPropagation();
            userDropdown.classList.toggle("show-dropdown");
        });

        userDropdown.addEventListener("click", function (e) {
            e.stopPropagation();
        });

        document.addEventListener("click", function () {
            userDropdown.classList.remove("show-dropdown");
        });
    }

});