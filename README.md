# Dashboard App

A modern, production-ready React dashboard application with dynamic widget management capabilities. Built with React 18, Redux Toolkit, and Tailwind CSS.

## 🚀 Features

### Core Functionality
- **Dynamic Widget Management**: Add, remove, and toggle widget visibility
- **Category-based Organization**: Widgets are organized into logical categories
- **Real-time Search**: Search across all widgets with instant results
- **Responsive Design**: Fully responsive layout that works on all devices

### Widget Operations
- ✅ Add widgets to any category with name and content
- ✅ Remove widgets individually with cross icon
- ✅ Bulk widget management with checklist interface
- ✅ Toggle widget visibility (show/hide)
- ✅ Search widgets by name or content

### User Interface
- 🎨 Modern, clean design with Tailwind CSS
- 🔍 Advanced search with filtered results view
- 📱 Mobile-responsive interface
- 🎭 Smooth animations and transitions
- ♿ Accessible components with proper ARIA labels

### State Management
- 🏪 Redux Toolkit for efficient state management
- 🔄 Real-time updates across all components
- 💾 Persistent widget states
- 🎯 Optimized selectors for performance

## 📦 Tech Stack

- **Frontend**: React 18, JavaScript (ES2020+)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## 🏁 Quick Start

### Prerequisites

Make sure you have the following installed:
- **Node.js** (version 16.0 or higher)
- **npm** (version 7.0 or higher)

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd dashboard-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and visit `http://localhost:5173`

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

### Linting

```bash
npm run lint
```

## 🎯 Usage Guide

### Dashboard Overview

The dashboard consists of several main sections:

1. **Header**: Contains the main navigation and action buttons
2. **Search Bar**: Allows searching across all widgets
3. **Categories**: Displays widgets organized by category
4. **Stats Footer**: Shows dashboard statistics

### Adding Widgets

1. **Method 1**: Click the "+ Add Widget" button in any category
2. **Method 2**: Use the "Manage" button in the header
3. Fill in the widget name (3-50 characters)
4. Add widget content (5-500 characters)
5. Click "Add Widget" to save

### Managing Widgets

#### Individual Actions
- **Remove**: Click the ❌ icon on any widget
- **Add**: Click the ➕ button in any category section

#### Bulk Management
1. Click "Manage" in the header
2. Select multiple widgets using checkboxes
3. Choose an action: Show, Hide, or Remove
4. Click "Apply" to execute the action

### Search Functionality

1. **Open Search**: Click "Search" in the header
2. **Type Query**: Enter search terms in the search bar
3. **View Results**: Search results appear in real-time with debounced input
4. **Filter by Category**: Results show which category each widget belongs to

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Dashboard.jsx    # Main dashboard component
│   ├── Header.jsx       # Navigation header
│   ├── SearchBar.jsx    # Search functionality
│   ├── CategoryCard.jsx # Category display component
│   ├── WidgetCard.jsx   # Individual widget component
│   ├── AddWidgetModal.jsx # Add widget modal
│   └── WidgetManagement.jsx # Widget management interface
├── store/               # Redux store configuration
│   ├── index.js        # Store setup
│   └── dashboardSlice.js # Dashboard state slice
├── data/               # Static data
│   └── dashboardData.json # Initial dashboard data
├── App.jsx             # Root component
├── main.jsx           # Application entry point
└── index.css          # Global styles
```

## 🎨 Component Architecture

### Main Components

1. **Dashboard.jsx**: Root dashboard component with search and category management
2. **Header.jsx**: Top navigation with action buttons and statistics
3. **CategoryCard.jsx**: Displays a category and its visible widgets
4. **WidgetCard.jsx**: Individual widget display with remove functionality
5. **AddWidgetModal.jsx**: Modal for adding new widgets with validation
6. **WidgetManagement.jsx**: Comprehensive widget management interface
7. **SearchBar.jsx**: Search input with debounced filtering

### State Management Flow

```
User Action → Component → Redux Action → Reducer → State Update → Component Re-render
```

## 📊 Data Structure

### Categories

```javascript
{
  "id": "cspm_executive_dashboard",
  "name": "CSPM Executive Dashboard",
  "keyName": "CSPM",
  "widgets": [...widgets]
}
```

### Widgets

```javascript
{
  "id": "cloud_accounts",
  "name": "Cloud Accounts",
  "content": "Connected: 2, Not Connected: 2",
  "isVisible": true
}
```

## 🚀 Performance Optimizations

- **Debounced Search**: 300ms delay to prevent excessive API calls
- **Memoized Selectors**: Redux selectors use reselect for performance
- **Component Optimization**: React.memo where appropriate
- **Lazy State Updates**: Batch Redux actions where possible
- **Efficient Re-renders**: Minimal component re-renders on state changes

## 🔧 Configuration Files

### Key Configuration Files

- `package.json`: Dependencies and scripts
- `vite.config.js`: Vite build configuration
- `tailwind.config.cjs`: Tailwind CSS configuration
- `eslint.config.js`: ESLint configuration
- `postcss.config.cjs`: PostCSS configuration

## 🐛 Troubleshooting

### Common Issues

1. **Port 5173 already in use**:
   ```bash
   npm run dev -- --port 3000
   ```

2. **Dependencies installation issues**:
   ```bash
   rm -rf node_modules package-lock.json
   npm cache clean --force
   npm install
   ```

3. **Build errors**:
   ```bash
   npm run lint
   npm run build
   ```

### Browser Compatibility

- Chrome 90+
- Firefox 90+
- Safari 15+
- Edge 90+

## 🎯 Features Implemented

### ✅ Requirements Met

1. **JSON Structure**: Dynamic categories with multiple widgets ✅
2. **Widget Display**: Dynamic rendering from JSON data ✅
3. **Add Widget**: Modal with name and text input ✅
4. **Remove Widget**: Cross icon on widgets ✅
5. **Widget Management**: Checklist interface for bulk operations ✅
6. **Search Feature**: Filter widgets across all categories ✅
7. **State Management**: Redux Toolkit implementation ✅
8. **Responsive Design**: Mobile-first approach ✅

### 🚀 Additional Features

- **Widget Visibility Toggle**: Show/hide widgets without removing
- **Bulk Operations**: Select multiple widgets for batch actions
- **Search Results View**: Dedicated view for filtered results
- **Loading States**: Proper loading and error handling
- **Form Validation**: Comprehensive input validation
- **Accessibility**: ARIA labels and keyboard navigation
- **Statistics**: Real-time widget and category counts
- **Mobile Responsive**: Optimized for all screen sizes

## 📈 Production Readiness

### Code Quality
- ✅ ESLint configuration with best practices
- ✅ Consistent code formatting
- ✅ Component separation and modularity
- ✅ Error handling and validation
- ✅ Performance optimizations

### User Experience
- ✅ Responsive design for all devices
- ✅ Smooth animations and transitions
- ✅ Accessible components
- ✅ Intuitive user interface
- ✅ Loading and error states

### Scalability
- ✅ Modular component architecture
- ✅ Centralized state management
- ✅ Extensible data structure
- ✅ Performance-optimized rendering

---

**Built with ❤️ using React, Redux Toolkit, and modern web technologies**

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
#   D a s h b o a r d - a p p  
 