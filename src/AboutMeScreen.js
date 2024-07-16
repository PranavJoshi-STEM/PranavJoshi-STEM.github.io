import React from 'react';
import styled from 'styled-components';

import Card from './components/Card.js';


// CSS
const Section = styled.section`
    background-color: #fff;
    padding: 20px;
`;

const Title = styled.h2`
    background-color: #70abd4;
    color: white;
    text-align: center;
    padding-top: 30px;
    padding-bottom: 30px;
    width: 100%;
    font-size: 3rem;
    border-radius: 15px 15px 15px 15px; /* Bottom corners rounded */

`;

const Paragraph = styled.p`
    line-height: 1.6;
    font-family: 'Open Sans', sans-serif;
    font-size: 0.9rem;
    text-align: justify;
    max-width: 80%;
    margin: 0 auto 20px auto; /* Centered with margin at the bottom */
`;

const Divider = styled.hr`
    border: 0;
    border-top: 1px solid #ccc;
    margin: 20px 0;
`;

const Subtitle = styled.h3`
    font-size: 1.8rem;
    margin-bottom: 10px;
    font-family: 'Open Sans', sans-serif;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row; // Default to row layout
  justify-content: space-around; // Spread out cards evenly
  flex-wrap: wrap; // Allow wrapping for multiple cards
  width: 90%;
  margin: 0 auto;

  @media (max-width: 768px) { // Adjust for mobile screens
    flex-direction: column; // Stack cards vertically on small screens
    align-items: center; // Center cards vertically
  }
`;


// Main component
const AboutMeScreen = () => {
    return (
        <Section>
            <Title>About Me</Title>
            <Paragraph>
                · · · Hello there, I'm Pranav Joshi! A passionate grade-9 International Baccalaureate
                student who is interested in STEM. I love programming in languages such as Python,
                Javascript, HTML, and C# and regularly create projects that enhance my knowledge of
                engineering or coding. Currently, I have experience in web design with HTML, ReactJS,
                and coding games with Python. If you want to connect, I'm available via email and LinkedIn.
            </Paragraph>
            <Paragraph>
                <i>“Our greatest weakness lies in giving up. The most certain way to succeed is always to 
                <b> try just one more time.</b>”</i> - Thomas Edison
            </Paragraph>
            <Divider />
            <Subtitle>See me on...</Subtitle>
            <CardContainer>
                <Card
                    details={{
                        'card_title': '> LinkedIn <', 
                        'card_subtext': 'pranav-joshi-1b4610246', 
                        'file_name': 'LinkedIn Logo', 
                        'type': -1
                    }}
                    redirectToURL={'https://www.linkedin.com/in/pranav-joshi-1b4610246'}
                />
                <Card
                    details={{
                        'card_title': '> Email < ',
                        'card_subtext': 'Joshipn2018@gmail.com',
                        'file_name': 'Gmail Logo',
                        'type': -1,
                    }}
                    redirectToURL={'mailto:Joshipn2018@gmail.com'}
                />
                <Card
                    details={{
                        'card_title': '> GitHub <',
                        'card_subtext': 'PranavJoshi-STEM',
                        'file_name': 'Github Logo',
                        'type': -1,
                    }}
                    redirectToURL={'https://www.github.com/PranavJoshi-STEM'}
                />
            </CardContainer>
        </Section>
    );
};

export default AboutMeScreen;
