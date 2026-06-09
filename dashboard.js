document.addEventListener("DOMContentLoaded", function () {

  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));


  const userInfoElement = document.getElementById("userInfo");

  if (userInfoElement) {
    if (!loggedUser) {
      window.location.href = "login.html";
      return;
    }

    userInfoElement.textContent =
      `${loggedUser.firstName} ${loggedUser.lastName}`;
  }

  const userArea = document.getElementById("userArea");

  if (userArea) {

    if (loggedUser && loggedUser.firstName) {

      const firstLetter = loggedUser.firstName.charAt(0).toUpperCase();

      userArea.innerHTML = `
        <div class="user-wrapper">
          <div class="user-circle" id="userToggle">
            ${firstLetter}
          </div>
          <ul class="custom-dropdown" id="userDropdown">
            <li><a href="dashboard.html">Dashboard</a></li>
            <li><a href="#" id="navbarLogoutBtn">Logout</a></li>
          </ul>
        </div>
      `;

      const userToggle = document.getElementById("userToggle");
      const userDropdown = document.getElementById("userDropdown");
      const navbarLogoutBtn = document.getElementById("navbarLogoutBtn");

      if (userToggle && userDropdown) {
        userToggle.addEventListener("click", function (e) {
          e.stopPropagation();
          userDropdown.classList.toggle("show-dropdown");
        });

        document.addEventListener("click", function () {
          userDropdown.classList.remove("show-dropdown");
        });
      }

      if (navbarLogoutBtn) {
        navbarLogoutBtn.addEventListener("click", function (e) {
          e.preventDefault();
          localStorage.clear();
          window.location.href = "index.html";
        });
      }
    }
  }
  
  const properties = [
   { id: 1, title: "Luxury Villa", location: "Chicago", price: 34900, type: "rent", img: "aprt1.webp" },
    { id: 2, title: "Modern Apartment", location: "New York", price: 52000, type: "sale", img: "aprt3.webp" },
    { id: 3, title: "Beach House", location: "Miami", price: 72000, type: "rent", img: "aprt2.webp" },
    { id: 4, title: "City Studio", location: "Los Angeles", price: 25000, type: "rent",img: "house1.webp" },
    { id: 5, title: "Duplex Home", location: "Texas", price: 48000, type: "sale", img: "house2.webp" },
    { id: 6, title: "Family House", location: "Boston", price: 39000, type: "rent",img: "house3.webp" },
    { id: 7, title: "Premium Condo", location: "Seattle", price: 60000, type: "sale", img: "aprt4.webp" },
    { id: 8, title: "Luxury Penthouse", location: "San Diego", price: 95000, type: "sale", img: "aprt5.webp" }
  ];

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];


const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profileAvatar = document.getElementById("profileAvatar");
const wishlistCount = document.getElementById("wishlistCount");
const cartCount = document.getElementById("cartCount");

if (loggedUser && profileName) {

  profileName.textContent =
    `${loggedUser.firstName} ${loggedUser.lastName}`;

  profileEmail.textContent = loggedUser.email;

  profileAvatar.textContent =
    loggedUser.firstName.charAt(0).toUpperCase();

  wishlistCount.textContent =
    wishlist.length;

  cartCount.textContent =
    cart.length;
}


  function renderWishlist() {

    const container = document.getElementById("wishlistContainer");
    if (!container) return;

    container.innerHTML = "";

    const wishlistItems = properties.filter(p => wishlist.includes(p.id));

    if (wishlistItems.length === 0) {
      container.innerHTML = "<p>No wishlist items yet.</p>";
      return;
    }

    wishlistItems.forEach(property => {
      container.innerHTML += `
        <div class="col-md-4 mb-4">
          <div class="card">
            <img src="${property.img}" class="card-img-top">
            <div class="card-body">
              <h5>${property.title}</h5>
              <p>${property.location}</p>
              <p>$${property.price.toLocaleString()} / Month</p>
            </div>
          </div>
        </div>
      `;
    });
  }


  function renderCart() {

    const container = document.getElementById("cartContainer");
    if (!container) return;

    container.innerHTML = "";

    const cartItems = properties.filter(p => cart.includes(p.id));

    if (cartItems.length === 0) {
      container.innerHTML = "<p>No cart items yet.</p>";
      return;
    }

    let total = 0;

    cartItems.forEach(property => {
      total += property.price;

      container.innerHTML += `
        <div class="col-md-4 mb-4">
          <div class="card">
            <img src="${property.img}" class="card-img-top">
            <div class="card-body">
              <h5>${property.title}</h5>
              <p>${property.location}</p>
              <p>$${property.price.toLocaleString()} / Month</p>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML += `
      <div class="col-12">
        <h4>Total: $${total.toLocaleString()}</h4>
      </div>
    `;
  }


const menuItems = document.querySelectorAll(".dashboard-sidebar li[data-section]");
const sections = document.querySelectorAll(".dashboard-section");

menuItems.forEach(item => {

  item.addEventListener("click", function () {

    menuItems.forEach(i => i.classList.remove("active"));
    this.classList.add("active");

    sections.forEach(section => {
      section.style.display = "none";
    });

    const target = this.dataset.section + "Section";
    const activeSection = document.getElementById(target);

    if (activeSection) {
      activeSection.style.display = "block";
    }

  });

});
// const cartBadge = document.querySelector(".cart-badge");
//  updateCartBadge();
//   propertyContainer.addEventListener("click", function (e) {

//     const wishBtn = e.target.closest(".wishlist-btn");
//     const cartBtn = e.target.closest(".cart-btn");

//     if (!loggedUser) {
//       alert("Please login first");
//       return;
//     }

//     if (wishBtn) {
//       const id = Number(wishBtn.dataset.id);

//       if (wishlist.includes(id)) {
//         wishlist = wishlist.filter(item => item !== id);
//       } else {
//         wishlist.push(id);
//         showWishlistModal(id);
//       }

//       localStorage.setItem("wishlist", JSON.stringify(wishlist));
//       renderProperties();
//     }

//     if (cartBtn) {
//       const id = Number(cartBtn.dataset.id);
//       cart.push(id);
//       localStorage.setItem("cart", JSON.stringify(cart));
//       updateCartBadge();
//     }
//   });

//   function updateCartBadge() {
//     if (cartBadge) {
//       cartBadge.textContent = cart.length;
//     }
//   }

  const dashboardLogout = document.getElementById("dashboardLogoutBtn");

  if (dashboardLogout) {
    dashboardLogout.addEventListener("click", function () {
      localStorage.clear();
      window.location.href = "index.html";
    });
  }
  document.getElementById("profileSection").style.display = "block";

  renderWishlist();
  renderCart();

});
