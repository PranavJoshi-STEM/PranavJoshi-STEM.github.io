import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// CSS
const CardContainer = styled.div`
  box-shadow: 1px 4px 8px 1px rgba(0,0,0,0.2);
  transition: transform 0.2s, box-shadow 0.2s;
  width: 400px;
  max-width: 90%;
  border-radius: 5px;
  overflow: hidden;
  margin: 20px;
  cursor: pointer;

  &:hover {
    box-shadow: 1px 4px 4px 4px rgba(0.1,0.1,0.1,0.3);
    transform: scale(1.03);
  }
`;

const CardImage = styled.img`
  width: 100%;
  border-radius: 5px 5px 0 0;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const CardTitle = styled.h4`
  font-weight: bold;
  font-family: 'Open Sans', serif;
  text-align: center;
`;

const CardDescription = styled.p`
  margin: 0;
  font-family: 'Open Sans', serif;
  text-align: justify;
`;




const Card = ({ details, onCardClick, redirectToURL, redirectToPage }) => {
  const { card_title, card_subtext, file_name, type } = details;
  // Define imageSrc state with useState hook
  const [imageSrc, setImageSrc] = useState('');

  // load image
  useEffect(() => {
    const imagePath = type === -1 ? `/src/assets/${file_name}.png` : `/src/thumbnails/${type}/${file_name}.png`;
    setImageSrc(imagePath);
  }, [type, file_name]);


  const handleClick = () => {
    if (redirectToURL) {
      window.open(redirectToURL, '_blank');
    } else if (redirectToPage) {
      window.location.href = redirectToPage;
    } else if (onCardClick) {
      onCardClick();
    }
  };


  return (
    <CardContainer onClick={handleClick}>
      <CardImage src={imageSrc} alt={card_title} />
      <CardContent>
        <CardTitle>{card_title}</CardTitle>
        <CardDescription>{card_subtext}</CardDescription>
      </CardContent>
    </CardContainer>
  );
};

export default Card;
