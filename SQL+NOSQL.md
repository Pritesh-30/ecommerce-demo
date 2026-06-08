# Databases in Docker — A Hands‑On Guide (MySQL &amp; MongoDB)

A practical, copy‑paste friendly guide to running **MySQL** (SQL) and **MongoDB** (NoSQL) as Docker containers. For each database you’ll learn how to:

- Pull the official image
- Run a container (with and without a **mounted volume** for persistent data)
- `exec` **inside** the container and open the database shell
- Run real commands: **create**, **insert (add)**, **read (view)**, **update**, **delete**, and more

> **Conventions**
> - Commands prefixed with `#` are comments.
> - Lines starting with `mysql>` or `test>` represent prompts **inside** the database shell — type only what comes after the prompt.
> - Replace passwords like `secret123` with your own before using anything beyond local testing.

---

# Section 1 — SQL (MySQL)

## 1.1 Pull the MySQL image

```bash
docker pull mysql:8.0
```

Check it downloaded:

```bash
docker images mysql
```

## 1.2 Run a MySQL container

### Basic run (data lives only inside the container)

```bash
docker run -d \
  --name my-mysql \
  -e MYSQL_ROOT_PASSWORD=secret123 \
  -e MYSQL_DATABASE=shop \
  -p 3306:3306 \
  mysql:8.0
```

| Flag                              | Meaning                                                   |
| --------------------------------- | --------------------------------------------------------- |
| `-d`                              | Run detached (in the background)                          |
| `--name my-mysql`                 | Name the container so you can reference it easily         |
| `-e MYSQL_ROOT_PASSWORD=...`      | Sets the root password (**required**)                     |
| `-e MYSQL_DATABASE=shop`          | Creates an initial database called `shop`                 |
| `-p 3306:3306`                    | Maps host port 3306 → container port 3306                 |

Watch it become ready:

```bash
docker logs -f my-mysql
# Wait for: "ready for connections". Press Ctrl+C to stop following.
```

### Run **with a mounted volume** (data survives container removal)

This is the important part for real use — without a volume, deleting the container deletes your data.

**Option A — named volume (recommended, managed by Docker):**

```bash
docker volume create mysql-data

docker run -d \
  --name my-mysql \
  -e MYSQL_ROOT_PASSWORD=secret123 \
  -e MYSQL_DATABASE=shop \
  -p 3306:3306 \
  -v mysql-data:/var/lib/mysql \
  mysql:8.0
```

**Option B — bind mount (a real folder on your machine):**

```bash
# Linux / macOS
docker run -d --name my-mysql \
  -e MYSQL_ROOT_PASSWORD=secret123 \
  -p 3306:3306 \
  -v "$(pwd)/mysql-data:/var/lib/mysql" \
  mysql:8.0
```

```powershell
# Windows PowerShell
docker run -d --name my-mysql `
  -e MYSQL_ROOT_PASSWORD=secret123 `
  -p 3306:3306 `
  -v "${PWD}\mysql-data:/var/lib/mysql" `
  mysql:8.0
```

> MySQL stores all its data under `/var/lib/mysql`. Mounting a volume there is what makes data persistent.

Verify the volume:

```bash
docker volume ls
docker volume inspect mysql-data
```

## 1.3 Get inside the container &amp; open the MySQL shell

**Step 1 — exec into the container’s shell:**

```bash
docker exec -it my-mysql bash
```

You are now *inside* the container. Open the MySQL client:

```bash
mysql -u root -p
# Enter password: secret123
```

**Shortcut** — do both in one command (open the MySQL shell directly):

```bash
docker exec -it my-mysql mysql -u root -psecret123
```

> Note: there is **no space** between `-p` and the password when passed inline.

You should now see the `mysql>` prompt.

## 1.4 SQL commands — full CRUD walkthrough

Everything below is typed at the `mysql>` prompt.

### Create / select a database

```sql
-- See all databases
SHOW DATABASES;

-- Create a new database (if you didn't via env var)
CREATE DATABASE IF NOT EXISTS shop;

-- Switch into it
USE shop;
```

### Create a table

```sql
CREATE TABLE products (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  category    VARCHAR(50),
  price       DECIMAL(10,2) NOT NULL,
  in_stock    BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inspect the table structure
DESCRIBE products;
SHOW TABLES;
```

### Insert (add entries)

```sql
-- Insert a single row
INSERT INTO products (name, category, price)
VALUES ('Harbor Organic Tee', 'apparel', 38.00);

-- Insert multiple rows at once
INSERT INTO products (name, category, price, in_stock) VALUES
  ('Trailline Low Sneaker', 'footwear',   145.00, TRUE),
  ('Meridian Sunglasses',   'accessories', 96.00, TRUE),
  ('Grove Ceramic Mug',     'living',      28.00, FALSE);
```

### Read (view entries)

