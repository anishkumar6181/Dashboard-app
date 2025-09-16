import React from 'react';
import { useDispatch } from 'react-redux';
import { X } from 'lucide-react';
import { removeWidget } from '../store/dashboardSlice';

const WidgetCard = ({ widget, categoryId }) => {
  const dispatch = useDispatch();

  const handleRemoveWidget = () => {
    dispatch(removeWidget({ categoryId, widgetId: widget.id }));
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      {/* Remove button */}
      <button
        onClick={handleRemoveWidget}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-100 text-gray-500 hover:text-red-600 transition-colors duration-200"
        title="Remove widget"
        aria-label={`Remove ${widget.name} widget`}
      >
        <X size={16} />
      </button>

      {/* Widget content */}
      <div className="pr-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 break-words">
          {widget.name}
        </h3>
        <div className="text-sm text-gray-600 leading-relaxed">
          <p className="break-words">{widget.content}</p>
        </div>
      </div>

      {/* Widget status indicator */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          <span className="text-xs text-gray-500">Active</span>
        </div>
        <div className="text-xs text-gray-400">
          Widget ID: {widget.id.slice(0, 8)}...
        </div>
      </div>
    </div>
  );
};

export default WidgetCard;