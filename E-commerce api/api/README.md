
# E-commerce API

A RESTful API built with Node.js, Express, and MongoDB for managing an e-commerce platform. This API provides endpoints for managing categories, subcategories, and brands.

## Features

- **Categories Management**: Create, read, update, and delete product categories
- **Subcategories Management**: Manage subcategories linked to parent categories
- **Brands Management**: Handle product brands
- **Data Validation**: Input validation using express-validator
- **Error Handling**: Centralized error handling with custom error classes
- **Pagination**: Built-in pagination for list endpoints
- **Slug Generation**: Automatic slug generation for SEO-friendly URLs

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Validation**: express-validator
- **Utilities**: slugify, express-async-handler
- **Code Quality**: ESLint with Airbnb configuration

## Project Structure

```
├── connection/
│   └── config.js          # Database connection configuration
├── middlewares/
│   ├── errorMiddleware.js  # Global error handling middleware
│   └── validatorMiddleware.js # Validation middleware
├── models/
│   ├── brandModel.js       # Brand schema
│   ├── categoryModel.js    # Category schema
│   └── subCategory.js      # Subcategory schema
├── routers/
│   ├── brandRoute.js       # Brand routes
│   ├── categoryRoute.js    # Category routes
│   └── subCategoryRoute.js # Subcategory routes
├── services/
│   ├── brandService.js     # Brand business logic
│   ├── categoryService.js  # Category business logic
│   └── subCategoryService.js # Subcategory business logic
├── utils/
│   ├── validators/         # Input validation rules
│   └── apiError.js         # Custom error class
└── index.js               # Application entry point
```

## API Endpoints

### Categories

- `GET /api/categories` - Get all categories (with pagination)
- `POST /api/categories` - Create a new category
- `GET /api/categories/name/:name` - Get category by name
- `GET /api/categories/:id` - Get category by ID
- `PUT /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category

### Subcategories

- `GET /api/subCategories` - Get all subcategories (with pagination)
- `POST /api/subCategories` - Create a new subcategory
- `GET /api/subCategories/name/:name` - Get subcategory by name
- `GET /api/subCategories/:id` - Get subcategory by ID
- `PUT /api/subCategories/:id` - Update a subcategory
- `DELETE /api/subCategories/:id` - Delete a subcategory

### Nested Subcategories

- `GET /api/categories/:categoryId/subCategories` - Get subcategories for a specific category

### Brands

- `GET /api/brands` - Get all brands (with pagination)
- `POST /api/brands` - Create a new brand
- `GET /api/brands/name/:name` - Get brand by name
- `GET /api/brands/:id` - Get brand by ID
- `PUT /api/brands/:id` - Update a brand
- `DELETE /api/brands/:id` - Delete a brand

## Query Parameters

### Pagination
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 3)

Example: `GET /api/categories?page=2&limit=5`

## Request/Response Examples

### Create Category
```json
POST /api/categories
{
  "name": "Electronics"
}
```

### Create Subcategory
```json
POST /api/subCategories
{
  "name": "Smartphones",
  "category": "category_id_here"
}
```

### Create Brand
```json
POST /api/brands
{
  "name": "Samsung"
}
```

### Response Format
```json
{
  "data": {
    "_id": "67a5013de802ce125bca344f",
    "name": "Electronics",
    "slug": "electronics",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Database**
   - Update the MongoDB connection string in `connection/config.js`
   - Ensure your MongoDB instance is running

4. **Start the server**
   ```bash
   node index.js
   ```

The server will start on port 3000. You can access the API at `http://localhost:3000`

## Environment

- **Node.js Version**: 20.x
- **Default Port**: 3000
- **Database**: MongoDB

## Data Validation

The API includes comprehensive validation for all endpoints:

- **Name fields**: Required, 3-32 characters, alphanumeric with spaces only
- **MongoDB ObjectIDs**: Validated for proper format
- **Unique constraints**: Names must be unique within their respective collections

## Error Handling

The API uses centralized error handling with custom error messages:

- **400**: Bad Request (validation errors)
- **404**: Resource not found
- **500**: Internal server error

## Development

### Code Quality
- ESLint configuration with Airbnb style guide
- Prettier integration for code formatting

### Run Linting
```bash
npx eslint .
```

## Contributing

1. Follow the existing code structure and patterns
2. Ensure all validations are in place
3. Add appropriate error handling
4. Test your endpoints thoroughly

## License

ISC
