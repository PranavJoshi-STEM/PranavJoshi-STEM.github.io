import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import NavBar from './components/NavBar.js';

import HomeScreen from './HomeScreen.js';
import AboutMeScreen from './AboutMeScreen.js';
import ClassOverviewScreen from './ClassOverviewScreen.js';
import CustomPage from './CustomPage.js';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/about-me" element={<AboutMeScreen />} />
          <Route path="/stories" element={<ClassOverviewScreen type={0}/>} />
          <Route path="/stories/:pageName" element={<CustomPage pageType={0}/>} />
          <Route path="/awards" element={<ClassOverviewScreen type={1}/>} />
          <Route path="/awards/:pageName" element={<CustomPage pageType={1}/>} />
          <Route path="/projects" element={<ClassOverviewScreen type={2}/>} />
          <Route path="/projects/:pageName" element={<CustomPage pageType={2}/>} />
          <Route path="*" element={<Navigate to="/" />} /> {/* Redirect route */}
        </Routes>
      </Router>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}
