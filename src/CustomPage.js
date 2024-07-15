import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { CLASS } from './configs/config.js';

import { extract_date } from './libraries/date.js';


// CSS
const StyledHeader = styled.header`
  background-color: var(--headerColor);
  border-radius: 0 0 15px 15px; /* Bottom corners rounded */
  padding: 20px;
  text-align: center;
  color: white;
  font-family: 'Times New Roman', serif;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 0.5em;
`;

const Subtitle = styled.p`
  font-size: 1.2em;
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px 0;
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 15px;
  @media (max-width: 768px)
    max-width: 100%;
  }
`;

const StyledH2 = styled.h2`
  text-align: center;
  color: var(--headerColor);
  font-size: 1.5rem;
`;

const StyledP = styled.p`
  font-family: 'Open Sans', sans-serif;
  text-align: justify;
  width: 75%;
  margin: 0 auto;
  font-size: 1rem;
  padding-bottom: 80px;
`;





// Page
const CustomPage = ({ pageType }) => {
  let { pageName } = useParams();

  console.log(pageName)

  let headerColor = '';
  let pageTitle = '';
  let pageClassName = '';

  // Determine header color and title based on pageType
  switch (pageType) {
    case 0: // Cyan - Events
      headerColor = CLASS[0]['colour'];
      pageTitle = CLASS[0]['text'];
      pageClassName = 'wsite-background-5';
      break;
    case 1: // Red - Awards
      headerColor = CLASS[1]['colour'];
      pageTitle = CLASS[1]['text'];
      pageClassName = 'wsite-background-5';
      break;
    case 2: // Green - Projects
      headerColor = CLASS[2]['colour'];
      pageTitle = CLASS[2]['text'];
      pageClassName = 'wsite-section-bg-color';
      break;
    default:
      break;
  }

  // Assign data
  console.log(pageName)
  const pageDate = extract_date(pageName);

  let data = {
    date: `(${pageDate['month_short_str']} ${pageDate['day']}, ${pageDate['year']})`,
    image: 'https://www.w3schools.com/w3images/paris.jpg',
    title: 'Paris',
    desc: 'Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.Paris is the capital of France.'
  };

  return (
    <div className={pageClassName}>
      <StyledHeader style={{ backgroundColor: headerColor }}>
        <Title>{pageTitle}</Title>
        <Subtitle>{data.date}</Subtitle>
      </StyledHeader>

      <ImageContainer>
        <StyledImage src={data.image} alt={'Image'} />
      </ImageContainer>

      <StyledH2 style={{ color: headerColor }}>{data.title}</StyledH2>
      <StyledP>{data.desc}</StyledP>
    </div>
  );
};

export default CustomPage;