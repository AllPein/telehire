# Telehire client

This repository conrains source code for client side of Telehire application

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)

## Getting Started

Follow these steps to set up Telehire locally and start using it for your hiring needs

### Prerequisites

Before you begin, make sure you have the following prerequisites:

- Node.js >=16.0.0
- A Telegram account
- A Telegram bot with created Mini app

If you do not know how to create a bot with Mini app - please, follow the instructions listed here https://docs.ton.org/develop/dapps/telegram-apps/step-by-step-guide#setting-up-a-bot-for-the-app

### Installation

When you have a Telegram bot and a Mini app created, follow these steps to install the application

1. First, clone the repository by running

```shell
git clone https://github.com/AllPein/telehire
```

2. Go to telehire-client folder

```shell
cd telehire-client
```

3. Install dependencies

```shell
yarn
```

4. Create .env file and add the following variables:
   VITE_BASE_API_URL=https://your-backend-url

5. Start the development server by running

```shell
yarn dev
```

6. Provide a link of your running application to your Telegram bot

> **Important**
> You need to provide a public accessable link to the Bot, you cannot use local network URL
> To do that, you can use [ngrok](https://ngrok.com/), [localtunnel](https://theboroer.github.io/localtunnel-www/) or any other tool for that

You are all done! You can start developing the application.
