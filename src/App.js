// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaUserCircle, FaGlobe } from 'react-icons/fa';

import HomePage           from './pages/HomePage';
import SearchResultsPage  from './pages/SearchResultsPage';
import DetailsPage        from './pages/DetailsPage';
import BookingPage        from './pages/BookingPage';
import LoginPage          from './pages/LoginPage';
import RegisterPage       from './pages/RegisterPage';
import ModeratorPage      from './pages/ModeratorPage';
import AddListingPage     from './pages/AddListingPage';
import ProfilePage        from './pages/ProfilePage';
import SupportPage        from './pages/SupportPage';

import './App.css';

function App() {
  return (
    <Router>
      <header className="app-header">
        <nav className="app-nav container">
          <Link to="/" className="logo">Roomify</Link>
          <ul className="nav-links">
            <li><Link to="/results">Результати пошуку</Link></li>
            <li><Link to="/support">Підтримка</Link></li>
          </ul>
          <div className="nav-actions">
            <button className="lang-switch" title="Мова"><FaGlobe /></button>
            <Link to="/profile" className="profile-btn" title="Профіль"><FaUserCircle /></Link>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/results"     element={<SearchResultsPage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/login"       element={<LoginPage />} />
        <Route path="/register"    element={<RegisterPage />} />
        <Route path="/moderator"   element={<ModeratorPage />} />
        <Route path="/add-listing" element={<AddListingPage />} />
        <Route path="/profile"     element={<ProfilePage />} />
        <Route path="/support"     element={<SupportPage />} />
      </Routes>
    </Router>
  );
}

export default App;
