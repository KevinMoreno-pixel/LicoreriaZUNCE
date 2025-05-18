import React, { useState } from 'react';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
    Box
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useNavigate } from 'react-router-dom';

const people = [
    {
        name: 'Kevin Andres Moreno Perez',
        role: 'Desarrollador Full Stack',
        profesor: 'FREDY ANTONIO VERASTEGUI GONZALEZ',
        avatar: 'https://i.imgur.com/1cTP17o_d.webp?maxwidth=760&fidelity=grand',
        Universidad: 'Universidad de la Amazonia',
        Edad: '22 Años',
        GitHub: 'https://github.com/KevinMoreno-pixel',
        instagram: 'https://www.instagram.com/kevin_ampz'

    },
];

const CardInfo = () => {

    const [style, setStyle] = useState({});

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width - 0.5) * 50; // rango -10 a 10
        const y = ((e.clientY - top) / height - 0.5) * 50;
        setStyle({
            transform: `rotateY(${x}deg) rotateX(${-y}deg) scale(1.05)`,
        });
    };

    const resetStyle = () => {
        setStyle({ transform: 'rotateY(0deg) rotateX(0deg) scale(1)' });
    };



    return (
        <Grid container spacing={7} justifyContent="center">
            {people.map((person, index) => (
                <Grid item xs={12} sm={6} md={5} key={index} >
                    <Card
                        onMouseMove={handleMouseMove}
                        onMouseLeave={resetStyle}
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.12)',
                            color: 'white',
                            height: 300,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            py: 7,
                            transition: 'transform 0.1s ease-out',
                            transformStyle: 'preserve-3d',
                            perspective: 1000,
                            ...style,


                        }}
                    >
                        <Avatar
                            alt={person.name}
                            src={person.avatar}
                            sx={{ width: 100, height: 100 }}
                        />
                        <CardContent
                            sx={{
                                textAlign: 'center',
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                px: 1,
                                py: 2,
                            }}
                        >
                            <Typography variant="h6" noWrap>{person.name}</Typography>
                            <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                                {person.role}
                            </Typography>
                            <Typography variant="body2" color='gray'>
                                de la mano de:
                            </Typography>
                            <Typography variant="body2" color='gray'>
                                {person.profesor}
                            </Typography>
                            <Typography
                                variant="body2"
                            >
                                {person.Universidad}
                            </Typography>
                            <Typography
                                variant="body2"
                            >
                                {person.Edad}
                            </Typography>

                        </CardContent>
                        <Box
                            variant="body2"
                        >
                            <a href={person.GitHub}>
                                <GitHubIcon fontSize="large"
                                    sx={{
                                        color: 'white',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            color: 'action.active'
                                        }

                                    }} />
                            </a>
                            <a href={person.instagram}>
                                <InstagramIcon fontSize="large"
                                    sx={{
                                        color: 'white',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            color: 'action.active'
                                        }

                                    }} />
                            </a>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>

    );
};

export default CardInfo;

