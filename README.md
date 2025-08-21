# Express Server for /player Admin System

This Express server handles **Discord integration** for the FiveM `/player` admin tool. It allows admins to send messages to players via **Discord DMs** and (in future versions) create private support voice channels.

---

## ✅ Features

- Receives POST requests from the FiveM NUI interface
- Sends messages to players via Discord DMs using **Embeds**
- Built with:
  - [Express.js](https://expressjs.com/)
  - [discord.js](https://discord.js.org/)

---

## 📦 Requirements

- **Node.js** (v16 or higher recommended)
- A Discord bot with the following permissions:
  - `Send Messages`
  - `Create Voice Channels` (for future support channel feature)
  - `Manage Channels` (if needed for permissions)

---

## 🔧 Setup

### 1. Clone the repository
```bash
git clone YOUR_EXPRESS_SERVER_REPO_LINK
