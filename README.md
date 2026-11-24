# Application

Personal meal planner & recipe manager

# Getting started

Requirements: Node 24 and a MongoDB database (local or Atlas).

## 1. API (folder: api/)

```bash
cd api
npm install
cp .env.example .env
npm run seed
npm run dev
```

The API runs at http://localhost:4000.

## 2. Frontend (folder: web/)

In a second terminal:

```bash
cd web
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

# Environment variables

api/.env

- PORT: Server port. Default is 4000
- USDA_API_KEY: Required for the external food search endpoint
- MONGODB_URI: Required. The API stops with a message if it is missing.
  - Local: mongodb://127.0.0.1:27017/mealplanner
  - Atlas: copy the connection string from Connect > Drivers

web/.env.local

- API_URL: Address of the Express API, for example http://localhost:4000

# Seed data

Run `npm run seed` in api/. It deletes all recipes and meal plans, then creates 30 recipes and 3 meal plans. Existing data is lost.

# Recipe list query parameters

GET /api/recipe

| Parameter | Values                                                          | Default    |
| --------- | --------------------------------------------------------------- | ---------- |
| category  | breakfast, lunch, dinner, snack                                 | all        |
| q         | Text to find in the name, not case sensitive                    | none       |
| sort      | name, cookTimeMinutes, createdAt. Put - in front for descending | -createdAt |
| page      | Positive integer                                                | 1          |
| limit     | Positive integer, maximum 50                                    | 10         |

An unknown sort or category, or an invalid page or limit, returns 400. A limit above 50 is reduced to 50.

The response contains data, total, page, limit and pages.

Example: /api/recipe?category=dinner&sort=-cookTimeMinutes&page=2&limit=4

# Related data

A meal plan stores references to recipes. GET /api/meal-plans/:id returns the full recipes using populate.

# Testing

The curl requests are in api/README.md.

# AI use

Using codex for provide function example and testing code base logic

## Group 11 members:

Collins Ehikhamen
Yasser Geelle
Chiu Li Feng

## GitHub username

lifochiu
html134
mrmcmahon23-crypto
