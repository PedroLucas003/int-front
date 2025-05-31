// src/pages/AdminPage.jsx
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Typography, Tabs, Tab, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Button, 
  TextField, Dialog, DialogActions, DialogContent, 
  DialogTitle, IconButton, Snackbar, Alert
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const AdminPage = () => {
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);
  const [tabValue, setTabValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Form states
  const [userForm, setUserForm] = useState({ name: '', email: '', password: '' });
  const [productForm, setProductForm] = useState({ name: '', price: '', quantity: '' });

  const showSnackbar = useCallback((message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar(prev => ({ ...prev, open: false }));
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const [usersResponse, productsResponse] = await Promise.all([
        api.get('/users'),
        api.get('/products')
      ]);
      setUsers(usersResponse.data);
      setProducts(productsResponse.data);
    } catch (error) {
      showSnackbar('Erro ao carregar dados', 'error');
      console.error('Error fetching data:', error);
    }
  }, [showSnackbar]);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    } else {
      fetchData();
    }
  }, [isAdmin, navigate, fetchData]);

  const handleTabChange = useCallback((event, newValue) => {
    setTabValue(newValue);
  }, []);

  const handleOpenDialog = useCallback((item = null, isEditing = false) => {
    setIsEdit(isEditing);
    setCurrentItem(item);
    
    if (tabValue === 0) {
      setUserForm(item ? { name: item.name, email: item.email, password: '' } : { name: '', email: '', password: '' });
    } else {
      setProductForm(item ? { 
        name: item.name, 
        price: item.price, 
        quantity: item.quantity 
      } : { name: '', price: '', quantity: '' });
    }
    
    setOpenDialog(true);
  }, [tabValue]);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
    setCurrentItem(null);
  }, []);

  const handleUserSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/users/${currentItem._id}`, userForm);
        showSnackbar('Usuário atualizado com sucesso!');
      } else {
        await api.post('/users', userForm);
        showSnackbar('Usuário criado com sucesso!');
      }
      fetchData();
      handleCloseDialog();
    } catch (error) {
      showSnackbar(error.response?.data?.message || 'Erro ao salvar usuário', 'error');
      console.error('Error saving user:', error);
    }
  }, [currentItem, fetchData, handleCloseDialog, isEdit, showSnackbar, userForm]);

  const handleProductSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/products/${currentItem._id}`, productForm);
        showSnackbar('Produto atualizado com sucesso!');
      } else {
        await api.post('/products', productForm);
        showSnackbar('Produto criado com sucesso!');
      }
      fetchData();
      handleCloseDialog();
    } catch (error) {
      showSnackbar(error.response?.data?.message || 'Erro ao salvar produto', 'error');
      console.error('Error saving product:', error);
    }
  }, [currentItem, fetchData, handleCloseDialog, isEdit, productForm, showSnackbar]);

  const handleDelete = useCallback(async (id) => {
    try {
      if (tabValue === 0) {
        await api.delete(`/users/${id}`);
        showSnackbar('Usuário removido com sucesso!');
      } else {
        await api.delete(`/products/${id}`);
        showSnackbar('Produto removido com sucesso!');
      }
      fetchData();
    } catch (error) {
      showSnackbar(error.response?.data?.message || 'Erro ao remover item', 'error');
      console.error('Error deleting item:', error);
    }
  }, [fetchData, showSnackbar, tabValue]);

  const renderUserTable = useCallback(() => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleOpenDialog(user, true)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(user._id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ), [handleDelete, handleOpenDialog, users]);

  const renderProductTable = useCallback(() => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell>Quantidade</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>R$ {Number(product.price).toFixed(2)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleOpenDialog(product, true)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(product._id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ), [handleDelete, handleOpenDialog, products]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Painel Administrativo
      </Typography>
      
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Usuários" />
        <Tab label="Estoque" />
      </Tabs>
      
      <Box sx={{ mt: 2 }}>
        <Button 
          variant="contained" 
          onClick={() => handleOpenDialog(null, false)}
          sx={{ mb: 2 }}
        >
          Adicionar {tabValue === 0 ? 'Usuário' : 'Produto'}
        </Button>
        
        {tabValue === 0 ? renderUserTable() : renderProductTable()}
      </Box>
      
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          {isEdit ? 'Editar' : 'Adicionar'} {tabValue === 0 ? 'Usuário' : 'Produto'}
        </DialogTitle>
        <DialogContent>
          {tabValue === 0 ? (
            <Box component="form" onSubmit={handleUserSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Nome"
                name="name"
                value={userForm.name}
                onChange={(e) => setUserForm({...userForm, name: e.target.value})}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={userForm.email}
                onChange={(e) => setUserForm({...userForm, email: e.target.value})}
              />
              <TextField
                margin="normal"
                required={!isEdit}
                fullWidth
                label="Senha"
                name="password"
                type="password"
                value={userForm.password}
                onChange={(e) => setUserForm({...userForm, password: e.target.value})}
              />
            </Box>
          ) : (
            <Box component="form" onSubmit={handleProductSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Nome do Produto"
                name="name"
                value={productForm.name}
                onChange={(e) => setProductForm({...productForm, name: e.target.value})}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Preço"
                name="price"
                type="number"
                inputProps={{ step: "0.01", min: "0" }}
                value={productForm.price}
                onChange={(e) => setProductForm({...productForm, price: e.target.value})}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Quantidade"
                name="quantity"
                type="number"
                inputProps={{ min: "0" }}
                value={productForm.quantity}
                onChange={(e) => setProductForm({...productForm, quantity: e.target.value})}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button 
            onClick={tabValue === 0 ? handleUserSubmit : handleProductSubmit}
            variant="contained"
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminPage;