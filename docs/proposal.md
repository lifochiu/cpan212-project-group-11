# 1.Problem and users

This project is aim to provide a personal meal planner & recipe manager that allow user to make their own meal plan or manage their own recipe.
The project will base on the user body information to offer daily nutrition suggestion.
And using external API to give user advise that meal planning is healthy or not.

# 2 Features

Recommendations for daily nutrient intake by each individual body information base on hight, weight and gender.

- Allow user to create daily meal plan.
  User can input daily activity and app will base on it adjust portion suggestion
  Application will base on body information to give portion suggestion

- Allow user to create and edit their own recipe.
  Using USDA DRI calculator for nutrition protion base on personal information
  Using USDA FoodData Central API as ingredients data source

# 3 External API

NutraPlanner API: analysis user's body information.
USDA DRI Calculator: provide standarize intake nutrition portion.
USDA FoodData Central: provide food database.

# 4 Data model draft

Meal plan: a meal plan can have one or many recipes
Recipe: a recipe can have one or many ingredients

# 5 Endpoint List

| Method | Path                     | What it does                                                                                                           | Success Status | Error Status  |
| ------ | ------------------------ | ---------------------------------------------------------------------------------------------------------------------- | -------------- | ------------- |
| GET    | `/api/meal-plans`        | Get all meal plans                                                                                                     | 200            | 500           |
| GET    | `/api/meal-plans/:id`    | Get one meal plan by ID                                                                                                | 200            | 404, 500      |
| POST   | `/api/meal-plans`        | Create a new meal plan                                                                                                 | 201            | 400, 500      |
| PUT    | `/api/meal-plans/:id`    | Update an existing meal plan                                                                                           | 200            | 400, 404, 500 |
| DELETE | `/api/meal-plans/:id`    | Delete a meal plan                                                                                                     | 204            | 404, 500      |
| GET    | `/api/recipes`           | Get all recipes                                                                                                        | 200            | 500           |
| GET    | `/api/recipes/:id`       | Get one recipe by ID                                                                                                   | 200            | 404, 500      |
| POST   | `/api/recipes`           | Create a new recipe                                                                                                    | 201            | 400, 500      |
| PUT    | `/api/recipes/:id`       | Update an existing recipe                                                                                              | 200            | 400, 404, 500 |
| DELETE | `/api/recipes/:id`       | Delete a recipe                                                                                                        | 204            | 404, 500      |
| POST   | `/api/nutrition/analyze` | Analyze user's body information and meal plan using external nutrition APIs and return daily nutrition recommendations | 200            | 400, 502, 500 |

# 6 Team roles

- Project idea and documentation
  Chiu Li Feng
  Collins Ehikhamen

- Frontend interface design
  Chiu Li Feng
  Yasser Geelle

- Backend and API
  Chiu Li Feng
  Yasser Geelle
  Collins Ehikhamen

- Database construct
  Chiu Li Feng

- Project and GitHub manage
  Chiu Li Feng
