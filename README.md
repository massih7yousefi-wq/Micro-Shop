# Micro Shop

A full-stack online shopping platform built as a practical software development project.

The project is designed with a layered architecture and includes a REST API backend, a React frontend, and a Blazor frontend. The goal is to build a complete and maintainable e-commerce system while applying real-world development practices.

## Project Overview

**Micro Shop** is an online shopping platform that provides product and category management through an administrative interface and is being developed toward a complete e-commerce experience.

The project currently includes:

* Product management
* Category management
* Product creation and editing
* Product image management
* Product search
* Product sorting
* Pagination
* Category search and sorting
* Category-product relationship management
* RESTful API
* React administration interface
* Blazor application
* Database integration

## Technologies

### Backend

* C#
* .NET
* ASP.NET Core Web API
* Entity Framework Core
* SQL Database
* RESTful API
* Dependency Injection
* DTO-based API architecture
* Service Layer architecture

### Frontend

#### React

* React
* TypeScript
* React Router
* REST API integration
* Component-based architecture
* CSS

#### Blazor

* Blazor
* C#
* .NET
* REST API integration

## Project Structure

```text
Micro-Shop/
│
├── OnlineShop.API/
│   └── ASP.NET Core Web API
│
├── OnlineShop.React/
│   └── React + TypeScript frontend
│
├── OnlineShopBlozerSln/
│   └── Blazor application
│
├── OnlineShop_E/
│   └── Project documentation and development notes
│
├── .gitignore
└── README.md
```

## Architecture

The backend follows a layered approach to keep responsibilities separated.

```text
React / Blazor
      │
      ▼
    REST API
      │
      ▼
 Controllers
      │
      ▼
 Services
      │
      ▼
 Entity Framework Core
      │
      ▼
   Database
```

DTOs are used to control the data exposed by the API and to keep API contracts separate from database entities.

## Main Features

### Product Management

The product management section supports:

* Creating products
* Editing products
* Product image management
* Selecting a main product image
* Removing product images
* Product search
* Product sorting
* Pagination
* Category selection

### Category Management

The category management section supports:

* Creating categories
* Editing categories
* Deleting categories
* Category search
* Category sorting
* Pagination
* Displaying the number of products in each category

Categories that contain products cannot be deleted in order to preserve data integrity.

## API

The backend exposes RESTful endpoints that are consumed by the React and Blazor applications.

The API is responsible for:

* Product operations
* Category operations
* Data validation
* Database operations
* Search and filtering
* Sorting
* Pagination

## Development Approach

The project is being developed incrementally.

Development focuses on:

* Clean separation of responsibilities
* Reusable components
* API-first communication
* DTO-based data transfer
* Server-side search and pagination
* Input validation
* Error handling
* Maintainable code structure
* Git version control

## Documentation

The `OnlineShop_E` directory contains project documentation, notes, and explanations created during development.

These documents are used as a development reference and explain the implementation and structure of different parts of the project.

## Screenshots

Screenshots of the application will be added as the project UI is completed.

## Getting Started

### Backend

Navigate to the API project:

```bash
cd OnlineShop.API
```

Restore dependencies:

```bash
dotnet restore
```

Run the API:

```bash
dotnet run
```

### React

Navigate to the React project:

```bash
cd OnlineShop.React
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

### Blazor

Open the Blazor solution located in:

```text
OnlineShopBlozerSln/
```

Restore the required .NET dependencies and run the appropriate Blazor project.

## Git Workflow

The project uses Git for version control.

Typical workflow:

```bash
git add .
git commit -m "Describe the changes"
git push
```

Development is tracked through incremental commits as new features and improvements are added.

## Future Improvements

Planned improvements may include:

* Customer-facing shopping pages
* Shopping cart
* Checkout
* Order management
* User authentication and authorization
* Improved product filtering
* Improved UI/UX
* Responsive design
* API documentation
* Automated testing
* Deployment

## Project Status

**In Development**

Micro Shop is an ongoing project and new features, improvements, and refinements are being added progressively.

## Author

**Masih Yousefi**

This project was created as a full-stack development project to practice and demonstrate modern web application development using .NET, REST APIs, React, TypeScript, and Blazor.
