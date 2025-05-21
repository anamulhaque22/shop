# Server Project - E-commerce Backend

## Overview

This project serves as the backend for an e-commerce platform. It is built using **NestJS**, **PostgreSQL**, **TypeORM** and follows the **Hexagonal Architecture (Ports and Adapters)**, ensuring scalability, maintainability, and separation of concerns.

### **Authentication & Authorization**

- **User Authentication**:
  - JWT-based login and registration system.
  - Secure password hashing using bcrypt.
- **Role-Based Access Control (RBAC)**:
  - Admin and user roles with granular permissions.

### **Product Management**

- **CRUD Operations**:
  - Create, Read, Update, and Delete products.
- **Product Variants**:
  - Support for size and color variants.
- **Category Management**:
  - Manage product categories with nested structures.

### **Order Management**

- **Order Placement**:
  - Validate product availability, price, and variants before order confirmation.
  - Create orders with multiple products.
- **Order Tracking**:
  - Update and retrieve order status (e.g., Pending, Shipped, Delivered).
- **Address Management**:
  - Link billing and shipping addresses to orders.
  - Support for one-time or reusable addresses.

### **Payment Integration**

- **Stripe Payment Gateway**:
  - Generate and validate payment intents.
  - Store payment details and status for each order.
  <!-- - **Webhook Handling**:
  - Automatically update order and payment statuses upon payment completion. -->

### **User Management**

- **Profile Management**:
  - Update user profile details.
- **Password Recovery**:
  - Forgot password functionality with secure token generation.
- **Social Logins**:

  - Google and Facebook login integration.

- **Filter and Sort Users**:
  - Filter users by their roles (e.g., Admin, Customer).
  - Sort users based on any column (e.g., `createdAt`, `name`, `email`) in ascending or descending order.
  - Combine filtering and sorting for efficient data retrieval.

### **Wishlist Management**

- Save and manage user wishlists.

### **Advanced Filtering & Pagination**

- **Product Filtering**:
  - Filter by price range, size, color, and category.
- **Pagination**:
  - Efficient pagination for products and orders using query parameters.

### **Admin Features**

- **Product Management**:
  - Full control over product creation and updates.
- **User Management**:
  - View and manage users in the system.
- **Order Management**:
  - View all orders and update statuses.
- **Statistics Dashboard**:
  - Total revenue, orders, products, and active users.
  - Monthly revenue chart and best-selling products data.

### **Database Management**

- **Relational Database**:
  - PostgreSQL with optimized schema design.
- **Data Validation**:
  - Comprehensive validation for user input and database interactions.

### **Error Handling & Logging**

- **Global Error Handling**:
  - Standardized error responses with meaningful messages.
  <!-- - **Centralized Logging**:
  - Detailed logs for errors and critical events. -->

### **Security**

<!--
- **Caching**:
  - Cache frequently accessed data using Redis (optional). -->

- **Rate Limiting**:
  - Protect endpoints from abuse with request rate limits.
- **Data Encryption**:
  - Encrypt sensitive information like passwords and tokens.

### **Scalability & Maintainability**

- **Hexagonal Architecture**:
  - Separation of concerns with Domain, Infrastructure, and Application layers.
- **Modular Design**:
  - Decoupled modules for easier maintenance and scalability.

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

---

## Setup Instructions

1. Clone repository

   ```bash
   git clone github.com/anamulhaque22/clothing-shop
   ```

1. Go to server folder, and copy `env-example-relational` as `.env`.

   ```bash
   cd clothing-shop/server
   cp env-example-relational .env
   ```

1. Install dependency

   ```bash
   npm install
   ```

1. Run migrations

   ```bash
   npm run migration:run
   ```

1. Run seeds

   ```bash
   npm run seed:run:relational
   ```

1. Run app in dev mode

   ```bash
   npm run start:dev
   ```

1. Open <http://localhost:8080>

## Description of the module structure

```text
.
├── domain
│   └── [DOMAIN_ENTITY].ts
├── dto
│   ├── create.dto.ts
│   ├── find-all.dto.ts
│   └── update.dto.ts
├── infrastructure
│   ├── entities
│   │   └── [ENTITY].ts
│   ├── mappers
│   │   └── [MAPPER].ts
│   ├── persistence.module.ts
│   ├── repositories
│   │   └──[ADAPTER].repository.ts
│   └── [PORT].repository.ts
├── controller.ts
├── module.ts
└── service.ts
```

## Links

- Postman (API docs): <https://documenter.getpostman.com/view/25131959/2sAYHzG3Ww>

## Database UML Diagram

![UML Diagram](../assets/images/uml.png)
