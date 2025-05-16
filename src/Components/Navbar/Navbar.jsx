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
    Mail as MailIcon,
    Notifications as NotificationsIcon,
    AccountCircle,
    More as MoreIcon,
    Inventory as InventoryIcon,
    BatchPrediction as BatchIcon,
    People as PeopleIcon,
    LocalShipping as SupplierIcon,
    Assessment as InventoryReportIcon,
    FactCheck as FactCheckIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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
        { text: 'Productos', icon: <InventoryIcon />, path: '/' },
        { text: 'Clientes', icon: <PeopleIcon />, path: '/Cliente' },
        { text: 'Proveedores', icon: <SupplierIcon />, path: '/suppliers' },
        { text: 'Inventario', icon: <InventoryReportIcon />, path: '/lote' },
        { text: 'Facturas', icon: <FactCheckIcon />, path: '/Factura' },

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
            <MenuItem onClick={handleMenuClose} component={Link} to="/logout">Cerrar sesión</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Perfil</p>
            </MenuItem>
        </Menu>
    );

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
                        to="/"
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
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <Drawer open={open} onClose={toggleDrawer(false)}
                sx={{ height: '100%' }}
            >
                {DrawerList}
            </Drawer>
        </Box>
    );
}