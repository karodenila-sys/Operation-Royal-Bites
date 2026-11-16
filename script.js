
const foods = [
  {
    name: "Jollof Rice",
    category: "Rice",
    price: 3500,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600"
  },
  {
    name: "Fried Rice",
    category: "Rice",
    price: 4000,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600"
  },
  {
    name: "Grilled Chicken",
    category: "Chicken",
    price: 5500,
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600"
  },
  {
    name: "Chicken Wings",
    category: "Chicken",
    price: 4500,
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600"
  },
  {
    name: "Fresh Juice",
    category: "Drinks",
    price: 1500,
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600"
  },
  {
    name: "Milkshake",
    category: "Drinks",
    price: 2500,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600"
  },
  {
    name: "Burger",
    category: "Snacks",
    price: 3500,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600"
  },
  {
    name: "Pizza",
    category: "Snacks",
    price: 6000,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600"
  }
];

let cart = [];

function displayFoods(items) {
  const grid = document.getElementById("food-grid");

  grid.innerHTML = items.map(food => `
    <div class="food-card">
      <img src="${food.image}" alt="${food.name}">
      <div class="food-info">
        <h3>${food.name}</h3>
        <p>₦${food.price.toLocaleString()}</p>
        <button onclick="addToCart('${food.name}')">
          Add to Cart
        </button>
      </div>
    </div>
  `).join("");
}

function filterFood(category) {
  const result = category === "All"
    ? foods
    : foods.filter(food => food.category === category);

  displayFoods(result);
}

function searchFood() {
  const value = document.getElementById("search")
    .value.toLowerCase();

  displayFoods(
    foods.filter(food =>
      food.name.toLowerCase().includes(value)
    )
  );
}

function addToCart(name) {
  const food = foods.find(item => item.name === name);
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({...food, quantity: 1});
  }

  updateCart();
}

function updateCart() {
  const container = document.getElementById("cart-items");

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <strong>${item.name}</strong>
      <p>₦${(item.price * item.quantity).toLocaleString()}</p>
      <button onclick="changeQuantity('${item.name}', -1)">−</button>
      ${item.quantity}
      <button onclick="changeQuantity('${item.name}', 1)">+</button>
    </div>
  `).join("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  document.getElementById("total").textContent =
    total.toLocaleString();

  document.getElementById("cart-count").textContent =
    cart.reduce((sum, item) => sum + item.quantity, 0);
}

function changeQuantity(name, amount) {
  const item = cart.find(item => item.name === name);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(food => food.name !== name);
  }

  updateCart();
}

function toggleCart() {
  document.getElementById("cart-panel")
    .classList.toggle("active");
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const order = cart.map(item =>
    `${item.name} x ${item.quantity}`
  ).join("\n");

  const customer = prompt("Enter your full name:");

  if (!customer || !customer.trim()) return;

  const phone = prompt("Enter your phone number:");

  if (!phone || !phone.trim()) return;

  alert(
    `Thank you, ${customer}!\n\n` +
    `Your order:\n${order}\n\n` +
    `Total: ₦${total.toLocaleString()}\n\n` +
    `We will contact you at ${phone}.`
  );

  cart = [];
  updateCart();
  toggleCart();
}

displayFoods(foods);
