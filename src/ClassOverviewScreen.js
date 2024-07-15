import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Card from './components/Card.js';
import { CLASS } from './configs/config.js';

import { find_all_dates } from './libraries/date.js';


// CSS
const Section = styled.section`
    background-color: #fff;
    padding: 20px;
`;

const Title = styled.h2`
    color: white;
    text-align: center;
    padding-top: 30px;
    padding-bottom: 30px;
    width: 100%;
    font-size: 3rem;
    border-radius: 15px 15px 15px 15px; /* Bottom corners rounded */

`;

const CardContainer = styled.section`
`



// Page
function ClassOverviewScreen({ type }) {
  const [cards, setCards] = useState([]);

  // Fetch cards data based on type (assuming each folder has JSON data files)
  useEffect(() => {
    find_all_dates(type).then(dates => {
      console.log(dates);
    }).catch(error => {
      console.error('Error fetching dates:', error);
    });
  }, [type]);

  return (
    <Section>
      <Title style={{ 'background-color': CLASS[type]['colour'] }}> All {CLASS[type].type}:</Title>
      <CardContainer>
        {cards.map((card, index) => (
          <Card key={index} data={card} />
        ))}
      </CardContainer>
    </Section>
  );
}

export default ClassOverviewScreen;
