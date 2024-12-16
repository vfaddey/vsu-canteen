import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import PaymentPage from "./pages/PaymentPage.jsx";
import OrderConfirmationPage from "./pages/OrderConfirmationPage.jsx";

function App() {
    return (
        <CartProvider>
            <Router>
                <div className="app-container" style={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Routes>
                        <Route path="/" element={<MenuPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/payment" element={<PaymentPage />} />
                        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                    </Routes>
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;