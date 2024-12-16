import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Layout, Divider } from 'antd';
import { useCart } from '../context/CartContext';
import { fetchDishes } from '../services/api';
import AppHeader from './AppHeader';

const { Content } = Layout;

const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
const categories = ['Холодные закуски', 'Первые блюда', 'Вторые блюда', 'Гарниры', 'Напитки', 'Выпечка'];

const MenuPage = () => {
    const [dishes, setDishes] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchDishes().then(data => setDishes(data));
    }, []);

    const getDishesByDayAndCategory = (day, category) => {
        return dishes.filter(dish => dish.day === day && dish.category === category);
    };

    return (
        <Layout style={{ minHeight: '100vh', width: '100%' }}>
            <AppHeader />
            <Content className="layout-content" style={{ padding: '20px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Меню на неделю</h2>
                {daysOfWeek.map(day => (
                    <div key={day}>
                        <Divider orientation="left" style={{ fontSize: '18px' }}>{day}</Divider>
                        {categories.map(category => {
                            const dishesForCategory = getDishesByDayAndCategory(day, category);
                            if (dishesForCategory.length === 0) return null; // Пропускаем пустые категории
                            return (
                                <div key={category}>
                                    <h3 style={{ marginTop: '20px' }}>{category}</h3>
                                    <Row gutter={[16, 16]} justify="center">
                                        {dishesForCategory.map(dish => (
                                            <Col xs={24} sm={12} md={8} lg={6} key={dish.id}>
                                                <Card
                                                    hoverable
                                                    cover={
                                                        <img
                                                            alt={dish.name}
                                                            src={dish.image_url}
                                                            style={{ height: 200, objectFit: 'cover' }}
                                                        />
                                                    }
                                                    style={{ borderRadius: '8px', overflow: 'hidden' }}
                                                >
                                                    <Card.Meta
                                                        title={dish.name}
                                                        description={dish.description}
                                                    />
                                                    <p style={{ fontWeight: 'bold', marginTop: '10px' }}>
                                                        Цена: {dish.price} руб.
                                                    </p>
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
                                </div>
                            );
                        })}
                    </div>
                ))}
            </Content>
        </Layout>
    );
};

export default MenuPage;