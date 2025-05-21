# Admin Client

The **Admin Client** is a robust web application built with **Next.js**, designed for managing an e-commerce platform efficiently. It provides admins with the tools to manage products, users, and categories while offering detailed statistics and order management functionalities.

---

## Features

### **Admin Management**

- **Product Management**:
  - Create, Read, Update, and Delete (CRUD) operations for managing products.
- **User Management**:
  - Admin can view and manage users in the system.
- **Category Management**:
  - Create, Read, Update, and Delete categories for better product organization.

### **Admin Statistics**

- **Overview Dashboard**:
  - Total revenue.
  - Total orders and products.
  - Number of active customers.
- **Charts and Insights**:
  - Monthly revenue displayed using an area chart.
  - Best-selling products for improved inventory planning.

### **Order Management**

- View all customer orders.
- Update order status (e.g., Pending, Shipped, Delivered).
- Track and manage customer orders for efficient fulfillment.

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- A compatible web browser (e.g., Chrome, Firefox)

---

### Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/anamulhaque22/clothing-shop
   ```

1. **Install dependencies**

   ```bash
   cd clothing-shop/admin-client
   npm install
   ```

1. **Copy example environment file**

   ```bash
   cp .env.local .env.local

   ```

1. Run development server

   ```bash
   npm run dev
   ```

## Production build

1. **Clone repository**

   ```bash
   git clone https://github.com/anamulhaque22/clothing-shop
   ```

1. **Install dependencies**

   ```bash
   cd clothing-shop/admin-client
   npm install
   ```

1. **Copy example environment file**

   ```bash
   cp example.env.local .env.local
   ```

1. **Build application**

   ```bash
   npm run build
   ```

1. **Run production server**

   ```bash
    npm run start
   ```
