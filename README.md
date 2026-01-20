# TindaPH 🛍️

E-commerce platform for the Philippine market with local payment methods and Philippine address system.

## 🚀 Tech Stack

**Frontend**

- React 18 + TypeScript
- Tailwind CSS
- Vite

**Backend**

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- TypeScript

## ✨ Features

### MVP (Week 1)

- [x] Project setup
- [ ] User authentication (register/login)
- [ ] Product listings
- [ ] Shopping cart
- [ ] Checkout flow
- [ ] Order management

### Philippine Features (Week 2)

- [ ] GCash payment (simulation)
- [ ] Maya payment (simulation)
- [ ] Cash on Delivery (COD)
- [ ] Philippine address system (Barangay/City/Province)
- [ ] SMS notifications (Semaphore API)
- [ ] Peso currency formatting

### User Roles

- **Buyer**: Browse products, add to cart, checkout, track orders
- **Seller**: Add/edit products, manage inventory, view orders
- **Admin**: Manage users, orders, analytics

## 🛠️ Local Development

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Setup

```bash
# Clone repository
git clone https://github.com/jaspersanchez/tindaph.git
cd tindaph

# Install frontend dependencies
cd frontend
npm install
npm run dev

# Install backend dependencies (new terminal)
cd backend
npm install

# Create .env file
echo "MONGODB_URI=your_mongodb_uri
PORT=4000
JWT_SECRET=your_secret_key" > .env

# Start backend
npm run dev
```

### Access

- Frontend: http://localhost:5173
- Backend: http://localhost:4000

## 📁 Project Structure

```
tindaph/
├── frontend/          # React TypeScript
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   └── package.json
│
├── backend/           # Express TypeScript
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.ts
│   └── package.json
│
└── README.md
```

## 🚀 Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## 👨‍💻 Author

**Jasper Sanchez**

- GitHub: [@jaspersanchez](https://github.com/jaspersanchez)

## 📝 License

MIT
