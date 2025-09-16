import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Search, ArrowLeft, Filter } from 'lucide-react';
import {
  selectCategories,
  selectSearchQuery,
  selectFilteredWidgets,
  selectIsLoading,
  selectError
} from '../store/dashboardSlice';
import Header from './Header';
import SearchBar from './SearchBar';
import CategoryCard from './CategoryCard';
import WidgetCard from './WidgetCard';

const Dashboard = () => {
  const [showSearchView, setShowSearchView] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  
  const categories = useSelector(selectCategories);
  const searchQuery = useSelector(selectSearchQuery);
  const filteredWidgets = useSelector(selectFilteredWidgets);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  // Auto-show search view when there are filtered results
  React.useEffect(() => {
    if (filteredWidgets.length > 0 && searchQuery) {
      setShowSearchView(true);
    } else if (!searchQuery) {
      setShowSearchView(false);
    }
  }, [filteredWidgets, searchQuery]);

  const handleToggleSearch = (show) => {
    if (typeof show === 'boolean') {
      setShowSearchBar(show);
      if (show) setShowSearchView(false);
    } else {
      setShowSearchBar(!showSearchBar);
    }
  };

  const handleBackToDashboard = () => {
    setShowSearchView(false);
    setShowSearchBar(true);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header onToggleSearch={handleToggleSearch} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-800 text-lg font-semibold mb-2">
              Oops! Something went wrong
            </div>
            <div className="text-red-600 mb-4">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header onToggleSearch={handleToggleSearch} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <div className="text-gray-600">Loading dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onToggleSearch={handleToggleSearch} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        {(showSearchBar || searchQuery) && (
          <SearchBar onToggleSearch={setShowSearchView} />
        )}

        {/* Search Results View */}
        {showSearchView && searchQuery && (
          <div className="mb-8">
            {/* Search Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <button
                  onClick={handleBackToDashboard}
                  className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 mr-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Dashboard
                </button>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Search Results
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {filteredWidgets.length} widget{filteredWidgets.length !== 1 ? 's' : ''} found for "{searchQuery}"
                  </p>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Filter className="h-4 w-4 mr-1" />
                Filtered Results
              </div>
            </div>

            {/* Search Results Grid */}
            {filteredWidgets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWidgets.map((widget) => (
                  <div key={`${widget.categoryId}-${widget.id}`} className="relative">
                    {/* Category Badge */}
                    <div className="absolute -top-2 -left-2 z-10">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                        {widget.categoryName}
                      </span>
                    </div>
                    <WidgetCard 
                      widget={widget} 
                      categoryId={widget.categoryId} 
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No widgets found</h3>
                <p className="text-gray-600 mb-4">
                  No widgets match your search for "{searchQuery}"
                </p>
                <button
                  onClick={handleBackToDashboard}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </button>
              </div>
            )}
          </div>
        )}

        {/* Main Dashboard View */}
        {!showSearchView && (
          <div className="space-y-8">
            {/* Dashboard Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Dashboard Overview
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Manage your widgets across different categories
                </p>
              </div>
              {!showSearchBar && (
                <button
                  onClick={() => handleToggleSearch(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search Widgets
                </button>
              )}
            </div>

            {/* Categories */}
            {categories.length > 0 ? (
              <div className="space-y-8">
                {categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
                <p className="text-gray-600">
                  It looks like there are no dashboard categories to display.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Quick Stats Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm font-medium text-gray-600 mb-1">Total Categories</div>
              <div className="text-2xl font-bold text-gray-900">{categories.length}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm font-medium text-gray-600 mb-1">Total Widgets</div>
              <div className="text-2xl font-bold text-gray-900">
                {categories.reduce((total, category) => total + category.widgets.length, 0)}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm font-medium text-gray-600 mb-1">Visible Widgets</div>
              <div className="text-2xl font-bold text-blue-600">
                {categories.reduce((total, category) => 
                  total + category.widgets.filter(widget => widget.isVisible).length, 0
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;