/**
 * @swagger
 * components:
 *  schemas:  
 *      Cart:
 *          type: object
 *          required: 
 *              -   productId
 *              -   email
 *              -   name
 *              -   price
 *              -   image
 *              -   quantity
 *          properties:
 *              productId:
 *                  type: number
 *                  description: The id of the cart
 *              email:
 *                  type: string
 *                  description: The email of the cart
 *              name:
 *                  type: string
 *                  description: The name of the cart
 *              price:
 *                  type: number
 *                  description: The price of the cart
 *              image:
 *                  type: string
 *                  description: The image of the cart
 *              quantity:
 *                  type: number
 *                  description: The quantity of the cart
 *          example:
 *              productId: "65e03256dab7cfcee0a35f84"
 *              email: "niti031"
 *              name: "Macbook Pro"
 *              price: 200
 *              image: "http://example.com/macbook.jpg"
 *              quantity: 2
 * tags:
 *  name: Cart Item
 *  description: The product manging API
 *  
*/
const express = require("express");
const CartModel = require("../models/Cart.model");
const router = express.Router();

//get all
/**
 * @swagger
 * /carts:
 *   get:
 *     summary: Get All
 *     tags: [Cart Item]
 *     responses:
 *       200:
 *         description: A list of carts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Some error.
 *  
*/
router.get("/", async (req, res) => {
    try {
        const carts = await CartModel.find()
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ error: "failed to Get All Cart" });
    }
})

//get by email
/**
 * @swagger
 * /carts/{email}:
 *   get:
 *     summary: Get carts by email
 *     tags: [Cart Item]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Numeric Email of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of carts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Some error.
*/
router.get('/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const carts = await CartModel.find({ email });
        if (carts.length === 0) {
            res.status(404).json("Cart not found!");
            return;
        }
        res.json(carts);
    } catch (error) {
        if (error.kind === "not_found!") {
            res.status(400).json("Cart not found!")
        } else {
            res.status(500).json({ error: "Failed to get Cart data!" });
        }
    }
});

//createCarts
/**
 * @swagger
 * /carts:
 *   post:
 *     summary: Create Carts
 *     tags: [Cart Item]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Cart'
 *     responses:
 *       201:
 *         description: A list of carts.
 *         content:
 *           application/json:
 *             schema:
 *                  $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Some error.
*/
router.post('/', async (req, res) => {
    const cart = req.body;
    try {
        const existingCart = await CartModel.findOne({ productId: cart.productId, email: cart.email });
        if (existingCart) {
            //existing
            existingCart.quantity += cart.quantity;
            await existingCart.save();
            return res.status(200).json(existingCart);
        }
        //new Create
        const newCart = new CartModel(cart);
        await newCart.save();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: "Failed to create Cart" });
    }
});

//updateProducts
/**
 * @swagger
 * /carts/{id}:
 *   put:
 *     summary: Update carts
 *     tags: [Cart Item]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Cart'
 *     responses:
 *       201:
 *         description: A list of carts.
 *         content:
 *           application/json:
 *             schema:
 *                  $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Some error.
*/
router.put('/:id', async (req, res) => {
    try {
        const carts = await CartModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(carts);
    } catch (error) {
        if (error.kind === "not_found!") {
            res.status(400).json("Cart not found!")
        } else {
            res.status(500).json({ error: "Failed to Update Cart data!" });
        }
    }
});

//delete
/**
 * @swagger
 * /carts/{id}:
 *   delete:
 *     summary: Delete Carts
 *     tags: [Cart Item]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of Carts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                      type: string
 *                      example: Cart ID 65e03256dab7cfcee0a35f82 is Delete Successfully
 *                       
 *       500:
 *         description: Some error.
*/
router.delete('/:id', async (req, res) => {
    try {
        const carts = await CartModel.findByIdAndDelete(req.params.id);
        if (carts) {
            res.status(200).json({ message: "Cart ID " + req.params.id + " is Delete Successfully" });
        }
    } catch (error) {
        if (error.kind === "not_found!") {
            res.status(400).json("Cart not found!")
        } else {
            res.status(500).json({ error: "Failed to Delete Cart data!" });
        }
    }
});

//deleteAll
/**
 * @swagger
 * /carts/clear/{email}:
 *   delete:
 *     summary: Delete All Carts
 *     tags: [Cart Item]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Numeric email of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of Carts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                      type: string
 *                      example: Cart ID 65e03256dab7cfcee0a35f82 is Delete Successfully
 *                       
 *       500:
 *         description: Some error.
*/
router.delete('/clear/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const carts = await CartModel.deleteMany({ email });
        if (carts.deletedCount >= 0) {
            return res.status(200).json({ message: "Deleted successfully" });
        }
    } catch (error) {
        if (error.kind === "not_found!") {
            res.status(400).json("Cart not found!")
        } else {
            res.status(500).json({ error: "Failed to Delete Cart data!" });
        }
    }
});

module.exports = router;