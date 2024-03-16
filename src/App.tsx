import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {removeFromCart, updateQuantity, setCartItems} from './redux/actions';
import { RootState } from './redux/store';
import { Grid, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { CartItem } from './types';

const App: React.FC = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart.cart as CartItem[]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            dispatch(setCartItems(data));
        };

        fetchProducts();
    }, [dispatch]);

    const handleQuantityChange = (productId: number, quantity: number) => {
        const cartItem = cart.find((item) => item.id === productId);
        if (cartItem) {
            dispatch(updateQuantity(productId, Math.min(quantity, 10)));
        }
    };


    const handleRemoveFromCart = (productId: number) => {
        dispatch(removeFromCart(productId));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={9}>
                {cart.map((item) => (
                    <Card key={item.id}>
                        <CardMedia
                            component="img"
                            image={item.image}
                            alt={item.title}
                            style={{
                                width: '200px',
                                height: '200px',
                                objectFit: 'cover',
                            }}
                        />
                        <CardContent>
                            <Typography variant="h6">{item.title}</Typography>
                            <Typography variant="body2">{item.description}</Typography>
                            <Typography variant="subtitle1">Количество: {item.quantity}</Typography>
                            <Typography variant="subtitle1">Стоимость: {item.price} руб.</Typography>
                            <IconButton
                                onClick={() => {
                                    handleQuantityChange(item.id, item.quantity + 1);
                                }}
                            >
                                <Add />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    if (item.quantity > 1) {
                                        handleQuantityChange(item.id, item.quantity - 1);
                                    }
                                }}
                            >
                                <Remove />
                            </IconButton>
                            <IconButton onClick={() => handleRemoveFromCart(item.id)}>
                                <Delete />
                            </IconButton>
                        </CardContent>
                    </Card>
                ))}
                {cart.length === 0 && (
                    <Typography variant="h6">Корзина пуста</Typography>
                )}
            </Grid>
            <Grid item xs={3}>
                <Typography variant="h5">Итого: {calculateTotal().toFixed(2)} руб.</Typography>
            </Grid>
        </Grid>
    );
};

export default App;