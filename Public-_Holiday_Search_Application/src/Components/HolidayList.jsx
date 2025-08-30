import React from "react";

const HolidayList = ({ holidays }) => {
  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case "public":
        return "bg-primary";
      case "bank":
        return "bg-success";
      case "observance":
        return "bg-warning";
      case "school":
        return "bg-info";
      case "religious":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Holiday List</h2>
      <ul className="list-group">
        {holidays.map((holiday, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h5>{holiday.name}</h5>
              <p className="mb-1">{holiday.date}</p>
              <div>
                {Array.isArray(holiday.types) &&
                  holiday.types.map((type, typeIndex) => (
                    <span
                      key={typeIndex}
                      className={`badge ${getTypeColor(type)} text-white me-1`}
                    >
                      {type}
                    </span>
                  ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HolidayList;
