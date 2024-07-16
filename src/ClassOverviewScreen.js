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

const NewYear = styled.h3`
    text-align: center;
    font-size: 2rem;
`;

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-bottom: 20px;
`;

const Line = styled.hr`
    border: 0;
    border-top: 1px solid #ccc;
    margin: 40px 0;
`;




// Function to dynamically import the default module from the given post file
async function importPostModule(post, type) {
  if (typeof post !== 'string' || !Number.isInteger(type) || type < 0 || type >= 3) {
    console.error("Invalid parameters: post must be a string and type must be an integer within the valid range.");
    return null;
  }

  const typeDir = ['stories', 'awards', 'projects'][type];
  const modulePath = `./${typeDir}/${post}`;

  try {
    console.log(`Attempting to import module from: ${modulePath}`); // Debugging log
    // Dynamically import the module
    const module = await import(`${modulePath}`);
    // Access the default export of the module
    return module.default;
  } catch (error) {
    console.error(`Failed to import module from path "${modulePath}":`, error);
    return null;
  }
}

// Page
function ClassOverviewScreen({ type }) {
  const [dates, setDates] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [cardDetails, setCardDetails] = useState({});

  // Fetch cards data based on type (assuming each folder has JSON data files)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDates = await find_all_dates(type);
        console.log(fetchedDates);
        setDates(fetchedDates); // Update the dates state
        setIsDone(true); // Update the isDone state to true after fetching

        // Fetch card details for each post
        const details = {};
        for (const { posts } of fetchedDates) {
          for (const post of posts) {
            details[post] = await importPostModule(post, type);
          }
        }
        setCardDetails(details);
      } catch (error) {
        console.error('Error fetching dates:', error);
      }
    };

    fetchData();
  }, [type]); // Only re-run the effect if `type` changes

  // Helper function to chunk an array into groups of 3
  const chunkArray = (array, size) => {
    return array.reduce((acc, val, i) => {
      let idx = Math.floor(i / size);
      let page = acc[idx] || (acc[idx] = []);
      page.push(val);
      return acc;
    }, []);
  };

  // Don't load before scan is done
  if (!isDone) {
    return <div>Loading...</div>;
  }

  // Render JSX
  return (
    <Section>
      <Title style={{ backgroundColor: CLASS[type]['colour'] }}> All {CLASS[type].type}:</Title>
      <div>
        {dates.map(({ year, posts }) => (
          <Section key={year}>
            <NewYear style={{ 'color': CLASS[type]['colour'] }}>{year}:</NewYear>
            {chunkArray(posts, 3).map((row, index) => (
              <Row key={index}>
                {row.map((post, idx) => {
                  const details = cardDetails[post];
                  return details ? (
                    <Card key={post} details={details} redirectToPage={`/${CLASS[type]['type']}/${post.slice(0, -3)}`} />
                  ) : null;
                })}
              </Row>
            ))}
            <Line />
          </Section>
        ))}
      </div>
    </Section>
  );
}

export default ClassOverviewScreen;
