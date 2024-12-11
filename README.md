# API Project

This repository contains a TypeScript-based Node.js API for managing items categorized as `product`, `service`, and `subscription`. The project includes validation for all fields and detailed error handling.

---

## Features

1. **Endpoints**:

   - **GET /api/items**: Retrieve all items grouped by type.
   - **POST /api/items**: Add a new item of type `product`, `service`, or `subscription`.

2. **Validation**:

   - Ensures required fields are present for each item type.
   - Validates data types (e.g., `name` as a string, `price` as a number).

3. **Error Handling**:

   - Returns meaningful error messages for missing or invalid fields.
   - Handles unsupported item types.

4. **In-Memory Storage**:
   - Stores items grouped by type in an in-memory data structure for simplicity.

---

## Project Structure

```
project-root/
├── src/
│   ├── types.ts        # TypeScript interfaces for Product, Service, and Subscription
│   ├── validators.ts  # Validation logic for each item type
│   ├── storage.ts     # In-memory storage for items
│   ├── routes.ts      # API routes for items
│   └── server.ts      # Express server setup
├── package.json         # Project dependencies and scripts
└── README.md           # Documentation (this file)
```

---

## Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the Server**:

   ```bash
   npm start
   ```

4. **Run Tests**:
   ```bash
   npm test
   ```

---

## API Endpoints

### 1. GET /api/items

- **Description**: Retrieve all items grouped by type.
- **Response**:
  ```json
  {
    "product": [{ "id": "1234", "name": "Laptop", "price": 1200 }],
    "service": [{ "id": "5678", "name": "Consulting", "duration": 5 }],
    "subscription": [
      {
        "id": "9101",
        "name": "Premium Plan",
        "price": 50,
        "billingCycle": "monthly"
      }
    ]
  }
  ```
- **Error Handling**:
  - If no items exist:
    ```json
    {
      "message": "No items found"
    }
    ```

### 2. POST /api/items

- **Description**: Add a new item based on type.
- **Request Body**:
  ```json
  {
    "type": "product",
    "name": "Laptop",
    "price": 1200
  }
  ```
- **Response**:
  ```json
  {
    "message": "Item added successfully",
    "item": {
      "id": "1234",
      "type": "product",
      "name": "Laptop",
      "price": 1200
    }
  }
  ```
- **Error Handling**:
  - Missing fields:
    ```json
    {
      "error": "'price' is required and must be a number for 'product'"
    }
    ```
  - Invalid `type`:
    ```json
    {
      "error": "Invalid 'type'. Must be 'product', 'service', or 'subscription'"
    }
    ```

---

## Validation Approach

1. **Centralized Validation**:

   - `validators.ts` contains dedicated validation functions for each type (`product`, `service`, `subscription`).
   - Each function checks for required fields and validates data types.

2. **Interfaces**:

   - Strongly typed interfaces (`Product`, `Service`, `Subscription`) ensure compile-time type safety.

3. **Error Messages**:
   - Validation functions return meaningful error messages to help clients correct invalid requests.

---

## In-Memory Storage

- Items are stored in a simple JavaScript object grouped by type:
  ```typescript
  const items = {
    product: [],
    service: [],
    subscription: [],
  };
  ```
- Utility functions (`getItems`, `addProduct`, `addService`, `addSubscription`) abstract storage operations.

---

## How to Extend

1. **Add New Item Types**:

   - Define a new interface in `types.ts`.
   - Add a corresponding validation function in `validators.ts`.
   - Update the `POST /items` endpoint to handle the new type.

2. **Integrate a Database**:
   - Replace the in-memory storage with a database (e.g., MongoDB, PostgreSQL).
   - Update `storage.ts` to interact with the database.

---

## License

This project is licensed under the MIT License.
