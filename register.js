document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registerForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const firstName = document.getElementById("firstName");
        const lastName = document.getElementById("lastName");
        const email = document.getElementById("regEmail");
        const password = document.getElementById("regPassword");
        const confirmPassword = document.getElementById("confirmPassword");

        let isValid = true;

        document.querySelectorAll(".error-text").forEach(el => el.textContent = "");
        if (firstName.value.trim() === "") {
            document.getElementById("firstNameError").textContent = "First name required";
            isValid = false;
        }
        if (lastName.value.trim() === "") {
            document.getElementById("lastNameError").textContent = "Last name required";
            isValid = false;
        }
        const emailValue = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (emailValue === "") {
            document.getElementById("emailError").textContent = "Email required";
            isValid = false;
        } 
        else if (!emailPattern.test(emailValue)) {
            document.getElementById("emailError").textContent = "Enter valid email address";
            isValid = false;
        }
        const existingUser = JSON.parse(localStorage.getItem("stacklyUser"));

       if (existingUser && existingUser.email === emailValue) {
           document.getElementById("emailError").textContent =
        "Email already registered";
       return;
      }

        if (password.value.length < 6) {
            document.getElementById("passwordError").textContent =
                "Minimum 6 characters required";
            isValid = false;
        }
        if (confirmPassword.value !== password.value) {
            document.getElementById("confirmError").textContent =
                "Passwords do not match";
            isValid = false;
        }

        if (!isValid) return;
        const user = {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            email: emailValue,
            password: password.value
        };

        localStorage.setItem("stacklyUser", JSON.stringify(user));

        document.getElementById("registerSuccess").textContent =
            "Account created successfully! Redirecting...";

        form.reset();

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    });
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
