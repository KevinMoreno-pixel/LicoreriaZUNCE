import React from "react";
import "../Carrousel/BrandCarousel.css";

const logos = [
    { name: "Coca-Cola", logo: "./coca.png" },
    { name: "Poker", logo: "./poker.png" },
    { name: "Bacardí", logo: "./bacardi.png" },
    { name: "buchanans", logo: "./buchanans.png" },
    { name: "corona", logo: "./corona.png" },
    { name: "club", logo: "./club.png" },
    { name: "walker", logo: "./walker.png" },
    { name: "heineken", logo: "./heineken.png" },
    { name: "aguardiente", logo: "./aguardiente.png" },
    { name: "oldparr", logo: "./oldparr.png" },
    { name: "Aguila", logo: "./aguila.png" },
    { name: "bailis", logo: "./bailis.png" },
    { name: "josecuervo", logo: "./josec.png" },
    { name: "ronmedellin", logo: "./ronmede.png" },
    { name: "costeña", logo: "./costenia.png" },
    { name: "RonCaldas", logo: "./caldas.png" },
    { name: "Smirnoff", logo: "./smirnoff.png" },
    { name: "chivas", logo: "./chivas.png" },
];

const Carousel = () => {
    return (
        <div className="carousel-container">
            <div className="carousel-track">
                {[...logos, ...logos].map((logos, index) => (
                    <img
                        key={index}
                        src={logos.logo}
                        alt={logos.name}
                        className="carousel-logo"
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
