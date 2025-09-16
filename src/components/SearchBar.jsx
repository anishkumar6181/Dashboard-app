import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, X } from 'lucide-react';
import { setSearchQuery, selectSearchQuery, selectFilteredWidgets } from '../store/dashboardSlice';

const SearchBar = ({ onToggleSearch }) => {
  const [localQuery, setLocalQuery] = useState('');
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);
  const filteredWidgets = useSelector(selectFilteredWidgets);

  // Debounce search to avoid too many updates
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchQuery(localQuery));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localQuery, dispatch]);

  // Sync with Redux state
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleClearSearch = () => {
    setLocalQuery('');
    dispatch(setSearchQuery(''));
  };

  const handleInputChange = (e) => {
    setLocalQuery(e.target.value);
  };

  return (
    <div className="mb-6">
      {/* Search Input */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={localQuery}
          onChange={handleInputChange}
          className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
          placeholder="Search widgets..."
        />
        {localQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Search Results Summary */}
      {searchQuery && (
        <div className="mt-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {filteredWidgets.length === 0 ? (
                'No widgets found'
              ) : (
                `Found ${filteredWidgets.length} widget${filteredWidgets.length !== 1 ? 's' : ''} matching "${searchQuery}"`
              )}
            </p>
            {filteredWidgets.length > 0 && onToggleSearch && (
              <button
                onClick={() => onToggleSearch(true)}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                View search results
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;