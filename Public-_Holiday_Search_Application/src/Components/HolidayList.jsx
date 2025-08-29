const { useState, useEffect } = React;

function HolidayList({ holidays }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'public':
        return 'bg-primary';
      case 'bank':
        return 'bg-success';
      case 'school':
        return 'bg-warning';
      case 'authorities':
        return 'bg-info';
      case 'optional':
        return 'bg-secondary';
      default:
        return 'bg-secondary';
    }
  };

  const sortedHolidays = [...holidays].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="row g-3">
      {sortedHolidays.map((holiday, index) => (
        <div key={index} className="col-12">
          <div className="card shadow-sm hover-shadow">
            <div className="card-body">
              <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-start gap-3">
                    <i className="bi bi-calendar-event text-primary mt-1 fs-5"></i>
                    <div>
                      <h6 className="card-title mb-1">{holiday.localName}</h6>
                      {holiday.localName !== holiday.name && (
                        <p className="text-muted small mb-2">{holiday.name}</p>
                      )}
                      <div className="d-flex align-items-center gap-2 text-muted small">
                        <span>{formatDate(holiday.date)}</span>
                        {holiday.global && (
                          <div className="d-flex align-items-center gap-1">
                            <i className="bi bi-globe"></i>
                            <span>Global</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="d-flex flex-wrap gap-2 align-items-center">
                  {holiday.types.map((type, typeIndex) => (
                    <span
                      key={typeIndex}
                      className={`badge ${getTypeColor(type)} text-white`}
                    >
                      {type}
                    </span>
                  ))}
                  {!holiday.fixed && (
                    <span className="badge border border-secondary text-secondary bg-transparent">
                      Variable Date
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}