// src/pages/ProductPage.jsx (atualizado)
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Grid, 
  Paper,
  CircularProgress,
  Alert 
} from '@mui/material';
import { useCart } from '../context/CartContext';
import { getProductById } from '../services/crud';

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (err) {
        setError('Erro ao carregar o produto. Tente novamente mais tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 6, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Typography variant="h5">Produto não encontrado</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box
              component="img"
              src={product.image || "https://via.placeholder.com/300"}
              alt={product.name}
              sx={{ width: '100%', borderRadius: 2 }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            {product.name}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            R$ {product.price.toFixed(2)}
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ mt: 3 }}>
            {product.description}
          </Typography>
          
          {product.features && product.features.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 'bold' }}>
                Características:
              </Typography>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>
                    <Typography variant="body1">{feature}</Typography>
                  </li>
                ))}
              </ul>
            </>
          )}
          
          <Button
            variant="contained"
            size="large"
            sx={{ mt: 4 }}
            onClick={() => addToCart(product)}
          >
            Adicionar ao Carrinho
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;