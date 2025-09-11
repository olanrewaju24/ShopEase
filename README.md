# ShopEase — Mini E‑commerce (React + Vite + Tailwind + Firebase Auth)

A minimal, clean starter that hits all the required features: authentication, product listing/details (FakeStoreAPI), cart with localStorage persistence, checkout simulation, and an optional user dashboard with mocked past orders.

## Quick Start

```bash
# 1) Install deps
npm install

# 2) Set your Firebase config
# Edit: src/utils/firebaseConfig.js with your project's values

# 3) Run dev server
npm run dev
```

## Tech

- React 18, React Router v6
- Tailwind CSS 3
- Vite 5 build tool
- Firebase Auth (email/password)

## Structure

```
src/
  components/       # Navbar, ProductCard
  pages/            # ProductList, ProductDetails, Cart, Checkout, Auth pages, Dashboard
  services/         # FakeStore API helpers
  state/            # AuthContext (Firebase), CartContext (localStorage)
  utils/            # firebaseConfig placeholder
```

## Notes

- Cart is persisted in `localStorage` (`shopease_cart_v1`).
- Orders are mocked and saved in `localStorage` (`shopease_orders_v1`) after "Place Order".
- Product data comes from https://fakestoreapi.com.
- The checkout does not process real payments.
- The Dashboard filters orders by the current user's UID.

## Supabase Option

If you prefer Supabase Auth, replace `src/state/AuthContext.jsx` with Supabase client logic.
```bash
npm i @supabase/supabase-js
```
Then initialize a client and mirror the API (`login`, `signup`, `logout`, `user`) used by the app.

## Deploy

- **Vercel/Netlify** works out-of-the-box. Build command: `npm run build`, output directory: `dist`.
