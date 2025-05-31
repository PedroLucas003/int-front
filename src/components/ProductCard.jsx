// src/components/ProductCard.jsx (atualizado)
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={product.image || "https://via.placeholder.com/300"}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          R$ {product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => addToCart(product)}>
          Adicionar ao carrinho
        </Button>
        <Button size="small" component="a" href={`/products/${product.id}`}>
          Detalhes
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;