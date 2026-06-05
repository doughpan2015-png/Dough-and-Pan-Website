# Dough & Pan Bakery Website

A modern bakery website built with React, Vite, TypeScript, Tailwind CSS, and Supabase.

The website allows customers to browse bakery products, add items to their cart, and explore featured products. An admin dashboard is provided for managing products and product images through Supabase.

## Features

### Customer Features

* Responsive modern bakery website
* Featured products on the homepage
* Complete menu page
* Product details
* Shopping cart functionality
* Mobile-friendly design

### Admin Features

* Secure admin authentication using Supabase Auth
* Add new products
* Edit existing products
* Delete products
* Upload product images to Supabase Storage
* Mark products as featured
* Control product visibility
* Manage stock availability

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router

### Backend

* Supabase Authentication
* Supabase PostgreSQL Database
* Supabase Storage

## Database Schema

### Products Table

```sql
create table products (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    category text not null,
    description text,
    price numeric(10,2) not null,
    image_url text,
    is_in_stock boolean not null default true,
    is_visible boolean not null default true,
    is_featured boolean default false,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);
```

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd dough-and-pan
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Build for Production

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

## Supabase Setup

### Authentication

Create an admin user in Supabase Authentication.

### Storage

Create a public bucket:

```text
product_images
```

### Products Table

Run the SQL schema provided above in the Supabase SQL Editor.

## Deployment

### Netlify

Build Command:

```text
npm run build
```

Publish Directory:

```text
dist
```

### SPA Redirects

Create:

```text
public/_redirects
```

Add:

```text
/* /index.html 200
```

This ensures React Router routes work correctly after deployment.

## Project Structure

```text
src/
├── components/
├── context/
├── data/
├── hooks/
├── lib/
├── pages/
│   └── admin/
└── utils/
```

## Future Improvements

* Order management
* Checkout workflow
* Customer accounts
* Inventory tracking
* Analytics dashboard
* Product categories management
* Discount and coupon system

## License

This project is intended for educational and commercial bakery website use.
