# Dank Forest Bot

A Discord bot made specifically for the Dank Forest server. It handles channel permissions, admin-level embeds, ping embeds, and informational embeds. Built with JavaScript, discord.js, and MongoDB.

## Commands

| Category | Commands |
| --- | --- |
| Channel permissions | `/viewlock`, `/unviewlock`, `/elock` |
| Admin embeds | `/welcome`, `/embed`, `/menu` |
| Ping embeds | `/hdono`, `/gdono`, `/edono`, `/eping` |
| Informational embeds | `/hem`, `/gem`, `/eem` |
| Utility | `/ping` |

Staff commands are hidden from regular members and require a staff role to run.

## Setup

1. Install [Node.js](https://nodejs.org/) 16.11 or newer.
2. Clone the repo and install dependencies:

   ```bash
   git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
   cd YOUR-REPO
   npm install
   ```

3. Create a `.env` file (and keep it out of Git):

   ```env
   token=YOUR_BOT_TOKEN
   # Add your MongoDB connection string here
   ```

4. Start the bot:

   ```bash
   node src/bot.js
   ```

Slash commands register automatically when the bot starts.

## Note

Role IDs, channel IDs, and embed text are set for the Dank Forest server and need to be changed to use the bot elsewhere.
