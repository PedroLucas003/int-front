// src/components/Navbar.jsx (atualizado)
import { Button, Typography, Badge, IconButton, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
  const { user, isAdmin, logout } = useContext(AuthContext);
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      p: 3,
      position: 'sticky',
      top: 0,
      zIndex: 1100,
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <Typography variant="h6" component={Link} to="/" sx={{ 
        fontWeight: 'bold',
        color: 'white',
        textDecoration: 'none',
        '&:hover': {
          color: '#64ffda'
        }
      }}>
        3Devs Studios
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button 
          component={Link} 
          to="/" 
          sx={{ 
            color: 'white',
            '&:hover': {
              color: '#64ffda',
              backgroundColor: 'rgba(100, 255, 218, 0.1)'
            }
          }}
        >
          Home
        </Button>
        {isAdmin && (
          <Button 
            component={Link} 
            to="/admin"
            sx={{ 
              color: 'white',
              '&:hover': {
                color: '#64ffda',
                backgroundColor: 'rgba(100, 255, 218, 0.1)'
              }
            }}
          >
            Admin
          </Button>
        )}
        <IconButton 
          component={Link} 
          to="/checkout"
          sx={{ 
            color: 'white',
            '&:hover': {
              color: '#64ffda',
              backgroundColor: 'rgba(100, 255, 218, 0.1)'
            }
          }}
        >
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        {user ? (
          <Button 
            onClick={handleLogout}
            sx={{ 
              color: 'white',
              '&:hover': {
                color: '#64ffda',
                backgroundColor: 'rgba(100, 255, 218, 0.1)'
              }
            }}
          >
            Sair
          </Button>
        ) : (
          <Button 
            component={Link} 
            to="/login"
            sx={{ 
              color: 'white',
              '&:hover': {
                color: '#64ffda',
                backgroundColor: 'rgba(100, 255, 218, 0.1)'
              }
            }}
          >
            Login
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;