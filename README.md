# Public-_Holiday_Search_Application

## Features

- 🔍 **Holiday Search**: Find public holidays for any country and year using the Nager.Date Public Holiday API
- 📋 **List View**: Browse holidays in a clean, organized list format with detailed information
- 📅 **Calendar View**: Visualize holidays on an interactive monthly calendar
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📁 **CSV Export**: Download holiday data for spreadsheet analysis
- 👤 **User Authentication**: Mock login system with local storage
- 💾 **Local Storage**: Saves user preferences and authentication state
- 📱 **Responsive Design**: Built with Bootstrap for mobile-first responsive design

## Technologies Used

- **React 18** - Frontend framework
- **Bootstrap 5.3** - CSS framework for styling and components
- **Bootstrap Icons** - Icon library
- **JavaScript (ES6+)** - Programming language
- **Nager.Date API** - Public holiday data source

## Supported Countries

- United States, United Kingdom, Canada, Australia
- Germany, France, Italy, Spain
- Japan, India, Brazil, Mexico
- Netherlands, Sweden, Norway

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

## Project Structure

```
/
├── App.js                     # Main application component
├── index.html                 # HTML entry point
├── package.json              # Project dependencies
├── components/
│   ├── HolidayList.js        # List view component
│   ├── HolidayCalendar.js    # Calendar view component
│   ├── HomePage.js           # Landing page component
│   └── LoginForm.js          # Authentication form
└── styles/
    └── globals.css           # Global styles and Bootstrap customizations
```
## Features Overview

### Home Page
- Hero section with gradient background
- Feature highlights with icon cards
- Statistics display
- Call-to-action sections

### Holiday Search
- Country and year selection dropdowns
- Search functionality with loading states
- Error handling and validation

### Display Views
- **List View**: Card-based layout with holiday details, badges, and type indicators
- **Calendar View**: Monthly grid with holiday indicators and navigation

### User Experience
- Dark/light mode toggle
- Responsive design for mobile and desktop
- Loading states and error messages
- Local storage for preferences

### Export Functionality
- CSV export with comprehensive holiday data
- Filename includes country and year for organization

## API Integration

The application uses the [Nager.Date Public Holiday API](https://date.nager.at/) to fetch holiday data:

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Acknowledgments

- [Nager.Date](https://date.nager.at/) for providing the public holiday API
- [Bootstrap](https://getbootstrap.com/) for the CSS framework
- [Bootstrap Icons](https://icons.getbootstrap.com/) for the icon library