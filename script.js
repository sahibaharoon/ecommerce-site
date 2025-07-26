document.addEventListener("DOMContentLoaded", () => {
    const productContainer=document.getElementById("product1");
    fetch("https;//localhost:3000/api/products")
    .then((res)=>res.json())
    .then((products)=>{
        products.forEach((product) => {
            const productCard=document.createElement("div");
            productCard.classList.add("pro");
            productCard.innerHTML = `
          <img src="${product.image}" alt="">
          <div class="des">
            <span>${product.brand}</span>
            <h5>${product.name}</h5>
            <h4>₹${product.price}</h4>
          </div>
          <a href="#" onclick='addToCart(${JSON.stringify(product)})'><i class="fa fa-shopping-cart cart"></i></a>
        `;
        productContainer.appendChild(productCard)
        });
    })
    .catch((err)=>{
        console.error("Error Fetching: ",err)
    });
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} added to cart! 🛒`);
    }
});