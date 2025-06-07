# 🎓 Blockchain-Based Student-Institution Document System

This is a blockchain-powered React application where **students and institutions** can sign up, log in using their **Block ID**, and interact via document upload and verification.

---

## ✨ Features

- 🔐 Student & Institution Signup/Login
- 🆔 Unique **Block ID** generated on signup
- 🏫 Institutions can upload files to student profiles
- 🎓 Students can view/download their documents
- 🖼️ Built using React + Tailwind CSS
- 🔗 Blockchain logic with Solidity and Hardhat (coming soon)

---

## 📁 Folder Structure

my-app/
├── src/
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── StudentSignup.jsx
│ │ ├── StudentLogin.jsx
│ │ ├── InstitutionSignup.jsx
│ │ ├── InstitutionLogin.jsx
│ │ └── ...
│ ├── contracts/ # Solidity smart contracts
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── public/
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md

yaml
Copy
Edit

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/student-institution-dapp.git
cd student-institution-dapp
2. Install Dependencies
bash
Copy
Edit
npm install
3. Start the Development Server
bash
Copy
Edit
npm run dev
Then open http://localhost:5173 in your browser.

🛠️ Tech Stack
Frontend: React, Tailwind CSS, Vite

Blockchain: Solidity, Hardhat, Ethers.js (integration ongoing)

Storage: LocalStorage (for demo purposes)

📌 Notes
Each user gets a unique Block ID on signup.

Block ID is used as a login credential.

Future versions will include real blockchain interactions and IPFS for file storage.












