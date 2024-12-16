import React, { useState } from 'react';
import { List, Button, Layout, Divider, message } from 'antd';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../services/api';
import { useNavigate } from 'react-router-dom';
import AppHeader from './AppHeader';
import OrderConfirmationPage from './OrderConfirmationPage';

const { Content } = Layout;

import PaymentPage from './PaymentPage';

const CartPage = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const [order, setOrder] = useState(null);
    const [redirectToPayment, setRedirectToPayment] = useState(false);
    const navigate = useNavigate();

    const handlePlaceOrder = async () => {
        const dishIds = cartItems.map(item => item.id);
        try {
            const newOrder = await placeOrder(dishIds);
            clearCart();
            setOrder(newOrder);
            message.success("Ваш заказ успешно оформлен!");
            // Переход на страницу оплаты с передачей данных заказа
            navigate('/payment', { state: { order: newOrder } });
        } catch (error) {
            message.error("Ошибка при оформлении заказа. Попробуйте снова.");
        }
    };



    if (redirectToPayment) {
        return (
            <PaymentPage
                onPaymentComplete={() => navigate('/order-confirmation', { state: { order } })}
            />
        );
    }

    if (order) {
        return <OrderConfirmationPage order={order} />;
    }

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <AppHeader />
            <Content className="layout-content">
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Корзина</h2>
                <List
                    bordered
                    dataSource={cartItems}
                    renderItem={item => (
                        <List.Item
                            actions={[
                                <Button type="link" onClick={() => removeFromCart(item.id)}>Удалить</Button>
                            ]}
                        >
                            <List.Item.Meta
                                title={item.name}
                                description={`Цена: ${item.price} руб.`}
                            />
                        </List.Item>
                    )}
                />
                <Divider />
                <div style={{ textAlign: 'right' }}>
                    <p><strong>Итого: {cartItems.reduce((sum, item) => sum + item.price, 0)} руб.</strong></p>
                    <Button type="primary" onClick={handlePlaceOrder} disabled={cartItems.length === 0}>
                        Заказать
                    </Button>
                </div>
            </Content>
        </Layout>
    );
};


export default CartPage;