```sql
-- All rows
SELECT * FROM products;

-- Specific columns
SELECT name, price FROM products;

-- Filtering
SELECT * FROM products WHERE category = 'footwear';
SELECT * FROM products WHERE price > 50;
SELECT * FROM products WHERE in_stock = TRUE;

-- Sorting and limiting
SELECT * FROM products ORDER BY price DESC;
SELECT * FROM products ORDER BY price ASC LIMIT 2;

-- Pattern matching
SELECT * FROM products WHERE name LIKE '%Sneaker%';

-- Aggregations
SELECT COUNT(*)        AS total_products FROM products;
SELECT category, AVG(price) AS avg_price
FROM products
GROUP BY category;
```

### Update entries

```sql
-- Update one row
UPDATE products SET price = 42.00 WHERE name = 'Harbor Organic Tee';

-- Update several rows
UPDATE products SET in_stock = TRUE WHERE category = 'living';

-- Increase all prices by 10%
UPDATE products SET price = price * 1.10;
```

### Delete entries

```sql
-- Delete a specific row
DELETE FROM products WHERE name = 'Grove Ceramic Mug';

-- Delete by condition
DELETE FROM products WHERE in_stock = FALSE;

-- Remove ALL rows but keep the table
TRUNCATE TABLE products;
```

### Other useful operations

```sql
-- Alter a table: add / drop a column
ALTER TABLE products ADD COLUMN rating DECIMAL(2,1) DEFAULT 0;
ALTER TABLE products DROP COLUMN rating;

-- Add an index (faster lookups)
CREATE INDEX idx_category ON products (category);

-- Drop a table / database
DROP TABLE products;
DROP DATABASE shop;

-- Exit the MySQL shell
EXIT;
```

## 1.5 Bonus — run a SQL file from the host

```bash
# Copy a .sql file into the container, then run it
docker cp ./seed.sql my-mysql:/seed.sql
docker exec -it my-mysql bash -c "mysql -u root -psecret123 shop < /seed.sql"
```

## 1.6 Managing the MySQL container

```bash
docker stop my-mysql        # stop
docker start my-mysql       # start again
docker restart my-mysql     # restart
docker rm -f my-mysql       # remove the container (volume data survives)
docker volume rm mysql-data # delete the data volume (irreversible!)
```

---

# Section 2 — NoSQL (MongoDB)

## 2.1 Pull the MongoDB image

```bash
docker pull mongo:7
```

Check it downloaded:

```bash
docker images mongo
```

## 2.2 Run a MongoDB container

### Basic run

```bash
docker run -d \
  --name my-mongo \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=secret123 \
  -p 27017:27017 \
  mongo:7
```

| Flag                                       | Meaning                                  |
| ------------------------------------------ | ---------------------------------------- |
| `-e MONGO_INITDB_ROOT_USERNAME=admin`      | Root username                            |
| `-e MONGO_INITDB_ROOT_PASSWORD=secret123`  | Root password                            |
| `-p 27017:27017`                           | Maps host port 27017 → container 27017   |

Watch it become ready:

```bash
docker logs -f my-mongo
# Wait for: "Waiting for connections". Press Ctrl+C to stop following.
```

### Run **with a mounted volume** (persistent data)

MongoDB stores its data under `/data/db`. Mount a volume there.

**Named volume (recommended):**

```bash
docker volume create mongo-data

docker run -d \
  --name my-mongo \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=secret123 \
  -p 27017:27017 \
  -v mongo-data:/data/db \
  mongo:7
```

**Bind mount (a real folder):**

```bash
# Linux / macOS
docker run -d --name my-mongo \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=secret123 \
  -p 27017:27017 \
  -v "$(pwd)/mongo-data:/data/db" \
  mongo:7
```

```powershell
# Windows PowerShell
docker run -d --name my-mongo `
  -e MONGO_INITDB_ROOT_USERNAME=admin `
  -e MONGO_INITDB_ROOT_PASSWORD=secret123 `
  -p 27017:27017 `
  -v "${PWD}\mongo-data:/data/db" `
  mongo:7
```

Verify the volume:

```bash
docker volume ls
docker volume inspect mongo-data
```

## 2.3 Get inside the container &amp; open the Mongo shell

**Step 1 — exec into the container’s shell:**

```bash
docker exec -it my-mongo bash
```

Open the Mongo shell (`mongosh`) with auth:

```bash
mongosh -u admin -p secret123
```

**Shortcut** — open the Mongo shell directly:

```bash
docker exec -it my-mongo mongosh -u admin -p secret123
```

You should now see the `test>` prompt.

## 2.4 MongoDB commands — full CRUD walkthrough

In MongoDB the hierarchy is: **database → collection → documents** (JSON‑like objects). The equivalents are roughly:

| SQL              | MongoDB             |
| ---------------- | ------------------- |
| database         | database            |
| table            | collection          |
| row              | document            |
| column           | field               |

Everything below is typed at the `mongosh` prompt.

### Create / select a database

```javascript
// Show all databases
show dbs

// Switch to (and lazily create) a database called "shop"
use shop

// A database/collection is created the moment you insert the first document.
```

### Create a collection &amp; insert (add documents)

```javascript
// Insert one document (collection "products" is created automatically)
db.products.insertOne({
  name: "Harbor Organic Tee",
  category: "apparel",
  price: 38.0,
  inStock: true,
  colors: ["bone", "pine", "clay"]
})

