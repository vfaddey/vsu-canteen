import React, { useState } from 'react';
import { Card, Button, List, message } from 'antd';
import { deleteOrder } from '../services/api';
import { useNavigate } from 'react-router-dom';
import AppHeader from "./AppHeader.jsx";

const OrderConfirmationPage = ({ order }) => {
    const [orderStatus, setOrderStatus] = useState(order.status);
    const navigate = useNavigate();

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

    return (
        <>
            <AppHeader />
            <div style={{padding: '20px', maxWidth: '600px', margin: '0 auto', color: '#242424'}}>
                <h2>Ваш заказ #{order.id}</h2>
                <p>Статус: {orderStatus === 'pending' ? 'В ожидании' : 'Отменен'}</p>
                <List
                    dataSource={order.dishes}
                    renderItem={dish => (
                        <List.Item>
                            <Card
                                title={dish.name}
                                cover={<img alt={dish.name} src={dish.image_url}
                                            style={{height: 150, objectFit: 'cover'}}/>}
                            >
                                <p>{dish.description}</p>
                                <p>Цена: {dish.price} руб.</p>
                            </Card>
                        </List.Item>
                    )}
                />
                <div style={{textAlign: 'right', marginTop: '20px'}}>
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