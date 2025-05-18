import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const images = [
    {
        url: 'https://bartail.com.co/wp-content/uploads/descubre-la-mejor-marca-de-whisky-cual-es-la-mas-recomendada.jpg', // Whisky
        title: 'Whisky´s',
        width: '33.33%',
        route: '/category/whisky',
    },
    {
        url: 'https://www.vintec.com/globalassets/vintec/anz/inspire/articles/store-away-1370x7362.jpg?preset=h600', // Vinos
        title: 'Vinos',
        width: '33.33%',
        route: '/category/vinos',
    },
    {
        url: 'https://yolongbrewtech.com/wp-content/uploads/2019/10/Anheuser-Busch-beer.jpeg', // Cervezas
        title: 'Cervezas',
        width: '33.33%',
        route: '/category/cervezas',
    },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 250,
    [theme.breakpoints.down('sm')]: {
        width: '100% !important',
        height: 120,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));

export default function FeaturedProducts() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                minWidth: 300,
                width: '100%',
                mt: 4,
                mb: 6,
            }}
        >
            {images.map((image) => (
                <ImageButton
                    key={image.title}
                    style={{ width: image.width }}
                    onClick={() => navigate(image.route)}
                >
                    <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                    <ImageBackdrop className="MuiImageBackdrop-root" />
                    <Image>
                        <Typography
                            component="span"
                            variant="h5"
                            color="inherit"
                            sx={(theme) => ({
                                position: 'relative',
                                p: 4,
                                pt: 2,
                                pb: `calc(${theme.spacing(1)} + 6px)`,
                                fontWeight: 'bold',
                                letterSpacing: 1,
                            })}
                        >
                            {image.title}
                            <ImageMarked className="MuiImageMarked-root" />
                        </Typography>
                    </Image>
                </ImageButton>
            ))}
        </Box>
    );
}
