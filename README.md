# Personal-Finance-Manager

## Description
This project is a full-stack application that fetches and manages category data via API calls. The frontend is built using React, and the backend is powered by NodeJs.

## Features
- Fetch categories via API
- Add new categories
- Edit existing categories
- Delete categories

---

## Prerequisites
Ensure you have the following installed on your machine:

- **Node.js** 
- **npm or yarn** (for package management)
- **Backend dependencies** 

---

## Backend Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/project.git
cd backend
```

### 2. Install Dependencies
```bash
npm install  # or yarn install
```
### 3.Start the Backend Server
```bash
npm start  # or nodeman server.js
```
The backend should now be running at `http://localhost:5000`

---
## Frontend Setup
### Start the Frontend Server

### Navigate to the Frontend Directory
```bash
cd ../frontend
```

### Install Dependencies
```bash
npm install  # or yarn install
```

### Start the Frontend
```bash
npm start  # or npm run dev (if using Vite)
```
The frontend should now be running at `http://localhost:3000`

---

## API Endpoints

### **GET /categories**
Fetch all categories.

### **POST /categories**
Add a new category.

### **PUT /categories/:id**
Update an existing category.

### **DELETE /categories/:id**
Delete a category.

---

## Troubleshooting
- **CORS Errors?** Ensure CORS is enabled in your backend.
- **API Not Responding?** Check if the backend is running.
- **Frontend Not Fetching Data?** Inspect the console for network errors.

---

## License
This project is licensed.
