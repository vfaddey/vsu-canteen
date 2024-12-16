import React, { useState, useEffect } from 'react';
import { Card, Button, List, message } from 'antd';
import { deleteOrder } from '../services/api';
import { useNavigate, useLocation } from 'react-router-dom';
import AppHeader from "./AppHeader.jsx";

const OrderConfirmationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Получаем объект заказа из location.state
    const order = location.state?.order;

    // Проверка: если `order` отсутствует, перенаправляем на главную
    useEffect(() => {
        if (!order) {
            message.error("Данные о заказе недоступны.");
            navigate('/');
        }
    }, [order, navigate]);

    const [orderStatus, setOrderStatus] = useState(order?.status || 'unknown');

    const handleCancelOrder = async () => {
        try {
            await deleteOrder(order.id);
            setOrderStatus('canceled');
            message.success("Заказ успешно отменен");
            navigate('/');
        } catch (error) {
            message.error("Ошибка при отмене заказа");
        }
    };

    if (!order) {
        // Показываем загрузку или ничего, пока проверяется наличие заказа
        return null;
    }

    return (
        <>
            <AppHeader />
            <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', color: '#242424' }}>
                <h2>Ваш заказ #{order.id}</h2>
                <p>Статус: {orderStatus === 'pending' ? 'В ожидании' : 'Отменен'}</p>
                <List
                    dataSource={order.dishes}
                    renderItem={dish => (
                        <List.Item>
                            <Card
                                title={dish.name}
                                cover={<img alt={dish.name} src={dish.image_url}
                                            style={{ height: 150, objectFit: 'cover' }} />}
                            >
                                <p>{dish.description}</p>
                                <p>Цена: {dish.price} руб.</p>
                            </Card>
                        </List.Item>
                    )}
                />
                <div style={{ textAlign: 'right', marginTop: '20px' }}>
                    {orderStatus === 'pending' && (
                        <Button type="primary" danger onClick={handleCancelOrder}>
                            Отменить заказ
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
};

export default OrderConfirmationPage;
