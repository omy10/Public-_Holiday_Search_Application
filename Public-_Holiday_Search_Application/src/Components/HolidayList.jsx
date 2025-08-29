import React from 'react';

export function HolidayList({ holidays }) {
  if (!holidays || holidays.length === 0) {
    return <p className="text-muted">No holidays found for the selected criteria.</p>;
  }

  return (
    <div className="holiday-list">
      <h3>Public Holidays</h3>
      <div className="list-group">
        {holidays.map((holiday) => (
          <div key={holiday.date} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">{holiday.name}</h5>
                <p className="mb-1 text-muted">{new Date(holiday.date).toLocaleDateString()}</p>
              </div>
              <span className="badge bg-primary rounded-pill">
                {holiday.localName || holiday.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
