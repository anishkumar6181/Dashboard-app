import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { X } from 'lucide-react';
import { addWidget } from '../store/dashboardSlice';

const AddWidgetModal = ({ categoryId, categoryName, onClose }) => {
  const [widgetName, setWidgetName] = useState('');
  const [widgetContent, setWidgetContent] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const dispatch = useDispatch();

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!widgetName.trim()) {
      newErrors.widgetName = 'Widget name is required';
    } else if (widgetName.trim().length < 3) {
      newErrors.widgetName = 'Widget name must be at least 3 characters long';
    } else if (widgetName.trim().length > 50) {
      newErrors.widgetName = 'Widget name must be less than 50 characters';
    }

    if (!widgetContent.trim()) {
      newErrors.widgetContent = 'Widget content is required';
    } else if (widgetContent.trim().length < 5) {
      newErrors.widgetContent = 'Widget content must be at least 5 characters long';
    } else if (widgetContent.trim().length > 500) {
      newErrors.widgetContent = 'Widget content must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch(addWidget({
        categoryId,
        widgetName: widgetName.trim(),
        widgetContent: widgetContent.trim(),
      }));
      
      onClose();
    } catch (error) {
      console.error('Error adding widget:', error);
      setErrors({ submit: 'Failed to add widget. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const isFormValid = widgetName.trim() && widgetContent.trim() && Object.keys(errors).length === 0;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Add Widget</h2>
            <p className="text-sm text-gray-600 mt-1">to {categoryName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            disabled={isSubmitting}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Widget Name Input */}
          <div className="mb-6">
            <label htmlFor="widgetName" className="block text-sm font-medium text-gray-700 mb-2">
              Widget Name *
            </label>
            <input
              type="text"
              id="widgetName"
              value={widgetName}
              onChange={(e) => {
                setWidgetName(e.target.value);
                if (errors.widgetName) {
                  setErrors(prev => ({ ...prev, widgetName: null }));
                }
              }}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                errors.widgetName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter widget name (e.g., Sales Overview)"
              maxLength={50}
              disabled={isSubmitting}
            />
            {errors.widgetName && (
              <p className="text-red-500 text-sm mt-1">{errors.widgetName}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">{widgetName.length}/50 characters</p>
          </div>

          {/* Widget Content Input */}
          <div className="mb-6">
            <label htmlFor="widgetContent" className="block text-sm font-medium text-gray-700 mb-2">
              Widget Content *
            </label>
            <textarea
              id="widgetContent"
              value={widgetContent}
              onChange={(e) => {
                setWidgetContent(e.target.value);
                if (errors.widgetContent) {
                  setErrors(prev => ({ ...prev, widgetContent: null }));
                }
              }}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 resize-none ${
                errors.widgetContent ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter widget content (e.g., Total Sales: $45,230, Growth: +12% vs last month)"
              maxLength={500}
              disabled={isSubmitting}
            />
            {errors.widgetContent && (
              <p className="text-red-500 text-sm mt-1">{errors.widgetContent}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">{widgetContent.length}/500 characters</p>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          )}

          {/* Modal Footer */}
          <div className="flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                isFormValid && !isSubmitting
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'Adding...' : 'Add Widget'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWidgetModal;