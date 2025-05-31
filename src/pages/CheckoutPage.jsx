// src/pages/CheckoutPage.jsx
import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  TextField,
  Grid
} from '@mui/material';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    totalPrice 
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Aqui você pode adicionar lógica para processar o pedido
    alert('Pedido finalizado com sucesso!');
    clearCart();
    navigate('/');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Finalizar Pedido
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            Itens no Carrinho
          </Typography>
          
          {cart.length === 0 ? (
            <Typography variant="body1" sx={{ mb: 4 }}>
              Seu carrinho está vazio.
            </Typography>
          ) : (
            <TableContainer component={Paper} sx={{ mb: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Produto</TableCell>
                    <TableCell align="right">Preço</TableCell>
                    <TableCell align="center">Quantidade</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell component="th" scope="row">
                        {item.name}
                      </TableCell>
                      <TableCell align="right">
                        R$ {item.price.toFixed(2)}
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          inputProps={{ min: 1 }}
                          size="small"
                          sx={{ width: 70 }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        <Button 
                          color="error"
                          size="small"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remover
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Resumo do Pedido
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography>Subtotal:</Typography>
              <Typography>R$ {totalPrice.toFixed(2)}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography>Frete:</Typography>
              <Typography>Grátis</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Total:
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                R$ {totalPrice.toFixed(2)}
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={cart.length === 0}
              onClick={handleCheckout}
              sx={{ py: 1.5 }}
            >
              Finalizar Compra
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;