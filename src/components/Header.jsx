import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Plus, Settings, RefreshCw, Clock } from 'lucide-react';
import { selectCategories } from '../store/dashboardSlice';
import WidgetManagement from './WidgetManagement';

const Header = ({ onToggleSearch }) => {
  const [isWidgetManagementOpen, setIsWidgetManagementOpen] = useState(false);
  const categories = useSelector(selectCategories);

  // Calculate total widgets and visible widgets
  const totalWidgets = categories.reduce((total, category) => total + category.widgets.length, 0);
  const visibleWidgets = categories.reduce((total, category) => 
    total + category.widgets.filter(widget => widget.isVisible).length, 0
  );

  const handleRefresh = () => {
    // In a real app, this would refresh data from an API
    window.location.reload();
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Title and stats */}
            <div className="flex items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  CNAPP Dashboard
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {visibleWidgets} of {totalWidgets} widgets visible across {categories.length} categories
                </p>
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center space-x-3">
              {/* Search Toggle */}
              <button
                onClick={onToggleSearch}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Search
              </button>

              {/* Manage Widgets */}
              <button
                onClick={() => setIsWidgetManagementOpen(true)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <Settings className="h-4 w-4 mr-2" />
                Manage
              </button>

              {/* Refresh */}
              <button
                onClick={handleRefresh}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                title="Refresh dashboard"
              >
                <RefreshCw className="h-4 w-4" />
              </button>

              {/* Time Period Selector */}
              <div className="inline-flex items-center border border-blue-300 rounded-md shadow-sm bg-white">
                <div className="flex items-center px-3 py-2 text-blue-700">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Last 2 Days</span>
                </div>
                <div className="border-l border-blue-300">
                  <select 
                    className="appearance-none bg-transparent border-none px-3 py-2 text-sm text-blue-700 focus:outline-none focus:ring-0 cursor-pointer"
                    defaultValue="last_2_days"
                  >
                    <option value="last_2_days">Last 2 Days</option>
                    <option value="last_week">Last Week</option>
                    <option value="last_month">Last Month</option>
                    <option value="last_quarter">Last Quarter</option>
                    <option value="last_year">Last Year</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu - responsive design */}
        <div className="sm:hidden px-4 pb-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={onToggleSearch}
              className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Search
            </button>
            <button
              onClick={() => setIsWidgetManagementOpen(true)}
              className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Settings className="h-4 w-4 mr-2" />
              Manage
            </button>
            <button
              onClick={handleRefresh}
              className="inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              title="Refresh dashboard"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Widget Management Modal */}
      {isWidgetManagementOpen && (
        <WidgetManagement onClose={() => setIsWidgetManagementOpen(false)} />
      )}
    </>
  );
};

export default Header;