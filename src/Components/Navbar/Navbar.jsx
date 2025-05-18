import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    Badge,
    MenuItem,
    Menu,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import {
    Menu as MenuIcon,
    Search as SearchIcon,
    AccountCircle,
    Inventory as InventoryIcon,
    People as PeopleIcon,
    LocalShipping as SupplierIcon,
    Assessment as InventoryReportIcon,
    FactCheck as FactCheckIcon,
    LocalOffer as LocalOfferIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from "../../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function Navbar() {
    const { logout } = useAuth();
    const goTo = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    function handleLogout() {
        logout();
        goTo("/");
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    // Items del Drawer con rutas e iconos
    const drawerItems = [
        { text: 'Productos', icon: <InventoryIcon />, path: '/app/producto' },
        { text: 'Clientes', icon: <PeopleIcon />, path: '/app/Cliente' },
        { text: 'Proveedores', icon: <SupplierIcon />, path: '/app/Proveedor' },
        { text: 'Inventario', icon: <InventoryReportIcon />, path: '/app/lote' },
        { text: 'Facturas', icon: <FactCheckIcon />, path: '/app/Factura' },
        { text: 'Ofertas', icon: <LocalOfferIcon />, path: '/app/Oferta' },
    ];

    const DrawerList = (
        <Box
            sx={{

                width: 250,
                bgcolor: 'rgb(23, 23, 26)',
                height: '100%',
                color: 'white',
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
        >
            <List>

                {drawerItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            component={Link}
                            to={item.path}
                            sx={{ color: 'white' }}
                        >
                            <ListItemIcon sx={{ color: 'white' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>

    );

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose} component={Link} to="/profile">Perfil</MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/account">Mi cuenta</MenuItem>
            <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.43)' }}>
                <Toolbar>
                    <IconButton
                        onClick={toggleDrawer(true)}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/app"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            fontWeight: 'bold',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        <img src="/logoZunce.png" alt="ZUNCE" style={{ height: '20px', width: '20px' }} />
                        ZUNCE MARKET
                    </Typography>

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Buscar…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton sx={{ color: 'white', mr: 1 }}>
                        <ShoppingCartIcon />
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {renderMenu}
            <Drawer open={open} onClose={toggleDrawer(false)}
                sx={{ height: '100%' }}
            >
                {DrawerList}
            </Drawer>
        </Box>
    );
}