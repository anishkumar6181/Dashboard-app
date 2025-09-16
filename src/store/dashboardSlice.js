import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import dashboardData from '../data/dashboardData.json';

const initialState = {
  categories: dashboardData,
  searchQuery: '',
  filteredWidgets: [],
  isLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widgetName, widgetContent } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        const newWidget = {
          id: uuidv4(),
          name: widgetName,
          content: widgetContent,
          isVisible: true,
        };
        category.widgets.push(newWidget);
      }
    },
    
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
      }
    },
    
    toggleWidgetVisibility: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        const widget = category.widgets.find(widget => widget.id === widgetId);
        if (widget) {
          widget.isVisible = !widget.isVisible;
        }
      }
    },
    
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      if (action.payload.trim() === '') {
        state.filteredWidgets = [];
      } else {
        // Filter widgets across all categories
        const filtered = [];
        state.categories.forEach(category => {
          category.widgets.forEach(widget => {
            if (widget.name.toLowerCase().includes(action.payload.toLowerCase()) ||
                widget.content.toLowerCase().includes(action.payload.toLowerCase())) {
              filtered.push({
                ...widget,
                categoryId: category.id,
                categoryName: category.name
              });
            }
          });
        });
        state.filteredWidgets = filtered;
      }
    },
    
    bulkToggleWidgets: (state, action) => {
      const { widgetUpdates } = action.payload;
      widgetUpdates.forEach(({ categoryId, widgetId, isVisible }) => {
        const category = state.categories.find(cat => cat.id === categoryId);
        if (category) {
          const widget = category.widgets.find(widget => widget.id === widgetId);
          if (widget) {
            widget.isVisible = isVisible;
          }
        }
      });
    },
    
    resetDashboard: (state) => {
      state.categories = dashboardData;
      state.searchQuery = '';
      state.filteredWidgets = [];
    },
    
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Selectors
export const selectCategories = (state) => state.dashboard.categories;
export const selectSearchQuery = (state) => state.dashboard.searchQuery;
export const selectFilteredWidgets = (state) => state.dashboard.filteredWidgets;
export const selectIsLoading = (state) => state.dashboard.isLoading;
export const selectError = (state) => state.dashboard.error;

// Get all widgets across categories (for widget management)
export const selectAllWidgets = (state) => {
  const allWidgets = [];
  state.dashboard.categories.forEach(category => {
    category.widgets.forEach(widget => {
      allWidgets.push({
        ...widget,
        categoryId: category.id,
        categoryName: category.name
      });
    });
  });
  return allWidgets;
};

// Get visible widgets count by category
export const selectVisibleWidgetsCounts = (state) => {
  const counts = {};
  state.dashboard.categories.forEach(category => {
    counts[category.id] = category.widgets.filter(widget => widget.isVisible).length;
  });
  return counts;
};

export const {
  addWidget,
  removeWidget,
  toggleWidgetVisibility,
  setSearchQuery,
  bulkToggleWidgets,
  resetDashboard,
  setLoading,
  setError,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;