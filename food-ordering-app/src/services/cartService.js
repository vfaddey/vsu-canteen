const CART_KEY = "cart_items";

export function addToCart(dish) {
    const cart = getCart();
    cart.push(dish);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

export function removeFromCart(dishId) {
    const cart = getCart().filter(item => item.id !== dishId);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function clearCart() {
    localStorage.removeItem(CART_KEY);
}