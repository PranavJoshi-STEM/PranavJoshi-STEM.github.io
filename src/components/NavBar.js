import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled components
const NavBarContainer = styled.nav`
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const NavBarBrand = styled(Link)`
  font-size: 1.5rem;
  text-decoration: none;
  color: #fff;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
    display: none; /* Hide by default on mobile */
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

const MobileMenuToggle = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Toggle the display of NavLinks on mobile
    document.querySelector('#nav-links').style.display = isMobileMenuOpen ? 'none' : 'flex';
  };

  return (
    <NavBarContainer>
      <NavBarBrand to="/">🏠</NavBarBrand>

      <MobileMenuToggle onClick={toggleMobileMenu}>
        Menu
      </MobileMenuToggle>

      {/* Add an ID to target with document.querySelector */}
      <NavLinks id="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/stories">Stories</NavLink>
        <NavLink to="/awards">Accomplishments</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/about-me">About Me</NavLink>
      </NavLinks>
    </NavBarContainer>
  );
};

export default NavBar;