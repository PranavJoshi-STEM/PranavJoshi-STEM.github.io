import React, { useState, useEffect } from 'react';
import Card from './components/Card.js';
import { CLASS } from './configs/config.js';

import { find_all_dates } from './libraries/date.js';

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
    <div className="ClassOverviewScreen">
      <div className="header-banner" style={{ backgroundColor: CLASS[type]['colour'] }}>
        <h1>{CLASS[type]['text']}</h1>
      </div>

      <div className="card-container">
        {cards.map((card, index) => (
          <Card key={index} title={card.title} description={card.description} image={card.image} />
        ))}
      </div>
    </div>
  );
}

export default ClassOverviewScreen;
