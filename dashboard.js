const menuItems = document.querySelectorAll(".sidebar-menu li[data-target]");
const sections = document.querySelectorAll(".dashboard-section");

menuItems.forEach(item => {
  item.addEventListener("click", function () {

    menuItems.forEach(i => i.classList.remove("active"));
    this.classList.add("active");

    sections.forEach(section => {
      section.style.display = "none";
    });

    const targetId = this.getAttribute("data-target");
    document.getElementById(targetId).style.display = "block";
  });
});

document.getElementById("logoutBtn").addEventListener("click", function () {
  window.location.href = "error.html";
});