
document.addEventListener("DOMContentLoaded", function () {

  const blogContainer = document.getElementById("blogContainer");
  if (!blogContainer) return;   

  const blogs = [
    {
      id: 1,
      title: "Top 10 Investment Locations in 2026",
      desc: "Discover the most profitable real estate locations for high ROI this year.",
      img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
      content: `
Real estate investment continues to be one of the most stable and reliable wealth-building strategies worldwide. 
In 2026, emerging markets are attracting global investors due to rapid infrastructure development, smart city projects, 
and strong rental demand in growing urban areas.

Cities with expanding transportation networks, IT hubs, and commercial corridors are seeing steady property appreciation. 
Investors are focusing on locations that offer a balance between affordability and long-term capital growth potential.

Before investing, it is important to analyze market trends, rental yield percentages, population growth, and upcoming government projects. 
Diversifying across residential, commercial, and mixed-use properties can also reduce risk while maximizing returns.

With proper research and strategic planning, real estate remains one of the most secure assets for long-term financial growth.
`
    },
    {
      id: 2,
      title: "How to Buy Your First Home",
      desc: "A beginner's guide to mortgages and property selection.",
      img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=800&q=80",
      content: `Buying your first home can feel overwhelming Cities with expanding transportation networks, IT hubs, and commercial corridors are seeing steady property appreciation Investors are focusing on locations that offer a balance between affordability and long-term capital growth potential
      Before investing, it is important to analyze market trends, rental yield percentages, population growth, and upcoming government projects. 
Diversifying across residential, commercial, and mixed-use properties can also reduce risk while maximizing returns.`
    },
    {
      id: 2,
      title: "How to Sell Your First Home",
      desc: "A beginner's guide to mortgages and property selection.",
      img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=800&q=80",
      content: `Buying your first home can feel overwhelming Before investing, it is important to analyze market trends, rental yield percentages, population growth, and upcoming government projects. 
Diversifying across residential, commercial, and mixed-use properties can also reduce risk while maximizing returns.`
    }
  ];

  blogs.forEach(blog => {

    const col = document.createElement("div");
    col.className = "col-lg-4 col-md-6 mb-4";

    col.innerHTML = `
      <div class="blog-card">
        <img src="${blog.img}">
        <div class="blog-body">
          <div class="blog-title">${blog.title}</div>
          <div class="blog-desc">${blog.desc}</div>
          <a href="#" class="read-more" data-id="${blog.id}">
            Read More &rarr;
          </a>
        </div>
      </div>
    `;

    blogContainer.appendChild(col);
  });

  document.querySelectorAll(".read-more").forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const blogId = this.dataset.id;
      const selectedBlog = blogs.find(b => b.id == blogId);
      localStorage.setItem("selectedBlog", JSON.stringify(selectedBlog));
      window.location.href = "news.html";
    });
  });

});
document.addEventListener("DOMContentLoaded", function () {

  const blogData = JSON.parse(localStorage.getItem("selectedBlog"));
  if (!blogData) return;

  document.getElementById("blogTitle").textContent = blogData.title;
  document.getElementById("blogImage").src = blogData.img;
  document.getElementById("blogContent").textContent = blogData.content;

  const today = new Date();
  document.getElementById("blogDate").textContent =
    today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

});