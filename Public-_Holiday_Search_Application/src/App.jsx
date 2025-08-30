import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';

import  HolidayList  from './Components/HolidayList.jsx';
import  HolidayCalendar  from './Components/HolidayCalendar.jsx';
import  HomePage  from './Components/Homepage.jsx';
import  LoginForm  from './Components/LoginForm.jsx';

const countries = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'JP', name: 'Japan' },
  { code: 'IN', name: 'India' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'SE', name: 'Sweden' },
  { code: 'NO', name: 'Norway' },
];

function App() {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('list');

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  useEffect(() => {
    // Load user preferences from localStorage
    const savedCountry = localStorage.getItem('holidayApp_country');
    const savedYear = localStorage.getItem('holidayApp_year');
    const savedDarkMode = localStorage.getItem('holidayApp_darkMode');
    const savedUser = localStorage.getItem('holidayApp_user');

    if (savedCountry) setSelectedCountry(savedCountry);
    if (savedYear) setSelectedYear(savedYear);
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      document.body.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
      document.body.setAttribute('data-bs-theme', 'light');
    }
    // Save dark mode preference
    localStorage.setItem('holidayApp_darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const savePreferences = () => {
    localStorage.setItem('holidayApp_country', selectedCountry);
    localStorage.setItem('holidayApp_year', selectedYear);
    localStorage.setItem('holidayApp_darkMode', JSON.stringify(darkMode));
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('holidayApp_user', JSON.stringify(userData));
    setCurrentView('holidays');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('holidayApp_user');
    setCurrentView('home');
  };

  const fetchHolidays = async () => {
    if (!selectedCountry || !selectedYear) return;

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://date.nager.at/api/v3/publicholidays/${selectedYear}/${selectedCountry}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch holidays. Please check your country code and year.');
      }
      
      const data = await response.json();
      setHolidays(data);
      savePreferences();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching holidays');
      setHolidays([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const exportHolidays = () => {
    if (holidays.length === 0) return;

    const csvContent = [
      'Date,Local Name,Name,Country Code,Global,Types',
      ...holidays.map(holiday => 
        `${holiday.date},"${holiday.localName}","${holiday.name}",${holiday.countryCode},${holiday.global},"${holiday.types.join(', ')}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `holidays_${selectedCountry}_${selectedYear}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const renderHeader = () => (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom sticky-top">
      <div className="container">
        <button 
          className="navbar-brand btn btn-link text-decoration-none d-flex align-items-center p-0 border-0"
          onClick={() => setCurrentView('home')}
        >
          <i className="bi bi-globe me-2 fs-4 text-primary"></i>
          <span className="fs-4 fw-semibold text-dark">Holiday Planner</span>
        </button>
        
        {/* Mobile toggle button */}
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Navigation Links */}
          {currentView !== 'login' && (
            <div className="navbar-nav me-auto">
              <button
                className={`nav-link btn btn-sm me-2 d-flex align-items-center border-0 ${
                  currentView === 'home' ? 'btn-primary text-white' : 'btn-outline-secondary'
                }`}
                onClick={() => setCurrentView('home')}
              >
                <i className="bi bi-house me-1"></i>
                Home
              </button>
              <button
                className={`nav-link btn btn-sm me-2 d-flex align-items-center border-0 ${
                  currentView === 'holidays' ? 'btn-primary text-white' : 'btn-outline-secondary'
                }`}
                onClick={() => setCurrentView('holidays')}
              >
                <i className="bi bi-calendar-event me-1"></i>
                Holidays
              </button>
            </div>
          )}
          
          {/* Right side controls */}
          <div className="navbar-nav ms-auto d-flex flex-row align-items-center gap-2">
            <button
              className="btn btn-outline-secondary btn-sm d-flex align-items-center"
              onClick={toggleDarkMode}
            >
              <i className={`bi ${darkMode ? 'bi-sun' : 'bi-moon'} me-1`}></i>
              <span className="d-none d-sm-inline">{darkMode ? 'Light' : 'Dark'}</span>
            </button>
            
            {currentView !== 'login' && (
              user ? (
                <div className="dropdown">
                  <button 
                    className="btn btn-outline-secondary btn-sm d-flex align-items-center" 
                    type="button" 
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-person me-1"></i>
                    <span className="d-none d-sm-inline">{user.name}</span>
                    <i className="bi bi-chevron-down ms-1"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li className="dropdown-item-text">
                      <i className="bi bi-person me-2"></i>
                      {user.email}
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <button
                  className="btn btn-outline-secondary btn-sm d-flex align-items-center"
                  onClick={() => setCurrentView('login')}
                >
                  <i className="bi bi-box-arrow-in-right me-1"></i>
                  <span className="d-none d-sm-inline">Sign In</span>
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );

  if (currentView === 'login') {
    return (
      <div className="min-vh-100">
        {renderHeader()}
        <LoginForm
          onLogin={handleLogin}
          onCancel={() => setCurrentView('home')}
        />
      </div>
    );
  }

  if (currentView === 'home') {
    return (
      <div className="min-vh-100">
        {renderHeader()}
        <HomePage
          onGetStarted={() => setCurrentView('holidays')}
          isLoggedIn={!!user}
          userName={user?.name}
        />
      </div>
    );
  }

  return (
    <div className="min-vh-100">
      {renderHeader()}

      <main className="container py-4">
        {/* Search Controls */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title d-flex align-items-center mb-0">
              <i className="bi bi-calendar-event me-2"></i>
              Search Public Holidays
            </h5>
          </div>
          <div className="card-body">
            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <label htmlFor="country" className="form-label">Country</label>
                <select 
                  className="form-select" 
                  value={selectedCountry} 
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="year" className="form-label">Year</label>
                <select 
                  className="form-select" 
                  value={selectedYear} 
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  {years.map((year) => (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 d-flex align-items-end gap-2">
                <button 
                  className="btn btn-primary flex-fill" 
                  onClick={fetchHolidays} 
                  disabled={loading}
                >
                  {loading ? 'Searching...' : 'Search Holidays'}
                </button>
                {holidays.length > 0 && (
                  <button className="btn btn-outline-secondary" onClick={exportHolidays}>
                    <i className="bi bi-download"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            <div>{error}</div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                <span>Loading holidays...</span>
              </div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="border rounded p-3 mb-2">
                  <div className="placeholder-glow">
                    <span className="placeholder col-6"></span>
                    <br />
                    <span className="placeholder col-4"></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && holidays.length > 0 && (
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">
                {holidays.length} Public Holidays in {countries.find(c => c.code === selectedCountry)?.name} ({selectedYear})
              </h5>
              <span className="badge bg-secondary">
                {holidays.filter(h => h.global).length} Global
              </span>
            </div>
            <div className="card-body">
              <ul className="nav nav-tabs mb-3">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'list' ? 'active' : ''}`}
                    onClick={() => setActiveTab('list')}
                  >
                    <i className="bi bi-list-ul me-1"></i>
                    List View
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'calendar' ? 'active' : ''}`}
                    onClick={() => setActiveTab('calendar')}
                  >
                    <i className="bi bi-calendar me-1"></i>
                    Calendar View
                  </button>
                </li>
              </ul>
              
              <div className="tab-content">
                {activeTab === 'list' && <HolidayList holidays={holidays} />}
                {activeTab === 'calendar' && <HolidayCalendar holidays={holidays} year={parseInt(selectedYear)} />}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && holidays.length === 0 && selectedCountry && selectedYear && (
          <div className="card">
            <div className="card-body text-center py-5">
              <i className="bi bi-calendar-x display-1 text-muted mb-3"></i>
              <h3>No holidays found</h3>
              <p className="text-muted">
                No public holidays were found for {countries.find(c => c.code === selectedCountry)?.name} in {selectedYear}.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
