import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import ArtisansList from './pages/ArtisansList/ArtisansList';
import ArtisanDetail from './pages/ArtisanDetail/ArtisanDetail';
import LegalPages from './pages/LegalPages/LegalPages';
import NotFound from './pages/NotFound/NotFound';
import './App.css';

function App() {
  return (
    <div className="App main-container">
      <Header />
      
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artisans" element={<ArtisansList />} />
          <Route path="/artisan/:id" element={<ArtisanDetail />} />
          <Route path="/mentions-legales" element={<LegalPages />} />
          <Route path="/donnees-personnelles" element={<LegalPages />} />
          <Route path="/accessibilite" element={<LegalPages />} />
          <Route path="/cookies" element={<LegalPages />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;