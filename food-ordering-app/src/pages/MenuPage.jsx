import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Layout } from 'antd';
import { useCart } from '../context/CartContext';
import { fetchDishes } from '../services/api';
import AppHeader from './AppHeader';

const { Content } = Layout;

const MenuPage = () => {
    const [dishes, setDishes] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchDishes().then(data => setDishes(data));
    }, []);

    return (
        <Layout style={{ minHeight: '100vh', width: '100%' }}>
            <AppHeader />
            <Content className="layout-content">
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Выберите ваше блюдо</h2>
                <Row gutter={[16, 16]} justify="center">
                    {dishes.map(dish => (
                        <Col xs={24} sm={12} md={8} lg={6} key={dish.id}>
                            <Card
                                hoverable
                                cover={<img alt={dish.name} src={dish.image_url} style={{ height: 200, objectFit: 'cover' }} />}
                                style={{ borderRadius: '8px', overflow: 'hidden' }}
                            >
                                <Card.Meta title={dish.name} description={dish.description} />
                                <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Цена: {dish.price} руб.</p>
                                <Button
                                    type="primary"
                                    block
                                    onClick={() => addToCart(dish)}
                                >
                                    Добавить в корзину
                                </Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Content>
        </Layout>
    );
};

export default MenuPage;