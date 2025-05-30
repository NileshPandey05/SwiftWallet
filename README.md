# 💸 SwiftWallet

A Paytm-like digital wallet web application that enables users to add money to their wallet, transfer money to others, pay merchants, purchase products, and withdraw funds back to their bank. This application also supports merchant functionalities for accepting payments and managing listings.

---

## 🚀 Features

### 👤 User Functionality:
- Add money from bank to wallet
- Peer-to-peer (P2P) money transfer
- View transaction history

### 🛒 Merchant Functionality:
- Accept payments from users
- Manage product listings
- Withdraw funds to bank
- View payment history

---

## 🧰 Tech Stack

- **Monorepo Structure:** Turborepo / Nx (assumed)
- **Frontend:** React.js (Next.js)
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** Phone number + password
- **Dev Tools:** Docker, Prisma, Neon.tech (optional cloud DB)
---

## 📦 Installation & Setup

### 1. Clone the Repo

```bash
git clone https://github.com/100xdevs-cohort-2/week-17-final-code
cd week-17-final-code
```

### 2. Install Dependencies
```
npm install
```

### 3. Set Up PostgreSQL
```
docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```
or Get from online from Neon.tech or Supabase

### 4. Configure Environment Variables
- Copy .env.example files to .env in all necessary folders:

    - apps/user-app/
    - packages/db/
    
- Update each .env file with your actual DATABASE_URL. Example format:
```
DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5432/postgres
```

### 5. Database Setup
```
cd packages/db
npx prisma migrate dev
npx prisma db seed
```

### 6. Start the Application
```
cd apps/user-app
npm run dev
```
