document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Group items by ID
  let groupedCart = {};
  cart.forEach(item => {
    if (!groupedCart[item.id]) {
      groupedCart[item.id] = { ...item, quantity: 1 };
    } else {
      groupedCart[item.id].quantity++;
    }
  });

  const cartContainer = document.getElementById("cart-items");
  const totalItemsDisplay = document.getElementById("total-items");
  const totalPriceDisplay = document.getElementById("total-price");

  function updateCartDisplay() {
    cartContainer.innerHTML = "";
    let totalItems = 0;
    let totalPrice = 0;

    Object.values(groupedCart).forEach(product => {
      totalItems += product.quantity;
      totalPrice += product.quantity * product.price;

      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");
      itemDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}" width="100"/>
        <div class="cart-info">
          <h4>${product.name}</h4>
          <p>₹${product.price} x ${product.quantity} = ₹${product.price * product.quantity}</p>
          <div class="quantity-controls">
            <button onclick="changeQuantity(${product.id}, -1)">−</button>
            <span>${product.quantity}</span>
            <button onclick="changeQuantity(${product.id}, 1)">+</button>
          </div>
        </div>
      `;
      cartContainer.appendChild(itemDiv);
    });

    totalItemsDisplay.textContent = totalItems;
    totalPriceDisplay.textContent = `₹${totalPrice}`;
  }

  window.changeQuantity = function(id, delta) {
    if (groupedCart[id]) {
      groupedCart[id].quantity += delta;
      if (groupedCart[id].quantity <= 0) {
        delete groupedCart[id];
      }
      updateLocalStorage();
      updateCartDisplay();
    }
  };

  function updateLocalStorage() {
    let updatedCart = [];
    Object.values(groupedCart).forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        updatedCart.push({ ...item });
      }
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  updateCartDisplay();

  // Checkout button logic
  window.generateBill = function () {
    const now = new Date();
    const formattedTime = now.toLocaleString();
    const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(); // Random order ID

    let billWindow = window.open("", "Bill", "width=700,height=800");
    billWindow.document.write(`
      <html>
        <head>
          <title>Bill Receipt</title>
        </head>
        <body style="font-family:sans-serif; padding:20px">
          <img src="img/logo.jpg" alt="Logo" width="100" />
          <h2>Bill Receipt 🧾</h2>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Purchase Time:</strong> ${formattedTime}</p>

          <table border="1" cellpadding="10" cellspacing="0" width="100%">
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
            ${Object.values(groupedCart).map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price}</td>
                <td>₹${item.quantity * item.price}</td>
              </tr>
            `).join("")}
          </table>

          <h3>Total Items: ${Object.values(groupedCart).reduce((sum, item) => sum + item.quantity, 0)}</h3>
          <h3>Total Price: ₹${Object.values(groupedCart).reduce((sum, item) => sum + item.quantity * item.price, 0)}</h3>

          <h2 style="color: green; text-align:center; margin-top:30px;">Thank you for your purchase! 🛍️</h2>
        </body>
      </html>
    `);
    billWindow.document.close();

    // Clear cart after checkout
    localStorage.removeItem("cart");
    setTimeout(() => {
      window.location.reload(); // To refresh the cart
    }, 1000);
  };
});
