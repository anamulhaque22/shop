# Customer Client - E-commerce Platform

## Overview

This is the customer-facing frontend application for the e-commerce platform. It is built with **Next.js**, **React** and **TailwindCSS**, offering an intuitive and responsive UI for customers to browse, filter, and purchase products. The application integrates seamlessly with the backend API for managing authentication, cart functionality, payments, and order tracking.

## Features

### **Authentication and User Management**

- **Login and Registration**:  
  Secure email/password-based login and registration for users.
- **Social Login**:  
  Supports **Google** and **Facebook** for quick and secure authentication.
- **Forgot Password**:  
  Allows users to reset their password via a secure email link.
- **User Profile Update**:  
  Users can update their profile details, including name, password, and profile picture.

### **Shopping Features**

- **Advanced Product Filtering**:  
  Filter products based on price range, size, and category to find what you're looking for efficiently.
- **Infinite Scrolling**:  
  Enjoy smooth infinite scrolling on the product list page with caching powered by **TanStack Query**.
- **Wishlist and Cart Management**:
  - Save products to a wishlist for later.
  - Add products to the cart, update quantities, or remove them.
- **Stripe-Integrated Checkout**:  
  Secure and seamless payment handling through **Stripe**, ensuring quick and safe transactions.

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
cd clothing-shop/customer-client
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
   cd clothing-shop/customer-client
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
