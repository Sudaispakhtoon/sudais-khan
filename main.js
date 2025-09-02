// Add To Cart functionality
document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Select all product cards having "add" button
  const addButtons = document.querySelectorAll(".add");

  addButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card, .product-card"); // find parent
      const name = card.querySelector(".title, h4").innerText;
      const priceText = card.querySelector(".price strong, .price, p.price").innerText;
      const price = parseFloat(priceText.replace("$", ""));
      const img = card.querySelector("img").getAttribute("src");

      // Check if product already in cart
      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ 
          id: Date.now(), 
          name, 
          price, 
          img, 
          qty: 1 
        });
      }

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Small alert / feedback
      alert(`${name} added to cart!`);
    });
  });
});
