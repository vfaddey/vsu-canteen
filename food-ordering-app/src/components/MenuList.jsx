import React, { useEffect, useState } from 'react';
import { Card, Button } from 'antd';
import { addToCart } from '../services/cartService';
import { fetchDishes } from '../services/api';


const MenuList = () => {
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        fetchDishes().then(data => setDishes(data));
    }, []);

    const handleAddToCart = (dish) => {
        addToCart(dish);
        alert(`${dish.name} добавлено в корзину!`);
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {dishes.map(dish => (
                <Card
                    key={dish.id}
                    cover={<img alt={dish.name} src={dish.image_url} style={{ height: 200, objectFit: 'cover' }} />}
                    title={dish.name}
                >
                    <p>{dish.description}</p>
                    <p>Цена: {dish.price} руб.</p>
                    <Button onClick={() => handleAddToCart(dish)}>Добавить в корзину</Button>
                </Card>
            ))}
        </div>
    );
};

export default MenuList;