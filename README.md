# Exercise Tracker API

> A RESTful Node.js API for creating users, logging exercises, and retrieving workout history with optional date and limit filters.

Built as part of the [freeCodeCamp Back End Development and APIs](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker) certification.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
  - [Create a User](#post-apiusers)
  - [Get All Users](#get-apiusers)
  - [Log an Exercise](#post-apiusers_idexercises)
  - [Get Exercise Log](#get-apiusers_idlogs)
- [Project Structure](#project-structure)
- [License](#license)

---

## Overview

This microservice lets you manage users and their exercise logs through a simple REST API. You can create a user, add exercises (with description, duration, and date), and pull back a filtered log of their activity. It's a solid demonstration of RESTful design, data modeling, and query parameter handling in Node.js.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Environment:** dotenv

---

## Getting Started

### Prerequisites

- Node.js v14+
- npm
- A running MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

```bash
# Clone the repository
git clone https://github.com/AhmadAliDev202/boilerplate-project-exercisetracker-main.git
cd boilerplate-project-exercisetracker-main

# Install dependencies
npm install
```

### Environment Setup

```bash
cp sample.env .env
```

Open `.env` and fill in your values:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/exercise-tracker
```

### Run the App

```bash
npm start
```

App will be running at `http://localhost:3000`.

---

## API Reference

### `POST /api/users`

Create a new user.

**Request Body** (`application/x-www-form-urlencoded`)

| Field | Type | Required |
|---|---|---|
| `username` | string | ✅ |

**Response**

```json
{
  "username": "ahmad",
  "_id": "64f3a1b2c3d4e5f6a7b8c9d0"
}
```

---

### `GET /api/users`

Get a list of all registered users.

**Response**

```json
[
  { "username": "ahmad", "_id": "64f3a1b2c3d4e5f6a7b8c9d0" },
  { "username": "ali", "_id": "64f3a1b2c3d4e5f6a7b8c9d1" }
]
```

---

### `POST /api/users/:_id/exercises`

Log a new exercise for a user.

**URL Params**

| Param | Description |
|---|---|
| `_id` | The user's ID |

**Request Body** (`application/x-www-form-urlencoded`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `description` | string | ✅ | |
| `duration` | number | ✅ | In minutes |
| `date` | string | ❌ | `yyyy-mm-dd` format. Defaults to today if omitted |

**Response**

```json
{
  "username": "ahmad",
  "_id": "64f3a1b2c3d4e5f6a7b8c9d0",
  "description": "Morning run",
  "duration": 30,
  "date": "Thu May 14 2026"
}
```

---

### `GET /api/users/:_id/logs`

Retrieve a user's full exercise log. Supports optional filters.

**URL Params**

| Param | Description |
|---|---|
| `_id` | The user's ID |

**Query Params (all optional)**

| Param | Type | Description |
|---|---|---|
| `from` | string | Start date (`yyyy-mm-dd`) |
| `to` | string | End date (`yyyy-mm-dd`) |
| `limit` | number | Max number of entries to return |

**Example**

```
GET /api/users/64f3a1b2c3d4e5f6a7b8c9d0/logs?from=2026-01-01&to=2026-05-14&limit=5
```

**Response**

```json
{
  "username": "ahmad",
  "_id": "64f3a1b2c3d4e5f6a7b8c9d0",
  "count": 2,
  "log": [
    { "description": "Morning run", "duration": 30, "date": "Thu Jan 02 2026" },
    { "description": "Cycling", "duration": 45, "date": "Tue Mar 10 2026" }
  ]
}
```

---

## Project Structure

```
├── public/          # Static assets (CSS, client-side JS)
├── views/           # HTML templates (index.html)
├── index.js         # Express app — routes, models, and server logic
├── sample.env       # Environment variable template
├── package.json     # Project metadata and dependencies
└── README.md
```

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

*Completed as Certificate Project 4 - freeCodeCamp Back End Development and APIs.*
