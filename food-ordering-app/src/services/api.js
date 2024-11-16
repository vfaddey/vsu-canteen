const API_URL = "http://localhost:8000";

export async function fetchDishes() {
    const response = await fetch(`${API_URL}/dishes`);
    return await response.json();
}

export async function placeOrder(dishIds) {
    const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ dishes_ids: dishIds }),
    });
    if (!response.ok) {
        throw new Error("Ошибка при создании заказа");
    }
    return await response.json();
}

export async function deleteOrder(orderId) {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Ошибка при удалении заказа");
    }
}
