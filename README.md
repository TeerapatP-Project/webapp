# 🚀 Next.js Web Client

A web client built with **Next.js v15.2.2**, designed for drone configuration and logging. This project integrates **MUI, Tailwind CSS, Framer Motion, and React Spinners** for the UI and uses **Axios** to communicate with the backend API.

📌 **GitHub Repository:**  
👉 [TeerapatP-Project/webapp](https://github.com/TeerapatP-Project/webapp.git)

🌐 **Live Website:**  
👉 [webapp.vercel.app](https://webapp-ruby-six.vercel.app/)  

---

## 📌 **Features**
✅ Drone configuration management  
✅ Logging temperature data  
✅ Viewing temperature logs  
✅ Smooth animations with Framer Motion  
✅ Responsive UI with Tailwind CSS and MUI  

---

## 🔧 **Installation & Setup**

To run this project locally, follow these steps:

### 1️⃣ **Clone the repository
```sh
git clone https://github.com/TeerapatP-Project/web_client.git
cd web_client
```
### 2️⃣ **Install dependencies
```sh
npm install
```
This will install the following libraries:
- **Next.js v15.2.2** - The React framework
- **MUI** - Material UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animations
- **React Spinners** - Loading indicators
- **Axios** - HTTP client for API requests

```sh
npm install @mui/material @emotion/react @emotion/styled react-spinners axios framer-motion
```
### 3️⃣ Setup environment variables
Create a .env.local file and add:
```sh
NEXT_PUBLIC_DRONE_ID=64050497
NEXT_PUBLIC_DRONE_NAME=Teerapat Poolsap
NEXT_PUBLIC_COUNTRY=Thailand
NEXT_PUBLIC_API_BASE_URL=https://api-webapp.vercel.app
```
### 4️⃣ Run the development server
```sh
npm run dev
```
### Your web client will be available at:
```sh
http://localhost:3000
```

---

### 📜 Project Structure
```ruby
web_client/
│── public/          # Static assets
│── src/
│   ├── components/  # Reusable UI components
│   ├── pages/       # Next.js pages
│   ├── styles/      # Global styles (Tailwind CSS)
│   ├── utils/       # Helper functions
│── .env.local       # Environment variables
│── package.json     # Project dependencies
│── next.config.js   # Next.js configuration
```

---

### 🌍 API Integration
This web client interacts with the API at api-webapp.vercel.app. It uses Axios to fetch data from these endpoints:

### ✈️ Drone Configs
📍 Get drone configuration
```ts
GET /configs/:drone_id
```
📍 Get drone status
```ts
GET /status/:drone_id
```
### 📜 Drone Logs
📍 Get the latest 25 logs for a drone
```ts
GET /logs/:drone_id
```
📍 Add a new drone log
```ts
POST /logs
Content-Type: application/json
{
  "drone_id": "123",
  "drone_name": "Drone-X",
  "country": "USA",
  "celsius": 25
}
```

---

### 🎨 UI Technologies Used
Material UI (MUI) for modern UI components
Tailwind CSS for flexible styling
Framer Motion for animations
React Spinners for loading indicators

---

### 🚀 Deployment
This project is deployed on Vercel. To deploy your own version, follow these steps: 1️⃣ Push your project to a GitHub repository
2️⃣ Go to Vercel and import the repo
3️⃣ Set environment variables on Vercel
4️⃣ Deploy! 🎉

---


### 📄 License
This project is licensed under the MIT License.

---


### ✨ Developed by: TeerapatP-Project
### 🚀 Powered by: Next.js, Express.js & Vercel


