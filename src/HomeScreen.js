import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Card from './components/Card.js';
import Button from './components/Button.js';

import { CLASS } from './configs/config.js';
import { HomeScreen_configs } from './configs/HomeScreen_config.js';


// CSS
const Banner = styled.div`
  background-color: #33486189;
  text-align: center;
  padding: 40px 0;
  font-family: 'Open Sans', sans-serif;
  border-radius: 0 0 15px 15px; /* Bottom corners rounded */
`;

const Title = styled.h1`
  color: white;
  font-size: 36px;
  font-family: 'Open Sans', sans-serif;
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Subheader = styled.p`
  color: white;
  font-size: 18px;
  font-family: 'Open Sans', sans-serif;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Section = styled.section`
  padding: 10px 0;
`;

const Line = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 40px 0;
  max-width: 80%;
  margin: 0 auto;
`

const SectionContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ColoredTitle = styled.h2`
  text-align: center;
  color: ${({ color }) => color};
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Text = styled.p`
  text-align: justify;
  max-width: 600px;
  overflow: hidden;
  font-family: 'Open Sans', sans-serif;
  font-size: 0.9rem;
  line-height: 1.6rem;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 10; /* Limit text */
  -webkit-box-orient: vertical;
  @media (max-width: 768px) {
    max-width: 90%;
    margin: 0 auto;
    white-space: normal; /* Allows text wrapping on smaller screens */
  }
`;

const BottomSection = styled.section`
  background-color: steelblue;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 40px;
  padding-bottom: 40px;
  max-width: 80%;
  margin: 50px auto;
  border-radius: 15px 15px 15px 15px; /* Bottom corners rounded */
`;

const UnderlinedTitle = styled.h2`
  text-decoration: underline;
  font-family: 'Open Sans', sans-serif;
  color: white;
  text-align: center;
`;

// Original styled component
const StyledParagraph = styled.p`
  text-align: justify;
  font-family: 'Open Sans', sans-serif;
  color: white;
  max-width: 800px;
  margin: 0 auto;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
`;

// Wrapper component to use dangerouslySetInnerHTML
const JustifiedText = ({ htmlContent }) => (
  <StyledParagraph dangerouslySetInnerHTML={{ __html: htmlContent }} />
);

// Centering the button
const centerButton = {
  'display': 'flex', 
  'justifyContent': 'center', 
  'alignItems': 'center', 
  'width': '100%', 
  'padding-top': '20px',
}


/* Data for sections */
const sectionsData = Object.values(CLASS).map((section, index) => ({
    type: index,
    title: CLASS[index]['type'].charAt(0).toUpperCase() + CLASS[index]['type'].slice(1), // Capitalize first letter
  }));
  




/* SCREEN */
function HomeScreen() {
  const [cardDatas, setCardDatas] = useState({});
  const navigate = useNavigate();

  // Get data for cards
  useEffect(() => {
    const cardKeys = [
      {'type': 'stories', 'file': HomeScreen_configs['stories_file']}, 
      {'type': 'awards', 'file': HomeScreen_configs['awards_file']}, 
      {'type': 'projects', 'file': HomeScreen_configs['projects_file']}
    ];
    const cardDatasPromises = cardKeys.map(key =>
      import(`./${key['type']}/${key['file']}.js`)
        .then(module => ({
          details: module.default,
          redirection: `./${key['type']}/${key['file']}`,
        }))
        .catch(err => {
          console.error(`Failed to load details for ${key}`, err)
          return { details: { error: "Failed to load" }, redirection: "" };
        })
    );
  
    Promise.all(cardDatasPromises)
      .then(cardDetails => {
        const newCardDatas = cardDetails.reduce((acc, cardDetail, index) => {
          acc[index] = cardDetail;
          return acc;
        }, {});
        setCardDatas(newCardDatas);
      });
  }, []);


  // HTML
  return (
    Object.keys(cardDatas).length > 0 ? (
      <>
        <Banner>
          <Title>Pranav Joshi</Title>
          <Subheader>Aspiring Engineer · Programmer · IB Student</Subheader>
        </Banner>


        {/* Render sections dynamically */}
        {sectionsData.slice(0, 3).map((section, index) => (
          <Section key={index}>
            <SectionContent>
              {console.log(cardDatas)}
              <Card details={cardDatas[index]['details']} redirectToPage={cardDatas[index]['redirection']} />
              <div>
                <ColoredTitle color={CLASS[section.type]['colour']}>
                  Recent {section.title.charAt(0).toUpperCase() + section.title.slice(1)}
                </ColoredTitle>
                <Text>{cardDatas[index]['details']['description']}</Text>
                {/* Center the button */}
                <div style={centerButton}>
                  <Button type={section.type} onClick={() => navigate(`/${section.title}`)} />
                </div>
              </div>
            </SectionContent>
            {/* Dont generate the line on the last iteration */}
            {index !==2 && <Line/>}
          </Section>
        ))}


        {/* New Pink Section */}
        <BottomSection>
          <UnderlinedTitle>{`Goals of the month (${HomeScreen_configs.month}):`}</UnderlinedTitle>
          <JustifiedText htmlContent={HomeScreen_configs.goals}></JustifiedText>
        </BottomSection>

        {/* Your other content here */}
        <div className="content-wrap">
          <div id="wsite-content" className="wsite-elements wsite-not-footer">
            {/* Rest of your content */}
          </div>
        </div>

        <div id="root"></div>
        <script src="/static/js/bundle.js"></script>
      </>
    ) : (
      // Placeholder for loading screen
      <div>Loading...</div>
    )
  )
};

export default HomeScreen;
