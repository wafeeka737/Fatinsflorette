const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: "fatins_florette"
});

db.connect((err) => {
    if (err) {
        console.error("Connection Failed:", err);
    } else {
        console.log("Database Connected Successfully");
    }
});

app.get("/", (req, res) => {
    res.send("Server is Working!");
});

// product link (& catalog)
app.get("/products/:id", (req, res) => {
    
    const productID = req.params.id;

    const sql = `
        SELECT * 
        FROM product 
        WHERE Product_ID = ?`;

    db.query(sql, [productId], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });

});

// subscription link
app.get("/subscriptions", (req, res) => {

    const {
        Customer_ID,
        Category_ID,
        Frequency,
        Duration,
        Start_Date,
        Notes,
        Subscription_Status,
        Total_Price
    } = req.body;

    const sql = `
        INSERT INTO subscription (
            Customer_ID, 
            Category_ID, 
            Frequency, 
            Duration, 
            Start_Date, 
            Notes, 
            Subscription_Status, 
            Total_Price
        )     
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
     db.query(
        sql, 
        [
            Customer_ID, 
            Category_ID, 
            Frequency, 
            Duration, 
            Start_Date, 
            Notes, 
            Subscription_Status, 
            Total_Price
        ], 
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({message: "Subscription saved successfully"});
        }
    );
});

// bouquet link
app.get("/custombouquets", (req, res) => {

     const {
        Customer_ID,
        wrapper_Color,
        Ribbon_Type,
        Ribbon_Color,
        Card_Type,
        Total_Price,
        Created_Date
    } = req.body;

    const bouquetSql = `
        INSERT INTO custom_bouquet (
            Customer_ID,
            wrapper_Color,
            Ribbon_Type,
            Ribbon_Color,
            Card_Type,
            Total_Price,
            Created_Date
        )     
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`;
    
     db.query(
        bouquetSql, 
        [
            Customer_ID, 
            wrapper_Color, 
            Ribbon_Type, 
            Ribbon_Color, 
            Card_Type, 
            Total_Price, 
            Created_Date
        ], 
        (err, bouquetResult) => {

            if (err) {
                return res.status(500).json(err);
            }

            const customBouquetID = bouquetResult.insertId;

            // saving flowers in Custom Bouquet Item

            if (!flowers || flowers.length === 0) {
                return res.json({
                    message: "Bouquet Saved Successfully",
                });
            }

            let completed = 0;

            flowers.forEach((flower) => {
                const flowerSql = `
                    INSERT INTO custom_bouquet_item 
                    (
                    CustomBouquet_ID,
                    Product_ID,
                    Quantity
                    )     
                    VALUES (?, ?, ?)`;
                
                db.query(
                    flowerSql,
                    [
                        customBouquetId,
                        flower.Product_ID,
                        flower.Quantity
                    ],
                    (err) => {
                        
                        if (err) {
                            return res.status(500).json(err);
                        }

                        completed++;

                        if (completed === flowers.length) {
                            res.json({ message: "Custom bouquet Saved Successfully" });
                        }
                    }
                );
            });
        }
    );
});   

// cart link
app.get("/cart", (req, res) => {

    const {
        Customer_ID,
        Product_ID,
        Quantity
    } = req.body;

    const cartSql = `
        INSERT INTO cart (
            Customer_ID,
            Created_Date
        )     
        VALUES (?, NOW())`;
        
    db.query(
        cartSql, 
        [
            Customer_ID
        ], 
        (err, cartResult) => {
            if (err) {
                return res.status(500).json(err);
            }
            
            const cartId = cartResult.insertId;

            const cartItemSql = `
                INSERT INTO cart_item (
                    Cart_ID,
                    Product_ID,
                    Quantity
                )     
                VALUES (?, ?, ?)`;
            
            db.query(
                itemSql,
                [
                    cartId,
                    Product_ID,
                    Quantity
                ],

                (err) => {
                    if (err) {
                        return res.status(500).json(err);
                    }

                    res.json({ message: "Add to cart Successfully" });
                }
            );
        }
    );
});

// checkout link (order & order item)
app.post("/orders", (req, res) => {

    const {
        Customer_ID,
        Payment_Method,
        Delivery_Method,
        Shipping_Fee,
        Subtotal,
        Total_Amount,
        Order_Status
    } = req.body;

    const orderSql = `
        INSERT INTO orders (
            Customer_ID,
            Order_Date,
            Payment_Method,
            Delivery_Method,
            Shipping_Fee,
            Subtotal,
            Total_Amount,
            Order_Status
        )     
        VALUES (?, NOW(), ?, ?, ?, ?, ?, ?)`;

    db.query(
        orderSql,
        [
            Customer_ID,
            Order_Date,
            Payment_Method,
            Delivery_Method,
            Shipping_Fee,
            Subtotal,
            Total_Amount,
            Order_Status
        ],
        (err, orderResult) => {
            if (err) {
                return res.status(500).json(err);
            }

            const orderId = orderResult.insertId;

            // Insert order items here if needed

            if (!orderItems || orderItems.length === 0) {
                return res.json({
                    message: "Order placed successfully",
                });
            }

            let completed = 0;

            orderItems.forEach((item) => {
                const orderItemSql = `
                    INSERT INTO order_item (
                        Order_ID,
                        Product_ID,
                        Quantity,
                        Price,
                        Subtotal
                    )     
                    VALUES (?, ?, ?, ?, ?)`;
            });

            db.query(
                orderItemSql,
                [
                    orderId,
                    item.Product_ID,
                    item.Quantity,
                    item.Price,
                    item.Subtotal
                ],
                (err) => {
                    if (err) {
                        return res.status(500).json(err);
                    }

                    completed++;
                    if (completed === orderItems.length) {
                        res.json({ message: "Order placed successfully" });
                    }
                }
            );
        }
    );
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});