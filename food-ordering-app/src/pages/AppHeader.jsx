import React from 'react';
import { Badge, Button, Layout } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const AppHeader = () => {
    const { cartItems } = useCart();

    return (
        <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1890ff', color: '#fff' }}>
            <Link to="/" style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold' }}>Меню Столовой</Link>
            <Link to="/cart">
                <Badge count={cartItems.length} offset={[10, 0]}>
                    <Button type="primary" shape="circle" icon={<ShoppingCartOutlined />} />
                </Badge>
            </Link>
        </Header>
    );
};

export default AppHeader;