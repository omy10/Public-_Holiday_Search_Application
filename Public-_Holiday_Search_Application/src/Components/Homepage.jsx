import React from 'react';

export function HomePage({ onGetStarted, isLoggedIn, userName }) {
  const features = [
    {
      icon: 'bi-search',
      title: 'Search Holidays',
      description: 'Find public holidays for any country and year using real-time data from reliable APIs.'
    },
    {
      icon: 'bi-list-ul',
      title: 'List View',
      description: 'Browse holidays in a clean, organized list format with detailed information and badges.'
    },
    {
      icon: 'bi-calendar-event',
      title: 'Calendar View',
      description: 'Visualize holidays on an interactive calendar to plan your year effectively.'
    },
    {
      icon: 'bi-download',
      title: 'Export Data',
      description: 'Download holiday data as CSV files for spreadsheet analysis and planning.'
    },
    {
      icon: 'bi-moon',
      title: 'Dark Mode',
      description: 'Switch between light and dark themes for comfortable viewing at any time.'
    },
    {
      icon: 'bi-people',
      title: 'Multiple Countries',
      description: 'Access holiday information for 15+ countries including US, UK, Canada, and more.'
    }
  ];

  const stats = [
    { number: '15+', label: 'Countries Supported' },
    { number: '100+', label: 'Holidays per Year' },
    { number: '2 Views', label: 'Display Options' },
    { number: '1-Click', label: 'CSV Export' }
  ];

  return (
    <div className="min-vh-100 bg-gradient-to-br" style={{
      background: 'linear-gradient(135deg, #e3f2fd 0%, #e8eaf6 50%, #f3e5f5 100%)'
    }}>
      {/* Hero Section */}
      <section className="container py-5">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
            <div className="d-flex justify-content-center mb-4">
              <div className="d-flex align-items-center bg-white rounded-pill px-4 py-3 shadow">
                <i className="bi bi-globe text-primary fs-2 me-3"></i>
                <span className="fs-3 fw-semibold">Holiday Planner</span>
              </div>
            </div>
            
            <h1 className="display-4 fw-bold mb-4">
              Plan Your Year with{' '}
              <span className="text-primary">Global Holidays</span>
            </h1>
            
            <p className="lead text-muted mb-4">
              Discover public holidays from around the world. Search by country and year, 
              view in multiple formats, and export for easy planning.
            </p>

            {isLoggedIn && userName && (
              <div className="mb-4">
                <span className="badge bg-light text-dark fs-6 px-3 py-2">
                  Welcome back, {userName}! 👋
                </span>
              </div>
            )}
            
            <button 
              className="btn btn-primary btn-lg px-4 py-3 shadow"
              onClick={onGetStarted}
            >
              <i className="bi bi-search me-2"></i>
              {isLoggedIn ? 'Continue Planning' : 'Start Exploring'}
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container py-5">
        <div className="row g-4 justify-content-center">
          {stats.map((stat, index) => (
            <div key={index} className="col-6 col-md-3">
              <div className="card text-center bg-white bg-opacity-75 border-0 shadow h-100">
                <div className="card-body">
                  <div className="display-6 fw-bold text-primary mb-2">{stat.number}</div>
                  <div className="small text-muted">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold mb-3">
                Everything You Need to Plan Ahead
              </h2>
              <p className="lead text-muted">
                Our comprehensive holiday planning tools help you stay organized and never miss important dates.
              </p>
            </div>
            
            <div className="row g-4">
              {features.map((feature, index) => (
                <div key={index} className="col-md-6 col-lg-4">
                  <div className="card bg-white bg-opacity-75 border-0 shadow h-100 hover-shadow">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-primary text-white rounded p-3 me-3">
                          <i className={`${feature.icon} fs-4`}></i>
                        </div>
                        <h5 className="card-title mb-0">{feature.title}</h5>
                      </div>
                      <p className="card-text text-muted">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card bg-primary text-white border-0 shadow-lg">
              <div className="card-body text-center py-5">
                <i className="bi bi-calendar-event display-1 mb-4 opacity-75"></i>
                <h2 className="display-6 fw-bold mb-3">Ready to Start Planning?</h2>
                <p className="lead mb-4 opacity-90">
                  Access holiday information for 15+ countries and start planning your perfect year.
                </p>
                <button 
                  className="btn btn-light btn-lg px-4 py-3 text-primary fw-semibold shadow"
                  onClick={onGetStarted}
                >
                  <i className="bi bi-globe me-2"></i>
                  Get Started Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}