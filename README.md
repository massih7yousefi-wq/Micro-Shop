# Micro Shop

Micro Shop is a modern e-commerce web application built with React and TypeScript.

The project includes a customer-facing storefront and an admin dashboard for managing products and categories.

##  Features

### Storefront

* Modern responsive storefront
* Home page with hero section
* Product browsing
* Category browsing
* Shopping cart
* Product details
* Responsive header and footer
* Clean and reusable UI components

### Admin Dashboard

* Admin layout with sidebar, header and footer
* Product management
* Create, edit and delete products
* Product image management
* Product search
* Product sorting
* Product pagination
* Product details page
* Category management
* Create and edit categories
* Category search
* Category sorting
* Category pagination

##  Tech Stack

* React
* TypeScript
* React Router
* CSS
* REST API
* Vite

##  Project Structure

```text
src/
├── components/
│   ├── Admin/
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   ├── Footer/
│   │   ├── Product/
│   │   └── Category/
│   │
│   └── Store/
│       ├── Header/
│       ├── Footer/
│       ├── Hero/
│       └── Category/
│
├── hooks/
│   ├── useProducts.ts
│   └── useCategories.ts
│
├── models/
│   ├── Product/
│   └── Category/
│
├── pages/
│   ├── Admin/
│   └── Store/
│
├── services/
│   ├── api.ts
│   ├── productService.ts
│   └── categoryService.ts
│
└── App.tsx
```

##  Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd micro-shop
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the API

Set the backend API URL in the project configuration.

For example:

```env
VITE_API_BASE_URL=http://localhost:5000
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available through the local development URL provided by Vite.

##  Available Scripts

```bash
npm run dev
npm run build
npm run preview
```

##  UI

The application uses a clean and modern design system based on:

* Slate dark tones
* Blue accent colors
* Soft borders
* Rounded cards
* Subtle shadows
* Responsive layouts
* Consistent spacing and typography

The admin dashboard and storefront use separate visual styles while maintaining the same overall design language.

##  API

The frontend communicates with a REST API for managing:

* Products
* Product images
* Categories
* Product/category relationships

API communication is separated into service modules to keep components clean and maintainable.

##  Responsive Design

The interface is designed to work across:

* Desktop
* Tablet
* Mobile

Responsive layouts are implemented using CSS media queries and flexible grid/flex layouts.

## 📌 Project Status

The project is currently under active development.

Current focus areas include:

* Storefront UI
* Product browsing
* Category browsing
* Admin product management
* Admin category management
* Responsive design
* UI refinement

##  Author

Massih Yusevi(Yousefi)

---

Built with React + TypeScript.
