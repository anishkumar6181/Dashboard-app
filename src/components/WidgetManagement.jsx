import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Settings, Eye, EyeOff, Trash2 } from 'lucide-react';
import { 
  selectAllWidgets, 
  toggleWidgetVisibility, 
  removeWidget,
  bulkToggleWidgets 
} from '../store/dashboardSlice';

const WidgetManagement = ({ onClose }) => {
  const dispatch = useDispatch();
  const allWidgets = useSelector(selectAllWidgets);
  const [selectedWidgets, setSelectedWidgets] = useState(new Set());
  const [bulkAction, setBulkAction] = useState('');

  // Handle individual widget visibility toggle
  const handleToggleVisibility = (categoryId, widgetId) => {
    dispatch(toggleWidgetVisibility({ categoryId, widgetId }));
  };

  // Handle individual widget removal
  const handleRemoveWidget = (categoryId, widgetId) => {
    dispatch(removeWidget({ categoryId, widgetId }));
    setSelectedWidgets(prev => {
      const newSet = new Set(prev);
      newSet.delete(`${categoryId}-${widgetId}`);
      return newSet;
    });
  };

  // Handle widget selection for bulk operations
  const handleWidgetSelect = (categoryId, widgetId) => {
    const key = `${categoryId}-${widgetId}`;
    setSelectedWidgets(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedWidgets.size === allWidgets.length) {
      setSelectedWidgets(new Set());
    } else {
      const allKeys = allWidgets.map(widget => `${widget.categoryId}-${widget.id}`);
      setSelectedWidgets(new Set(allKeys));
    }
  };

  // Handle bulk actions
  const handleBulkAction = () => {
    if (selectedWidgets.size === 0) return;

    if (bulkAction === 'show') {
      const widgetUpdates = Array.from(selectedWidgets).map(key => {
        const [categoryId, widgetId] = key.split('-');
        return { categoryId, widgetId, isVisible: true };
      });
      dispatch(bulkToggleWidgets({ widgetUpdates }));
    } else if (bulkAction === 'hide') {
      const widgetUpdates = Array.from(selectedWidgets).map(key => {
        const [categoryId, widgetId] = key.split('-');
        return { categoryId, widgetId, isVisible: false };
      });
      dispatch(bulkToggleWidgets({ widgetUpdates }));
    } else if (bulkAction === 'remove') {
      Array.from(selectedWidgets).forEach(key => {
        const [categoryId, widgetId] = key.split('-');
        dispatch(removeWidget({ categoryId, widgetId }));
      });
    }

    setSelectedWidgets(new Set());
    setBulkAction('');
  };

  // Group widgets by category
  const widgetsByCategory = allWidgets.reduce((acc, widget) => {
    if (!acc[widget.categoryId]) {
      acc[widget.categoryId] = {
        categoryName: widget.categoryName,
        widgets: []
      };
    }
    acc[widget.categoryId].widgets.push(widget);
    return acc;
  }, {});

  const isAllSelected = selectedWidgets.size === allWidgets.length && allWidgets.length > 0;
  const isIndeterminate = selectedWidgets.size > 0 && selectedWidgets.size < allWidgets.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center">
            <Settings className="h-6 w-6 text-gray-600 mr-3" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Manage Widgets</h2>
              <p className="text-sm text-gray-600 mt-1">
                Show, hide, or remove widgets from your dashboard
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Bulk Actions Bar */}
        {selectedWidgets.size > 0 && (
          <div className="px-6 py-4 bg-blue-50 border-b border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-900">
                {selectedWidgets.size} widget{selectedWidgets.size !== 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <select
                  value={bulkAction}
                  onChange={(e) => setBulkAction(e.target.value)}
                  className="text-sm border border-blue-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose action...</option>
                  <option value="show">Show selected</option>
                  <option value="hide">Hide selected</option>
                  <option value="remove">Remove selected</option>
                </select>
                <button
                  onClick={handleBulkAction}
                  disabled={!bulkAction}
                  className={`px-4 py-1 text-sm rounded transition-colors duration-200 ${
                    bulkAction
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Select All */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={input => {
                  if (input) input.indeterminate = isIndeterminate;
                }}
                onChange={handleSelectAll}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
              />
              <span className="font-medium text-gray-900">
                Select All ({allWidgets.length} widgets)
              </span>
            </label>
          </div>

          {/* Widgets by Category */}
          {Object.entries(widgetsByCategory).map(([categoryId, { categoryName, widgets }]) => (
            <div key={categoryId} className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 px-2">
                {categoryName}
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({widgets.length} widget{widgets.length !== 1 ? 's' : ''})
                </span>
              </h3>
              
              <div className="space-y-2">
                {widgets.map((widget) => {
                  const widgetKey = `${widget.categoryId}-${widget.id}`;
                  const isSelected = selectedWidgets.has(widgetKey);
                  
                  return (
                    <div
                      key={widget.id}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                        isSelected ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center flex-1">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleWidgetSelect(widget.categoryId, widget.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-4"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            <h4 className="font-medium text-gray-900 truncate mr-3">
                              {widget.name}
                            </h4>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              widget.isVisible
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {widget.isVisible ? (
                                <>
                                  <Eye size={12} className="mr-1" />
                                  Visible
                                </>
                              ) : (
                                <>
                                  <EyeOff size={12} className="mr-1" />
                                  Hidden
                                </>
                              )}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate mt-1">
                            {widget.content}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleToggleVisibility(widget.categoryId, widget.id)}
                          className={`p-2 rounded-lg transition-colors duration-200 ${
                            widget.isVisible
                              ? 'text-green-600 hover:bg-green-100'
                              : 'text-gray-400 hover:bg-gray-200'
                          }`}
                          title={widget.isVisible ? 'Hide widget' : 'Show widget'}
                        >
                          {widget.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                        
                        <button
                          onClick={() => handleRemoveWidget(widget.categoryId, widget.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                          title="Remove widget"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {allWidgets.length === 0 && (
            <div className="text-center py-8">
              <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No widgets found</p>
              <p className="text-gray-500 text-sm">Add some widgets to get started</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default WidgetManagement;