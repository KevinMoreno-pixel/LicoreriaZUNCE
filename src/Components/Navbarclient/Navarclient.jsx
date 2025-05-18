import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Button,
    Stack,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery,
    useTheme
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from "../../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";
const categories = [
    "VINOS",
    "WHISKY",
    "TEQUILAS",
    "LICORES",
    "CERVEZAS",
    "COCTELERÍA",
    "BEBIDAS Y ALIMENTOS",
    "ACCESORIOS"
];

export default function Navbarclient({ onLogout }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { logout } = useAuth();
    const goTo = useNavigate();

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };
    function handleLogout() {
        logout();
        goTo("/");
    }
    const drawerContent = (
        <Box
            sx={{ width: 250, backgroundColor: '#111', height: '100%', color: 'white' }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {categories.map((text, index) => (
                    <ListItem button key={index}>
                        <ListItemText primary={text} sx={{ pl: 2 }} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="sticky" sx={{ backgroundColor: 'ActiveCaption', boxShadow: 'none' }}>
                <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>

                    {/* Logo */}
                    <Box display="flex" alignItems="center" gap={1}>
                        <img src="/logoZunce.png" alt="ZUNCE" style={{ height: '30px', width: '30px' }} />
                        <Typography variant="h6" fontWeight="bold">
                            ZUNCE MARKET
                        </Typography>
                    </Box>

                    {/* Categorías o menú */}
                    {isMobile ? (
                        <IconButton onClick={toggleDrawer(true)} sx={{ color: 'white' }}>
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        <Stack direction="row" spacing={3}>
                            {categories.map((category, index) => (
                                <Button
                                    key={index}
                                    sx={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        '&:hover': { color: '#FFD700' }
                                    }}
                                >
                                    {category}
                                </Button>
                            ))}
                        </Stack>
                    )}

                    {/* Iconos a la derecha */}
                    <Box>
                        <IconButton sx={{ color: 'white', mr: 1 }}>
                            <ShoppingCartIcon />
                        </IconButton>
                        <IconButton sx={{ color: 'white' }} onClick={handleLogout}>
                            <LogoutIcon />
                        </IconButton>
                    </Box>

                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: { backgroundColor: '#111' }
                }}
            >
                {drawerContent}
            </Drawer>
        </>
    );
}
