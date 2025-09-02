document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const subtotal = item.price * item.qty;
      total += subtotal;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${item.img}" width="50"> ${item.name}</td>
        <td>$${item.price}</td>
        <td>
          <button class="qty-btn" data-index="${index}" data-action="decrease">-</button>
          ${item.qty}
          <button class="qty-btn" data-index="${index}" data-action="increase">+</button>
        </td>
        <td>$${subtotal}</td>
        <td><button class="remove-btn" data-index="${index}">X</button></td>
      `;
      cartItemsContainer.appendChild(row);
    });

    cartTotalElement.textContent = total.toFixed(2);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Quantity buttons
  cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("qty-btn")) {
      const index = e.target.dataset.index;
      if (e.target.dataset.action === "increase") {
        cart[index].qty++;
      } else if (e.target.dataset.action === "decrease" && cart[index].qty > 1) {
        cart[index].qty--;
      }
      renderCart();
    }

    if (e.target.classList.contains("remove-btn")) {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      renderCart();
    }
  });

  renderCart();
});
