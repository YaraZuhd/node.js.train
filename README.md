# Node.js E-Commerce REST API

A RESTful API built with Node.js, TypeScript, Express, and TypeORM backed by PostgreSQL. It provides user authentication, product management, category management, shopping cart, and order processing.

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **ORM**: TypeORM
- **Database**: PostgreSQL
- **Auth**: JWT (jsonwebtoken)
- **Validation**: Joi
- **Password Hashing**: bcryptjs

## Project Structure

```
src/
├── controllers/        # Request handlers
│   ├── cart.controller.ts
│   ├── category.controller.ts
│   ├── login.controller.ts
│   ├── order.controller.ts
│   ├── product.controller.ts
│   ├── register.controller.ts
│   └── user.controller.ts
├── entity/             # TypeORM entities
│   ├── Cart.ts
│   ├── Category.ts
│   ├── Order.ts
│   ├── Product.ts
│   ├── User.ts
│   └── orderItems.ts
├── middlewares/        # Express middlewares
│   ├── checkData.ts
│   ├── checkJwt.ts
│   └── checkRole.ts
├── routes/             # Route definitions
│   ├── cart.routes.ts
│   ├── category.routes.ts
│   ├── login.routes.ts
│   ├── order.routes.ts
│   ├── product.routes.ts
│   ├── register.routes.ts
│   └── user.routes.ts
├── schemas/            # Joi validation schemas
├── app.ts              # Express app setup
├── config.ts           # App configuration
├── db.ts               # Database connection
├── index.ts            # Entry point
└── secretkey.ts        # JWT secret
```

## Getting Started

### Prerequisites

- Node.js >= 14
- PostgreSQL

### Installation

```bash
npm install
```

### Configuration

Update `src/db.ts` with your PostgreSQL credentials:

```typescript
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "your_username",
  password: "your_password",
  database: "your_database",
  synchronize: true,
  entities: [User, Product, Category, Order, Cart, OrderItems],
});
```

### Running

**Development (with hot reload):**
```bash
npm run dev
```

**Build:**
```bash
npm run build
```

**Production:**
```bash
npm start
```

The server starts on port `3000` by default. Override with the `PORT` environment variable.

## Authentication

The API uses JWT Bearer tokens. Include the token in the `Authorization` header:

```
Authorization: Bearer <token>
```

### Roles

| Role            | Description                        |
|-----------------|------------------------------------|
| `admin`         | Full access to all endpoints       |
| `product admin` | Manage products and categories     |
| `user`          | Browse products, manage own cart/orders |

## API Endpoints

### Auth

| Method | Path      | Description              | Access |
|--------|-----------|--------------------------|--------|
| POST   | /signup   | Register a new user      | Public |
| POST   | /login    | Login and receive JWT    | Public |

### Users

| Method | Path            | Description              | Access |
|--------|-----------------|--------------------------|--------|
| GET    | /users          | Get all users            | admin  |
| GET    | /users/me       | Get current user         | authenticated |
| GET    | /users/user/:id | Get user by ID           | admin  |
| POST   | /users          | Create a user            | admin  |
| PUT    | /users/user/:id | Update a user            | admin  |
| DELETE | /users/user/:id | Delete a user            | admin  |

### Products

| Method | Path                         | Description                        | Access                   |
|--------|------------------------------|------------------------------------|--------------------------|
| GET    | /products                    | Get all products (paginated)       | admin, product admin, user |
| GET    | /products/product/:id        | Get product by ID                  | admin, product admin, user |
| GET    | /products/filter-Products    | Get filtered products (paginated)  | admin, product admin, user |
| POST   | /products/filter-Products    | Filter products by category/name   | admin, product admin, user |
| POST   | /products                    | Create a product                   | admin, product admin     |
| PUT    | /products/product/:id        | Update a product                   | admin, product admin     |
| DELETE | /products/product/:id        | Delete a product                   | admin, product admin     |

#### Pagination

Pass `?page=<number>` to paginate results (6 products per page):

