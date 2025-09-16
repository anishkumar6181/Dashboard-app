import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import WidgetCard from './WidgetCard';
import AddWidgetModal from './AddWidgetModal';

const CategoryCard = ({ category }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filter only visible widgets
  const visibleWidgets = category.widgets.filter(widget => widget.isVisible);

  return (
    <div className="mb-8">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{category.name}</h2>
        <div className="text-sm text-gray-500">
          {visibleWidgets.length} widget{visibleWidgets.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Existing widgets */}
        {visibleWidgets.map((widget) => (
          <WidgetCard 
            key={widget.id} 
            widget={widget} 
            categoryId={category.id} 
          />
        ))}
        
        {/* Add Widget Button */}
        <div
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center bg-white rounded-lg shadow-md border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer p-6 min-h-[160px]"
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-3">
              <Plus size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-1">Add Widget</h3>
            <p className="text-sm text-gray-500">Click to add a new widget</p>
          </div>
        </div>
      </div>

      {/* Add Widget Modal */}
      {isAddModalOpen && (
        <AddWidgetModal
          categoryId={category.id}
          categoryName={category.name}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CategoryCard;