import React, { useState } from 'react';

function HolidayCalendar({ holidays, year }) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const getHolidaysForDate = (date) => {
    return holidays.filter(holiday => holiday.date === date);
  };

  const formatDateString = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev' && currentMonth > 0) {
      setCurrentMonth(currentMonth - 1);
    } else if (direction === 'next' && currentMonth < 11) {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderCalendarMonth = (month) => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="calendar-day border border-secondary-subtle bg-light"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDateString(year, month, day);
      const dayHolidays = getHolidaysForDate(dateString);
      const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

      days.push(
        <div
          key={day}
          className={`calendar-day border border-secondary-subtle p-1 position-relative ${
            isToday ? 'bg-primary bg-opacity-10 border-primary' : 'bg-white'
          }`}
          style={{ overflow: 'hidden' }}
        >
          <div className={`small mb-1 ${isToday ? 'fw-bold text-primary' : 'text-dark'}`}>
            {day}
          </div>
          {dayHolidays.length > 0 && (
            <div className="d-flex flex-column gap-1">
              {dayHolidays.slice(0, 2).map((holiday, index) => (
                <div
                  key={index}
                  className={`badge ${
                    holiday.global ? 'bg-primary' : 'bg-success'
                  } text-truncate`}
                  style={{ fontSize: '0.65rem', maxWidth: '100%' }}
                  title={holiday.localName}
                >
                  {holiday.localName.length > 12 ? holiday.localName.substring(0, 12) + '...' : holiday.localName}
                </div>
              ))}
              {dayHolidays.length > 2 && (
                <div className="text-muted" style={{ fontSize: '0.6rem' }}>
                  +{dayHolidays.length - 2} more
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="d-grid border rounded overflow-hidden calendar-container" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {/* Day headers */}
        {dayNames.map((dayName) => (
          <div
            key={dayName}
            className="p-2 bg-secondary text-white text-center small fw-medium"
          >
            {dayName}
          </div>
        ))}
        {/* Calendar days */}
        {days}
      </div>
    );
  };

  const monthHolidays = holidays.filter(holiday => {
    const holidayDate = new Date(holiday.date);
    return holidayDate.getMonth() === currentMonth;
  });

  return (
    <div className="d-flex flex-column gap-4">
      {/* Month navigation */}
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="mb-0">
          {monthNames[currentMonth]} {year}
        </h4>
        <div className="btn-group">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigateMonth('prev')}
            disabled={currentMonth === 0}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigateMonth('next')}
            disabled={currentMonth === 11}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      {renderCalendarMonth(currentMonth)}

      {/* Month summary */}
      {monthHolidays.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h6 className="card-title mb-0">
              {monthHolidays.length} Holiday{monthHolidays.length !== 1 ? 's' : ''} in {monthNames[currentMonth]}
            </h6>
          </div>
          <div className="card-body">
            <div className="d-flex flex-column gap-2">
              {monthHolidays
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((holiday, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center p-2 bg-light rounded">
                    <div>
                      <span className="fw-medium">{holiday.localName}</span>
                      <span className="text-muted ms-2 small">
                        {new Date(holiday.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="d-flex gap-1">
                      {holiday.global && (
                        <span className="badge bg-secondary">Global</span>
                      )}
                      <span className="badge border border-secondary text-secondary bg-transparent">
                        {holiday.types[0]}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default HolidayCalendar;
