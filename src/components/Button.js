import React from 'react';
import styled from 'styled-components';
import { CLASS } from '../configs/config.js';

const StyledButton = styled.button`
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.2s;
  cursor: pointer;
  border: none;
  border-radius: 5px;

  background-color: ${({ type }) => CLASS[type]?.colour || '#ccc'};
  color: white;

  &:hover {
    opacity: 0.8;
  }
`;

const Button = ({ type, onClick }) => {
  let buttonText = ['Check out my stories!', 'Check out my accomplishments!', 'Check out my projects!'][type];

  return (
    <StyledButton type={type} onClick={onClick}>
      {buttonText}
    </StyledButton>
  );
};

export default Button;
