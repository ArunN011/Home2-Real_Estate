document.addEventListener("DOMContentLoaded", function () {

  const userArea = document.getElementById("userArea");
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (userArea) {

    if (loggedUser && loggedUser.firstName) {

      const firstLetter = loggedUser.firstName.charAt(0).toUpperCase();

      userArea.innerHTML = `
        <div class="user-wrapper">
          <div class="user-circle" id="userToggle">${firstLetter}</div>
          <ul class="custom-dropdown" id="userDropdown">
            <li><a href="#">My Account</a></li>
            <li><a href="#" id="logoutBtn">Logout</a></li>
          </ul>
        </div>
      `;

      const userToggle = document.getElementById("userToggle");
      const userDropdown = document.getElementById("userDropdown");

      userToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        userDropdown.classList.toggle("show-dropdown");
      });

      document.addEventListener("click", function () {
        userDropdown.classList.remove("show-dropdown");
      });

      const logoutBtn = document.getElementById("logoutBtn");
      logoutBtn.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("cart");
        localStorage.removeItem("wishlist");
        window.location.reload();
      });

    } else {

      const dropdown = userArea.querySelector(".custom-dropdown");

      if (dropdown) {
        userArea.addEventListener("click", function (e) {
          e.stopPropagation();
          dropdown.classList.toggle("show-dropdown");
        });

        document.addEventListener("click", function () {
          dropdown.classList.remove("show-dropdown");
        });
      }
    }
  }


  const propertyContainer = document.getElementById("propertyContainer");
  if (!propertyContainer) return;

  const cartBadge = document.querySelector(".cart-badge");

  const properties = [
    { id: 1, title: "Luxury Villa", location: "Chicago", price: 34900, type: "rent", img: "aprt1.webp" },
    { id: 2, title: "Modern Apartment", location: "New York", price: 52000, type: "sale", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80" },
    { id: 3, title: "Beach House", location: "Miami", price: 72000, type: "rent", img: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=800&q=80"},
    { id: 4, title: "City Studio", location: "Los Angeles", price: 25000, type: "rent",img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80" },
    { id: 5, title: "Duplex Home", location: "Texas", price: 48000, type: "sale", img: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=80" },
    { id: 6, title: "Family House", location: "Boston", price: 39000, type: "rent",img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80" },
    { id: 7, title: "Premium Condo", location: "Seattle", price: 60000, type: "sale", img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80" },
    { id: 8, title: "Luxury Penthouse", location: "San Diego", price: 95000, type: "sale", img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80" }
  ];

  let wishlist = loggedUser
    ? JSON.parse(localStorage.getItem("wishlist")) || []
    : [];

  let cart = loggedUser
    ? JSON.parse(localStorage.getItem("cart")) || []
    : [];

  updateCartBadge();

  function renderProperties(filter = "all") {

    propertyContainer.innerHTML = "";

    const filtered = filter === "all"
      ? properties
      : properties.filter(p => p.type === filter);

    filtered.forEach(property => {

      const isWishlisted = wishlist.includes(property.id);

      const col = document.createElement("div");
      col.className = "col-lg-4 col-md-6 mb-4";

      col.innerHTML = `
        <div class="property-card">
          <div class="property-img">
            <img src="${property.img}" />
            <span class="property-badge">
              ${property.type === "rent" ? "FOR RENT" : "FOR SALE"}
            </span>
          </div>

          <div class="property-body">
            <h5>${property.title}</h5>
            <p><i class="bi bi-geo-alt-fill"></i> ${property.location}</p>

            <div class="property-actions mt-3">
              <button class="icon-btn wishlist-btn ${isWishlisted ? "active" : ""}" data-id="${property.id}">
                <i class="bi bi-heart-fill"></i>
              </button>
              <button class="icon-btn cart-btn" data-id="${property.id}">
                <i class="bi bi-cart"></i>
              </button>
            </div>
          </div>

          <div class="property-price">
            $${property.price.toLocaleString()} / Month
          </div>
        </div>
      `;

      propertyContainer.appendChild(col);
    });
  }

  renderProperties();


  propertyContainer.addEventListener("click", function (e) {

    const wishBtn = e.target.closest(".wishlist-btn");
    const cartBtn = e.target.closest(".cart-btn");
    if (!loggedUser) {
      alert("Please login first");
      return;
    }

    if (wishBtn) {
      const id = Number(wishBtn.dataset.id);

      if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);
      } else {
        wishlist.push(id);
        showWishlistModal(id);
      }

      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      renderProperties();
    }

    if (cartBtn) {
      const id = Number(cartBtn.dataset.id);
      cart.push(id);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartBadge();
    }
  });

  function updateCartBadge() {
    if (cartBadge) {
      cartBadge.textContent = cart.length;
    }
  }

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".filter-btn")
        .forEach(b => b.classList.remove("active"));

      this.classList.add("active");
      renderProperties(this.dataset.type);
    });
  });

  const modal = document.getElementById("wishlistModal");
  const closeModal = document.getElementById("closeModal");
  const wishlistTitle = document.getElementById("wishlistTitle");

  function showWishlistModal(id) {
    const property = properties.find(p => p.id === id);
    if (!property || !modal) return;

    const modalImg = document.getElementById("wishlistImage");

    if (modalImg) {
      modalImg.src = property.img;
      modalImg.onerror = function () {
        this.src = "https://via.placeholder.com/500x300?text=No+Image";
      };
    }

    if (wishlistTitle) {
      wishlistTitle.textContent = property.title;
    }

    modal.classList.add("active");

    setTimeout(() => {
      modal.classList.remove("active");
    }, 2500);
  }

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

});
