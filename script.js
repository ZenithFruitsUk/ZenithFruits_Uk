let currentPage = 0;
let currentCategory = "fruits_veggies"; // default

function renderProducts(category) {
  const container = document.getElementById("product-track");
  container.innerHTML = "";

  if (productsData[category]) {
    const products = productsData[category];
    const itemsPerPage = 8; // 4 cols × 2 rows
    const totalPages = Math.ceil(products.length / itemsPerPage);

    for (let i = 0; i < totalPages; i++) {
      const pageDiv = document.createElement("div");
      pageDiv.classList.add("product-page");

      const pageItems = products.slice(i * itemsPerPage, (i + 1) * itemsPerPage);

      pageItems.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
          <img src="${product.img}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p><strong>${product.weight}</strong></p>
        `;

        pageDiv.appendChild(productDiv);
      });

      container.appendChild(pageDiv);
    }

    currentPage = 0;
    currentCategory = category;
    updateCarousel();
  }
}

// Category button handler
function showCategory(category) {
  renderProducts(category);

  // Optional: smooth scroll to product section
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

// Move carousel left/right
function moveCarousel(direction) {
  const container = document.getElementById("product-track");
  const totalPages = container.children.length;

  currentPage += direction;
  if (currentPage < 0) currentPage = 0;
  if (currentPage >= totalPages) currentPage = totalPages - 1;

  updateCarousel();
}

function updateCarousel() {
  const container = document.getElementById("product-track");
  container.style.transform = `translateX(-${currentPage * 100}%)`;
}

// Show Fruits & Veggies by default
document.addEventListener("DOMContentLoaded", () => {
  renderProducts("fruits_veggies");
});
