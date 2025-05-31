import React from 'react';
import { Container, Grid, Typography, Box, Button, useMediaQuery, useTheme } from '@mui/material';
import ProductCard from '../components/ProductCard';
import './HomePage.css';

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const featuredProducts = [
    { 
      id: 1, 
      name: 'Teclado Mecânico RGB', 
      price: 899.90, 
      image: '/images/keyboard-high-end.jpg', 
      category: 'Teclado',
      brand: 'Razer',
      features: ['Switches Cherry MX', 'RGB Chroma', 'Repouso de pulso magnético']
    },
    { 
      id: 2, 
      name: 'Mouse Gamer Pro', 
      price: 599.90, 
      image: '/images/gaming-mouse.jpg', 
      category: 'Mouse',
      brand: 'Logitech',
      features: ['Sensor HERO 25K', '11 botões programáveis', 'Design ergonômico']
    },
    { 
      id: 3, 
      name: 'Headset 7.1 Surround', 
      price: 1299.90, 
      image: '/images/gaming-headset.jpg', 
      category: 'Headset',
      brand: 'SteelSeries',
      features: ['Áudio 7.1 virtual', 'Microfone retrátil', 'Iluminação RGB']
    },
    { 
      id: 4, 
      name: 'Mousepad XL RGB', 
      price: 349.90, 
      image: '/images/gaming-mousepad.jpg', 
      category: 'Acessório',
      brand: 'Corsair',
      features: ['Superfície de tecido premium', 'RGB de 18 zonas', 'Borda costurada']
    },
    { 
      id: 5, 
      name: 'Teclado Low Profile', 
      price: 1199.90, 
      image: '/images/low-profile-keyboard.jpg', 
      category: 'Teclado',
      brand: 'HyperX',
      features: ['Switches low-profile', 'Conexão wireless 2.4GHz', 'Bateria de 40h']
    },
    { 
      id: 6, 
      name: 'Mouse Sem Fio Elite', 
      price: 799.90, 
      image: '/images/wireless-mouse.jpg', 
      category: 'Mouse',
      brand: 'Razer',
      features: ['Sensor óptico 20K DPI', 'Conexão Bluetooth/2.4GHz', '8 botões programáveis']
    },
    { 
      id: 7, 
      name: 'Headset Bluetooth Premium', 
      price: 1599.90, 
      image: '/images/wireless-headset.jpg', 
      category: 'Headset',
      brand: 'Sony',
      features: ['ANC (Redução de ruído)', 'Bateria de 30h', 'Toque de controle']
    },
    { 
      id: 8, 
      name: 'Monitor Curvo 240Hz', 
      price: 4299.90, 
      image: '/images/gaming-monitor.jpg', 
      category: 'Monitor',
      brand: 'Samsung',
      features: ['Tela curva 27"', 'Taxa de atualização 240Hz', 'Resolução QHD']
    },
  ];

  const categories = [
    { name: 'Teclados', image: '/images/keyboard-high-end.jpg', link: '/teclados' },
    { name: 'Mouses', image: '/images/wireless-mouse.jpg', link: '/mouses' },
    { name: 'Headsets', image: '/images/wireless-headset.jpg', link: '/headsets' },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>
      {/* Categories */}
      <Typography variant="h5" gutterBottom sx={{ 
        mt: 6, 
        mb: 4, 
        fontWeight: 'bold', 
        color: 'text.primary',
        textAlign: 'center',
        position: 'relative',
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          width: '30%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent)'
        },
        '&::before': {
          left: 0
        },
        '&::after': {
          right: 0
        }
      }}>
        <Box component="span" sx={{ 
          px: 2,
          background: theme.palette.background.default,
          position: 'relative',
          zIndex: 1
        }}>
          CATEGORIAS PRINCIPAIS
        </Box>
      </Typography>
      <Grid container spacing={3} sx={{ mb: 8 }}>
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box 
              className="category-card" 
              component="a" 
              href={category.link}
              sx={{
                position: 'relative',
                borderRadius: 3,
                overflow: 'hidden',
                height: 240,
                cursor: 'pointer',
                display: 'block',
                textDecoration: 'none',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <Box
                component="img"
                src={category.image}
                alt={category.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.7)',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'flex-end',
                p: 4,
                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, transparent 70%)'
              }}>
                <Typography variant="h5" sx={{ 
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center',
                  width: '100%',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                  {category.name}
                </Typography>
              </Box>
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                textAlign: 'center',
                opacity: 0,
                transition: 'all 0.5s ease'
              }}>
                <Button 
                  variant="contained" 
                  size="small"
                  sx={{ 
                    backgroundColor: '#64ffda',
                    color: '#0f172a',
                    fontWeight: 'bold',
                    '&:hover': { 
                      backgroundColor: '#52e3c2'
                    }
                  }}
                >
                  VER PRODUTOS
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Featured Products */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h5" component="h2" sx={{ 
          fontWeight: 'bold', 
          color: 'text.primary',
          display: 'inline-block',
          position: 'relative',
          px: 3,
          '&::before': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: 0,
            width: '100%',
            height: 3,
            background: 'linear-gradient(90deg, #64ffda, #1976d2)',
            borderRadius: 3
          }
        }}>
          PRODUTOS EM DESTAQUE
        </Typography>
        <Typography variant="body1" sx={{ 
          mt: 2,
          color: 'text.secondary',
          maxWidth: 700,
          mx: 'auto'
        }}>
          Seleção dos nossos produtos mais premium e desejados pelos entusiastas de tecnologia
        </Typography>
      </Box>
      
      <Grid container spacing={4} className="product-grid" sx={{ mb: 8 }}>
        {featuredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* Newsletter Section */}
      <Box sx={{ 
        backgroundColor: '#f8fafc',
        borderRadius: 3,
        p: isMobile ? 3 : 5,
        my: 8,
        textAlign: 'center',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(0, 0, 0, 0.05)'
      }}>
        <Typography variant="h5" gutterBottom sx={{ 
          fontWeight: 'bold', 
          color: '#0f172a',
          mb: 2
        }}>
          RECEBA NOVIDADES EXCLUSIVAS
        </Typography>
        <Typography variant="body1" sx={{ 
          mb: 4, 
          maxWidth: 600, 
          mx: 'auto',
          color: '#64748b'
        }}>
          Junte-se à nossa comunidade e seja o primeiro a saber sobre lançamentos exclusivos, ofertas especiais e conteúdo premium.
        </Typography>
        <Box 
          component="form"
          sx={{
            display: 'flex',
            maxWidth: 500,
            mx: 'auto',
            gap: 2,
            flexDirection: isMobile ? 'column' : 'row'
          }}
        >
          <Box 
            component="input"
            type="email"
            placeholder="Seu melhor e-mail"
            required
            sx={{
              flex: 1,
              p: 1.5,
              border: '1px solid #e2e8f0',
              borderRadius: 2,
              fontSize: '1rem',
              backgroundColor: 'white',
              transition: 'all 0.3s ease',
              '&:focus': {
                outline: 'none',
                borderColor: '#64ffda',
                boxShadow: '0 0 0 3px rgba(100, 255, 218, 0.2)'
              },
              '&::placeholder': {
                color: '#94a3b8'
              }
            }}
          />
          <Button 
            type="submit"
            variant="contained"
            sx={{ 
              backgroundColor: '#0f172a',
              fontWeight: 'bold',
              px: 4,
              borderRadius: 2,
              '&:hover': { 
                backgroundColor: '#1e293b',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            ASSINAR
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;