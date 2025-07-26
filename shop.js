// shop.js

fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => {
    const productContainer = document.getElementById("shop-products");

    data.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("pro");

      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <div class="des">
          <span>${product.brand}</span>
          <h5>${product.name}</h5>
          <h4>₹${product.price}</h4>
        </div>
        <a href="#" onclick='addToCart(${JSON.stringify(product)})'>
          <i class="fa fa-shopping-cart cart"></i>
        </a>
      `;

      productContainer.appendChild(productDiv);
    });
  });

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart! 🛒`);
}