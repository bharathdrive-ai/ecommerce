const CART_KEY = "artisan_cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(productId, quantity = 1) {
  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity });
  }
  saveCart(cart);
  updateCartBadge();
}

function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
  updateCartBadge();
}

function updateQuantity(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity = Math.max(1, item.quantity + delta);
    saveCart(cart);
    updateCartBadge();
  }
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (badge) {
    const count = getCartCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  }
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
