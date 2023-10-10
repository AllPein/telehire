# Telehire client

This repository contains source code of Telehire client-side application

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Architecture overview](#architecture-overview)

## Getting Started

Follow these steps to set up client-side of Telehire locally and start developing

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
> You need to provide a publicly accessable link to the Bot, you cannot use local network URL
> To do that, you can use [ngrok](https://ngrok.com/), [localtunnel](https://theboroer.github.io/localtunnel-www/) or any other tool for that

You are all done! You can start developing the application.

> **Note**
> If you want to develop in browser, you also need to provide a [list of theme variables](https://core.telegram.org/bots/webapps#themeparams) in root css file and mock initData field, because they do not exist in browser environment

## Key Technologies

- _React:_ A JavaScript library for building user interfaces.
- _RxJS:_ A reactive programming library for managing asynchronous data streams.
- _React Router:_ A popular library for handling routing in React applications.
- _Redux:_ A predictable state container for managing application state.
- _Styled components:_ An approach to write css-in-js styles for the application.
- _Telegram SDK:_ SDK for accessing and managing data in Telegram application.

## Architecture overview

- _Components:_ Reusable UI components for building the user interface.
- _State Management:_ Centralized state management for maintaining application data.
- _RxJS Epics:_ Handling side effects and asynchronous operations.
- _Routing:_ Navigation and routing within the application.
- _Styling:_ CSS styles and styling methodologies.

## Folder structure

src/
├── components/
├── application/
│ └── ...
├── services/
└── ApiService.ts
├── store/
│ ├── actions/
│ ├── reducers/
│ ├── epics/
│ ├── selectors/
│ └── ...
├── utils/
├── hooks/
├── models/
├── enums/
└── pages/

- _components:_ Reusable UI components
- _application:_ Main application folder containing router and provider HOCs
- _services:_ API services and data fetching logic
- _store:_ Redux store, which consists of:

1. actions - objects that are sent
2. reducers - functions that mutate the state
3. epics - effects that represent a logic that triggers when a provided actions is called
4. selectors - functions that return the state object

- _utils:_ Useful utilites
- _hooks:_ Custom react hooks
- _models:_ Data models
- _enums:_ Enums
- _pages:_ Pages that are provided to the router component
