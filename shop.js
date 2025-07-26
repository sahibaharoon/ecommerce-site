// shop.js

// Replace fetch() with local data (copied from your data.js)
const products = [
  {
    id: 1,
    brand: "H&M",
    name: "Printed T‑shirt",
    price: 699,
    image: "img/products/p1.jpg"
  },
  {
    id: 2,
    brand: "H&M",
    name: "Wide High Jeans",
    price: 1999,
    image: "img/products/p6.jpg"
  },
  {
    id: 3,
    brand: "H&M",
    name: "Cap‑Sleeved Top",
    price: 799,
    image: "img/products/p2.jpg"
  },
  {
    id: 4,
    brand: "H&M",
    name: "Plumeti Tie‑Front Top",
    price: 1499,
    image: "img/products/p3.jpg"
  },
  {
    id: 5,
    brand: "H&M",
    name: "Shimmering Blouse",
    price: 1399,
    image: "img/products/p4.jpg"
  },
  {
    id: 6,
    brand: "H&M",
    name: "Tie‑Detail Peplum Blouse",
    price: 1499,
    image: "img/products/p5.jpg"
  },
  {
    id: 7,
    brand: "H&M",
    name: "Crinkled Jersey Dress",
    price: 2299,
    image: "img/products/p7.jpg"
  },
  {
    id: 8,
    brand: "H&M",
    name: "Plumeti Drawstring Trouser",
    price: 1799,
    image: "img/products/p8.jpg"
  },
  {
    id: 9,
    brand: "H&M",
    name: "Ribbed Cotton Tank Top",
    price: 599,
    image: "img/products/na1.jpg"
  },
  {
    id: 10,
    brand: "H&M",
    name: "High Waist Straight Jeans",
    price: 2199,
    image: "img/products/na2.jpg"
  },
  {
    id: 11,
    brand: "H&M",
    name: "Puff‑Sleeved Floral Dress",
    price: 1799,
    image: "img/products/na3.jpg"
  },
  {
    id: 12,
    brand: "H&M",
    name: "Smocked Waist Skirt",
    price: 1299,
    image: "img/products/na4.jpg"
  },
  {
    id: 13,
    brand: "H&M",
    name: "Linen‑Blend Blazer",
    price: 2599,
    image: "img/products/na5.jpg"
  },
  {
    id: 14,
    brand: "H&M",
    name: "Knitted V‑Neck Vest",
    price: 999,
    image: "img/products/na6.jpg"
  },
  {
    id: 15,
    brand: "H&M",
    name: "Cargo Pants with Belt",
    price: 1899,
    image: "img/products/na7.jpg"
  },
  {
    id: 16,
    brand: "H&M",
    name: "Off‑Shoulder Ruffle Top",
    price: 1099,
    image: "img/products/na8.jpg"
  }
];

const productContainer = document.getElementById("shop-products");

products.forEach((product) => {
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

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart! 🛒`);
}
