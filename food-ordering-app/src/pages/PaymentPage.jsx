import React from 'react';
import { Layout, Form, Input, Button, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const { Content } = Layout;

const PaymentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const order = location.state?.order;

    // Проверяем наличие данных о заказе
    if (!order) {
        message.error("Данные о заказе недоступны.");
        navigate('/');
        return null;
    }

    const handlePayment = async (values) => {
        try {
            // Эмулируем процесс оплаты
            await new Promise(resolve => setTimeout(resolve, 2000));
            message.success("Оплата успешно завершена!");
            // Переход на страницу подтверждения заказа
            navigate('/order-confirmation', { state: { order } });
        } catch (error) {
            message.error("Ошибка при обработке оплаты. Попробуйте снова.");
        }
    };

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Content style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
                <h2 style={{ textAlign: 'center' }}>Оплата заказа #{order.id}</h2>
                <Form onFinish={handlePayment} layout="vertical">
                    <Form.Item
                        label="Номер карты"
                        name="cardNumber"
                        rules={[{ required: true, message: 'Введите номер карты' }]}
                    >
                        <Input placeholder="0000 0000 0000 0000" />
                    </Form.Item>
                    <Form.Item
                        label="Срок действия"
                        name="expiryDate"
                        rules={[{ required: true, message: 'Введите срок действия карты' }]}
                    >
                        <Input placeholder="MM/YY" />
                    </Form.Item>
                    <Form.Item
                        label="CVV"
                        name="cvv"
                        rules={[{ required: true, message: 'Введите CVV' }]}
                    >
                        <Input.Password placeholder="123" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Оплатить
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    );
};

export default PaymentPage;
