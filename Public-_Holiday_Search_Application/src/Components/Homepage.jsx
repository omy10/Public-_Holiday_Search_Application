import React from 'react';
import { Calendar, Globe, List, CalendarDays, Download, Moon, Search, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export function HomePage({ onGetStarted, isLoggedIn, userName }) {
  const features = [
    {
      icon: Search,
      title: 'Search Holidays',
      description: 'Find public holidays for any country and year using real-time data from reliable APIs.'
    },
    {
      icon: List,
      title: 'List View',
      description: 'Browse holidays in a clean, organized list format with detailed information and badges.'
    },
    {
      icon: CalendarDays,
      title: 'Calendar View',
      description: 'Visualize holidays on an interactive calendar to plan your year effectively.'
    },
    {
      icon: Download,
      title: 'Export Data',
      description: 'Download holiday data as CSV files for spreadsheet analysis and planning.'
    },
    {
      icon: Moon,
      title: 'Dark Mode',
      description: 'Switch between light and dark themes for comfortable viewing at any time.'
    },
    {
      icon: Users,
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-lg">
              <Globe className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-semibold text-gray-900 dark:text-white">Holiday Planner</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Plan Your Year with{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Global Holidays
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover public holidays from around the world. Search by country and year, 
            view in multiple formats, and export for easy planning.
          </p>

          {isLoggedIn && userName && (
            <div className="mb-6">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Welcome back, {userName}! 👋
              </Badge>
            </div>
          )}
          
          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <Search className="w-5 h-5 mr-2" />
            {isLoggedIn ? 'Continue Planning' : 'Start Exploring'}
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Plan Ahead
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our comprehensive holiday planning tools help you stay organized and never miss important dates.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white">
          <CardContent className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">Ready to Start Planning?</h2>
            <p className="text-xl mb-8 opacity-90">
              Access holiday information for 15+ countries and start planning your perfect year.
            </p>
            <Button 
              size="lg" 
              onClick={onGetStarted}
              variant="secondary"
              className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
            >
              <Globe className="w-5 h-5 mr-2" />
              Get Started Now
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

export default HomePage