```
GET /products?page=1
```

Response includes `next` and `previous` page references:

```json
{
  "previous": { "page": 1, "limit": 6 },
  "next": { "page": 3, "limit": 6 },
  "products": [...]
}
```

#### Filter Products

```json
POST /products/filter-Products
{
  "categorie": "Electronics"
}
```

```json
POST /products/filter-Products
{
  "product": "laptop"
}
```

Use `"Show All"` as the category value to return all products.

### Categories

| Method | Path                    | Description           | Access               |
|--------|-------------------------|-----------------------|----------------------|
| GET    | /categories             | Get all categories    | admin, product admin, user |
| GET    | /categories/category/:id| Get category by ID    | admin, product admin, user |
| POST   | /categories             | Create a category     | admin, product admin |
| PUT    | /categories/category/:id| Update a category     | admin, product admin |
| DELETE | /categories/category/:id| Delete a category     | admin, product admin |

### Cart

| Method | Path                               | Description                    | Access                   |
|--------|------------------------------------|--------------------------------|--------------------------|
| GET    | /carts                             | Get all carts                  | admin                    |
| GET    | /carts/me                          | Get current user's cart        | authenticated            |
| GET    | /carts/cart/:id                    | Get cart by ID                 | admin                    |
| PUT    | /carts/add-product-to-cart         | Add product to cart            | admin, product admin, user |
| PUT    | /carts/update-cart-item/:productId | Update quantity of cart item   | admin, product admin, user |
| DELETE | /carts/delete-cart-item/:productId | Remove a specific item from cart | admin, product admin, user |
| DELETE | /carts/delete-cart-items           | Clear all items from cart      | admin, product admin, user |

#### Add Product to Cart

```json
PUT /carts/add-product-to-cart
{
  "items": [
    { "id": 1, "productName": "Laptop", "quantity": 2 }
  ]
}
```

#### Update Cart Item

```json
PUT /carts/update-cart-item/1
{
  "items": [
    { "newQuantity": 3, "oldQuantity": 2 }
  ]
}
```

### Orders

| Method | Path               | Description        | Access                      |
|--------|--------------------|--------------------|-----------------------------|
| GET    | /orders            | Get all orders     | admin, product admin, user  |
| GET    | /orders/order/:id  | Get order by ID    | admin, product admin, user  |
| POST   | /orders            | Create order from cart | admin, product admin, user |
| PUT    | /orders/order/:id  | Update an order    | admin                       |
| DELETE | /orders/order/:id  | Delete an order    | admin, product admin, user  |

Creating an order converts the current user's cart into an order and clears the cart.

## Data Models

### User
| Field     | Type   | Notes                     |
|-----------|--------|---------------------------|
| id        | number | Primary key               |
| firstname | string |                           |
| lastname  | string |                           |
| gender    | string |                           |
| phone     | string |                           |
| email     | string | Unique                    |
| password  | string | Stored as bcrypt hash     |
| address   | string | Required                  |
| role      | string | Default: `"user"`         |

### Product
| Field      | Type   | Notes                          |
|------------|--------|--------------------------------|
| id         | number | Primary key                    |
| name       | string |                                |
| price      | number |                                |
| desription | string |                                |
| categories | array  | Many-to-many with Category     |

### Cart
| Field     | Type   | Notes                      |
|-----------|--------|----------------------------|
| id        | number | Primary key                |
| quentity  | number | Total item count           |
| price     | number | Total price                |
| status    | string | `"Empty"` or `"Pending"`   |
| items     | array  | One-to-many with OrderItems|

### Order
| Field           | Type   | Notes                    |
|-----------------|--------|--------------------------|
| id              | number | Primary key              |
| orderDate       | date   | Auto-generated           |
| totalPrice      | number |                          |
| totalQuentities | number |                          |
| name            | string |                          |
| status          | string |                          |
| user            | User   | Many-to-one              |
| items           | array  | One-to-many OrderItems   |
| cart            | Cart   | Many-to-one              |
