# 1. GET /api/recipe/:id

# Expected status: 200 OK

curl -i "http://localhost:4000/api/recipe/recipe1"

# 2. POST /api/recipe/:id

# Expected status: 201 Created

curl -i -X POST "http://localhost:4000/api/recipe/new" \
 -H "Content-Type: application/json" \
 -d '{
"name": "Tomato Rice",
"description": "Rice cooked with tomatoes.",
"servings": 2,
"prepTimeMinutes": 5,
"cookTimeMinutes": 20,
"ingredients": [
{"name": "Rice", "quantity": 150, "unit": "g"},
{"name": "Tomato", "quantity": 2, "unit": "piece"}
],
"instructions": "Chop the tomatoes and cook them with the rice."
}'

# 3. PATCH /api/recipe/:id

# Expected status: 200 OK

curl -i -X PATCH "http://localhost:4000/api/recipe/recipe1" \
 -H "Content-Type: application/json" \
 -d '{"servings": 3}'

# 4. DELETE /api/recipe/:id

# Expected status: 204 No Content

curl -i -X DELETE "http://localhost:4000/api/recipe/recipe3"

# 5. GET /api/foods/search

# Expected status: 200 OK

# Requires a valid USDA_API_KEY and an available external API.

curl -i "http://localhost:4000/api/foods/search?q=chicken"

# 6. Validation failure: servings cannot be 0

# Expected status: 400 Bad Request

curl -i -X PATCH "http://localhost:4000/api/recipe/recipe1" \
 -H "Content-Type: application/json" \
 -d '{"servings": 0}'

# 7. Unknown endpoint

# Expected status: 404 Not Found

curl -i "http://localhost:4000/api/xxx"

# 8. List with filter, sort and pagination

# Expected status: 200 OK

curl -i "http://localhost:4000/api/recipe?category=dinner&sort=-cookTimeMinutes&page=2&limit=4"

# 9. Sort field not on the allowlist

# Expected status: 400 Bad Request

curl -i "http://localhost:4000/api/recipe?sort=abc"

# 10. Mongoose validation error

# Expected status: 400 Bad Request

curl -i -X PATCH "http://localhost:4000/api/recipe/RECIPE_ID" \
 -H "Content-Type: application/json" \
 -d '{"servings": 999}'

# 11. Badly formed id

# Expected status: 404 Not Found

curl -i "http://localhost:4000/api/recipe/bad"

# 12. Meal plan with populated recipes (get PLAN_ID from GET /api/meal-plans)

# Expected status: 200 OK

curl -i "http://localhost:4000/api/meal-plans/PLAN_ID"