// Insert many documents at once
db.products.insertMany([
  { name: "Trailline Low Sneaker", category: "footwear",    price: 145, inStock: true },
  { name: "Meridian Sunglasses",   category: "accessories", price: 96,  inStock: true },
  { name: "Grove Ceramic Mug",     category: "living",      price: 28,  inStock: false }
])

// List all collections
show collections
```

### Read (view documents)

```javascript
// All documents (pretty-printed by default in mongosh)
db.products.find()

// First matching document
db.products.findOne({ category: "footwear" })

// Filtering
db.products.find({ category: "apparel" })
db.products.find({ price: { $gt: 50 } })        // price > 50
db.products.find({ price: { $lte: 96 } })       // price <= 96
db.products.find({ inStock: true })

// Combine conditions (AND)
db.products.find({ category: "footwear", inStock: true })

// OR conditions
db.products.find({ $or: [ { category: "living" }, { price: { $lt: 40 } } ] })

// Match inside an array
db.products.find({ colors: "pine" })

// Projection — choose which fields to return (1 = show, 0 = hide)
db.products.find({}, { name: 1, price: 1, _id: 0 })

// Sorting, limiting, counting
db.products.find().sort({ price: -1 })          // -1 = descending
db.products.find().sort({ price: 1 }).limit(2)
db.products.countDocuments()
db.products.countDocuments({ inStock: true })
```

### Update documents

```javascript
// Update one document — $set changes specific fields
db.products.updateOne(
  { name: "Harbor Organic Tee" },
  { $set: { price: 42.0 } }
)

// Update many documents
db.products.updateMany(
  { category: "living" },
  { $set: { inStock: true } }
)

// Increase every price by 5 using $inc
db.products.updateMany({}, { $inc: { price: 5 } })

// Add a value to an array field
db.products.updateOne(
  { name: "Harbor Organic Tee" },
  { $push: { colors: "moss" } }
)

// Upsert — update if it exists, otherwise insert it
db.products.updateOne(
  { name: "Field Merino Sweater" },
  { $set: { category: "apparel", price: 124, inStock: true } },
  { upsert: true }
)
```

### Delete documents

```javascript
// Delete one document
db.products.deleteOne({ name: "Grove Ceramic Mug" })

// Delete many by condition
db.products.deleteMany({ inStock: false })

// Delete ALL documents in the collection (keeps the collection)
db.products.deleteMany({})
```

### Other useful operations

```javascript
// Create an index for faster queries on category
db.products.createIndex({ category: 1 })

// List indexes
db.products.getIndexes()

// Aggregation — average price per category (like GROUP BY)
db.products.aggregate([
  { $group: { _id: "$category", avgPrice: { $avg: "$price" }, count: { $sum: 1 } } },
  { $sort: { avgPrice: -1 } }
])

// Drop a collection
db.products.drop()

// Drop the whole database (run while "use shop" is active)
db.dropDatabase()

// Exit the Mongo shell
exit
```

## 2.5 Bonus — import / export data from the host

```bash
# Export a collection to a JSON file (run on the host)
docker exec my-mongo mongoexport \
  -u admin -p secret123 --authenticationDatabase admin \
  --db shop --collection products --out /tmp/products.json
docker cp my-mongo:/tmp/products.json ./products.json

# Import a JSON file into a collection
docker cp ./products.json my-mongo:/tmp/products.json
docker exec my-mongo mongoimport \
  -u admin -p secret123 --authenticationDatabase admin \
  --db shop --collection products --file /tmp/products.json
```

## 2.6 Managing the MongoDB container

```bash
docker stop my-mongo        # stop
docker start my-mongo       # start again
docker restart my-mongo     # restart
docker rm -f my-mongo       # remove the container (volume data survives)
docker volume rm mongo-data # delete the data volume (irreversible!)
```

---

## Quick reference — SQL vs NoSQL side by side

| Operation        | MySQL (SQL)                                   | MongoDB (NoSQL)                                  |
| ---------------- | --------------------------------------------- | ------------------------------------------------ |
| Create container | `docker run ... mysql:8.0`                    | `docker run ... mongo:7`                         |
| Data directory   | `/var/lib/mysql`                              | `/data/db`                                       |
| Open shell       | `docker exec -it my-mysql mysql -u root -p`   | `docker exec -it my-mongo mongosh -u admin -p`   |
| Create container store | `CREATE DATABASE shop;`                 | `use shop`                                       |
| Create entry     | `INSERT INTO ...`                             | `db.coll.insertOne({...})`                       |
| Read entries     | `SELECT * FROM ...`                           | `db.coll.find({...})`                            |
| Update entries   | `UPDATE ... SET ...`                          | `db.coll.updateOne({...}, { $set: {...} })`      |
| Delete entries   | `DELETE FROM ... WHERE ...`                   | `db.coll.deleteOne({...})`                       |
| Exit shell       | `EXIT;`                                        | `exit`                                            |

> **Key takeaway:** Always mount a **volume** (`-v`) to the data directory so your data persists even if the container is removed or recreated.
