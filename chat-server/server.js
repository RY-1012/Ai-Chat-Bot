require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const OpenAI = require("openai");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

let users = {};

// GPT function
async function getAIReply(message) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a friendly real-time chat assistant in a group chat." },
        { role: "user", content: message }
      ],
      max_tokens: 150
    });

    return response.choices[0].message.content;
  } catch (err) {
    console.error("OpenAI error:", err.message);
    return "⚠️ AI failed. Check your OpenAI key & billing.";
  }
}

// Socket logic
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (username) => {
    users[socket.id] = username;
    io.emit("users", Object.values(users));

    io.emit("receiveMessage", {
      user: "System",
      message: `${username} joined the chat 👋`
    });
  });

  socket.on("typing", () => {
    socket.broadcast.emit("typing");
  });

  socket.on("sendMessage", async (data) => {
    // Send user message
    io.emit("receiveMessage", {
      user: data.user,
      message: data.message
    });

    // Show AI typing
    io.emit("typing");

    // Get ChatGPT reply
    const reply = await getAIReply(data.message);

    io.emit("receiveMessage", {
      user: "ChatGPT 🤖",
      message: reply
    });
  });

  socket.on("disconnect", () => {
    const name = users[socket.id];
    delete users[socket.id];
    io.emit("users", Object.values(users));

    if (name) {
      io.emit("receiveMessage", {
        user: "System",
        message: `${name} left the chat 🚪`
      });
    }
  });
});

server.listen(3000, () => {
  console.log("🚀 ChatGPT server running on port 3000");
});
