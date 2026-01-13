# 🚀 Real-Time Chat Application with ChatGPT  
**Angular + Node.js + Socket.IO + OpenAI**

A modern real-time web chat application where users can talk with each other and also with **ChatGPT AI** inside the same chat room.

---

## ✨ Features

- 🧑‍🤝‍🧑 Multiple users in one chat room  
- 💬 Real-time messaging (WebSockets)  
- 🤖 ChatGPT AI replies  
- ⌨ AI typing indicator  
- 🟢 Online users list  
- ⚡ Instant updates without page reload  

---

## 🛠 Tech Stack

| Layer | Technology |
|------|-----------|
Frontend | Angular (Standalone Components)  
Backend | Node.js + Express  
Realtime | Socket.IO  
AI | OpenAI ChatGPT API  
Security | dotenv  

---

## 🧠 How It Works

Browser (Angular)
|
| WebSocket
|
Node.js + Socket.IO
|
| OpenAI API
|
ChatGPT

- Users connect to the Node.js server using WebSockets  
- Messages are broadcast in real-time  
- Messages are sent to ChatGPT  
- ChatGPT replies are sent back to all users  

---

## 📁 Project Structure

chat-app/ → Angular frontend
chat-server/ → Node.js + Socket.IO backend


---

#### ⚙️ Installation

## 1️⃣ Backend Setup

  cd chat-server
  
  npm install

  OPENAI_API_KEY=your_openai_api_key_here

  node server.js

## 2️⃣ Frontend Setup

cd chat-app

npm install

ng serve


### open in browser --------   http://localhost:4200
