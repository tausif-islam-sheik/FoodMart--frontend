<div align="center">

# 🍽️ FoodMart

A modern, Full-Stack meal ordering and delivery platform

<p align="center">
  <img src="https://img.shields.io/badge/NEXT.JS@14-black?logo=next.js&logoColor=white&style=for-the-badge" alt="Next.js" />
  <img src="https://img.shields.io/badge/TYPESCRIPT@5-3178C6?logo=typescript&logoColor=white&style=for-the-badge" alt="TypeScript" />
  <img src="https://img.shields.io/badge/EXPRESS.JS-000000?logo=express&logoColor=white&style=for-the-badge" alt="Express.js" />
  <img src="https://img.shields.io/badge/POSTGRESQL-4169E1?logo=postgresql&logoColor=white&style=for-the-badge" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/MIT%20LICENSE-yellow?style=for-the-badge" alt="MIT License" />
</p>

<p align="center">
  <a href="https://foodmart-frontend.vercel.app">Live Demo</a> · <a href="https://github.com/tausif-islam-sheik/FoodMart--backend">Backend Repository</a>
</p>

</div>

---

## ❓ Problem Statement

Traditional food ordering processes often involve fragmented communication between customers and food providers, lack of order tracking, and no centralized platform for managing menus, orders, and deliveries. Additionally, many existing solutions don't provide role-based access control for different stakeholders (customers, providers, admins) in a single unified system.

## 💡 Solution Overview

**FoodMart** solves these challenges by providing a unified, full-stack meal ordering platform with distinct roles and permissions:

- **For Customers**: A seamless browsing and ordering experience with real-time order tracking
- **For Providers**: A dedicated dashboard to manage menus, view orders, and update order status
- **For Admins**: Complete oversight of the platform with user management and order monitoring capabilities

The platform streamlines the entire food ordering lifecycle from discovery to delivery, eliminating communication gaps and providing transparency at every step.

---

## 🎯 Project Goals

- Build a production-style full-stack application  
- Implement Role-Based Access Control (RBAC)  
- Design relational database schemas  
- Develop RESTful APIs  
- Handle authentication and protected routes  
- Simulate real-world order lifecycle workflow  
- Practice scalable backend and clean frontend architecture  

---

## 👥 Roles & Permissions

| Role | Description | Key Permissions |
|------|------------|----------------|
| **Customer** | Users who order meals | Browse meals, add to cart, place orders, track status, leave reviews |
| **Provider** | Food vendors/restaurants | Manage menu, view orders, update order status |
| **Admin** | Platform moderators | Manage users, monitor orders, manage categories |

---

## ✨ Features

### 🌐 Public Features
- Browse all meals and providers  
- Filter meals by category and price  
- View provider profiles with menus  

### 👤 Customer Features
- Register and login  
- Add meals to cart  
- Checkout with delivery address (Cash on Delivery)  
- Track order status  
- Leave reviews  
- Manage profile  

### 🍳 Provider Features
- Register and login as provider  
- Add, edit, and delete menu items  
- View incoming orders  
- Update order status  

### 🛡️ Admin Features
- View all users  
- Suspend/activate users  
- Monitor all orders  
- Manage food categories  

---

## 🛠️ Tech Stack

### Frontend
- **Next.js** (App Router) – React framework with server-side rendering
- **TypeScript** – Type-safe development
- **Tailwind CSS** – Utility-first styling
- **Shadcn** – UI component library
- **Protected routes** – Authentication-based route guarding
- **Dynamic rendering** – Server and client component architecture

### Backend
- **Node.js** – JavaScript runtime
- **Express.js** – Web framework
- **RESTful API** – Standardized API structure
- **Better-Auth** – Modern authentication framework with multiple auth strategies
- **JWT Authentication** – Secure token-based auth
- **Role-based authorization middleware** – Permission control

### Database
- **PostgreSQL** – Relational database
- **Prisma ORM** – Database toolkit and query builder
- **Relational schema design** – Structured data relationships

---


## 🚀 Getting Started / Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tausif-islam-sheik/FoodMart--frontend.git
   cd FoodMart-frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables** (see [Environment Variables](#-environment-variables) section)

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
# BACKEND_URL=http://localhost:5000
# NEXT_PUBLIC_AUTH_URL=http://localhost:5000/api/auth
# NEXT_PUBLIC_IMGBB_API_KEY= api_key
```

> **Note**: Replace placeholder values with your actual configuration. Never commit `.env.local` to version control.

---

## 🔄 Order Status Lifecycle

PLACED → PREPARING → READY → DELIVERED
(or CANCELLED)


---

## 🚀 Future Improvements

- Online payment integration  
- Real-time order updates (WebSocket)  
- Email notifications  
- Admin analytics dashboard  
- Advanced search & filtering  
- Rating moderation system  



## 📸 Screenshot


