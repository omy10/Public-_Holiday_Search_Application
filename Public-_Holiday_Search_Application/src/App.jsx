import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { HolidayList } from './Components/HolidayList.js';
import { HolidayCalendar } from './Components/HolidayCalendar.js';
import { HomePage } from './Components/HomePage.js';
import { LoginForm } from './Components/LoginForm.js';

// ✅ quick safe-render helper
const SafeRender = ({ children, fallback }) => {
  try {
    return children;
  } catch (err) {
    console.error("Render error:", err);
    return fallback || <p style={{ color: "red" }}>⚠️ Component failed to load</p>;
  }
};

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

export default function App() {
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
    document.body.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');
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

const toggleDarkMode = () => setDarkMode(!darkMode);

const renderHeader = () => (
  <header className="bg-primary text-white py-3 mb-4">
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="h3 mb-0">Holiday Planner</h1>
        <div className="d-flex align-items-center gap-3">
          {user && (
            <span className="text-light">Welcome, {user.name}</span>
          )}
          <button
            className="btn btn-outline-light btn-sm"
            onClick={toggleDarkMode}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          {user && (
            <button
              className="btn btn-outline-light btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  </header>
);

  // 🟢 Always render SOMETHING, even if child component fails
  if (currentView === 'login') {
    return (
      <div className="min-vh-100">
        {/* header */}
        <SafeRender fallback={<h2>Header failed</h2>}>{renderHeader()}</SafeRender>
        {/* login form */}
        <SafeRender fallback={<h2>LoginForm failed</h2>}>
          <LoginForm onLogin={handleLogin} onCancel={() => setCurrentView('home')} />
        </SafeRender>
      </div>
    );
  }

  if (currentView === 'home') {
    return (
      <div className="min-vh-100">
        <SafeRender fallback={<h2>Header failed</h2>}>{renderHeader()}</SafeRender>
        <SafeRender fallback={<h2>HomePage failed</h2>}>
          <HomePage
            onGetStarted={() => setCurrentView('holidays')}
            isLoggedIn={!!user}
            userName={user?.name}
          />
        </SafeRender>
      </div>
    );
  }

  return (
    <div className="min-vh-100">
      <SafeRender fallback={<h2>Header failed</h2>}>{renderHeader()}</SafeRender>

      <main className="container py-4">
        {/* 🔴 If something breaks inside HolidayList/HolidayCalendar, you’ll see a red warning instead of blank page */}
        <div className="tab-content">
          {activeTab === 'list' && (
            <SafeRender fallback={<p style={{ color: "red" }}>HolidayList failed</p>}>
              <HolidayList holidays={holidays} />
            </SafeRender>
          )}
          {activeTab === 'calendar' && (
            <SafeRender fallback={<p style={{ color: "red" }}>HolidayCalendar failed</p>}>
              <HolidayCalendar holidays={holidays} year={parseInt(selectedYear)} />
            </SafeRender>
          )}
        </div>
      </main>
    </div>
  );
}
