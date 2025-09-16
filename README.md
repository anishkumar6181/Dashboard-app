#   Dashboard App

A modern React dashboard application with dynamic widget management. The goal is to implement a production-ready dashboard where users can add, remove, and search widgets within categories using a JSON-driven structure.

## Features 

### Core Functionality

   Dynamic Widget Management: Add and remove widgets dynamically.
   Category-based Organization: Group widgets under categories (e.g., CSPM Executive Dashboard).
   Search Widgets: Search across all widgets in real time.
   Responsive Design: Layout adapts to desktop and mobile devices.

### Widget Operations

   Add new widgets with a name and content.
   Remove widgets using a cross icon.
   Manage widgets via a category checklist.
   Each widget displays random placeholder text for demo purposes.

### User Interface

   Clean and modern design (Tailwind CSS recommended).
   Interactive search with filtered results.
   Simple modal for adding widgets.
   Accessible components with proper ARIA labels.

### Tech Stack

   Frontend: React 18
   State Management: Redux Toolkit / Context API / NgRx
   Styling: Tailwind CSS (or CSS framework of choice)
   Icons: Lucide React (or equivalent)
   Build Tool: Vite
   Package Manager: npm

## Quick Start

### Prerequisites
Node.js, React
### Installation
  #### 1. Clone the repository:
        git clone <repo-url>
        cd dashboard-assignment
  #### 2. Install dependencies:
        npm install
  #### 3. Start the development server:
        npm run dev

  #### 4. Open in Browser:
         http://localhost:5173


## Dashboard Overview
The dashboard consists of the following sections:

   1. Header – Navigation and action buttons
   2. Search Bar – Search widgets across categories
   3. Categories – Display widgets grouped by category
   4. Stats/Footer – Show dashboard statistics
## Features Implemented
   JSON-driven category + widget structure
   Dynamic widget rendering
   Add/remove widget functionality
   Cross icon to delete widgets
   Search with filtered results
   Bulk widget management
   State management with store
   Responsive design



### Built using React, Redux Toolkit, Tailwind CSS, and modern web tooling 
