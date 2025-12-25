# 📚 LIBRARY MANAGEMENT APIs

A RESTful API for managing a library system built with **Node.js** and **Express.js**.  
This API provides endpoints for managing books, authors, users, and loan records.

## 🚀 Features

- 📖 CRUD operations for books  
- 👤 User management (register, login, profile)  
- 📚 Loan/Return tracking  
- 🛠 Built with Express and modular architecture  
- 🐋 Docker‑ready setup  

## 🧰 Tech Stack

- **Node.js**  
- **Express.js**  
- **MongoDB** (or any database you configure)  
- **Middleware** for validation & error handling  
- **Docker** for containerized deployment  

## 📥 Installation

```sh
git clone https://github.com/mdadeebahmed/lib-management-apis.git
cd lib-management-apis
npm install
```

## ⚙️ Configuration

Create a `.env` file in the root folder:

```env
PORT=3000
DB_URI=<your_database_connection_string>
JWT_SECRET=<your_jwt_secret>
```

## ▶️ Running the App

```sh
npm start
```

API runs at: `http://localhost:3000`

## 🐳 Docker

```sh
docker build -t lib-management-api .
docker run -p 3000:3000 lib-management-api
```

## 📜 License

MIT License
