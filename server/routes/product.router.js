/**
 * @swagger
 * components:
 *  schemas:  
 *      Product:
 *          type: object
 *          required: 
 *              -   name
 *              -   price
 *              -   description
 *              -   image
 *              -   category
 *          properties:
 *              name:
 *                  type: string
 *                  description: The name of the product
 *              price:
 *                  type: number
 *                  description: The price of the product
 *              description:
 *                  type: string
 *                  description: The description of the product
 *              image:
 *                  type: string
 *                  description: The image of the product
 *              category:
 *                  type: string
 *                  description: The category of the product
 *          example:
 *              name: "Macbook Pro"
 *              price: 200000
 *              description: "A great laptop"
 *              image: "http://example.com/macbook.jpg"
 *              category: "Electronics"
 * tags:
 *  name: Products
 *  description: The product manging API
 *  
*/
const express = require("express");
const router = express.Router();
const ProductModel = require("../models/Product.model");

//get all
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get All
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some error.
 *  
*/
router.get("/", async (req, res) => {
    try {
        const products = await ProductModel.find()
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "failed to Get All Product" });
    }
})

//get by id
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get Product by Id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some error.
*/
router.get('/:id', async (req, res) => {
    try {
        const products = await ProductModel.findById(req.params.id);
        res.json(products);
    } catch (error) {
        if (error.kind === "not_found!") {
            res.status(400).json("Product not found!")
        } else {
            res.status(500).json({ error: "Failed to get Product data!" });
        }
    }
});

//createProducts
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create Products
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *                  $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some error.
*/
router.post('/', async (req, res) => {
    try {
        const product = await ProductModel.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: "Failed to create product" });
    }
});


//updateProducts
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update Products
 *     tags: [Products]
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
 *                  $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *                  $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some error.
*/
router.put('/:id', async (req, res) => {
    try {
        const updateProducts = await ProductModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(updateProducts);
    } catch (error) {
        if (error.kind === "not_found!") {
            res.status(400).json("Product not found!")
        } else {
            res.status(500).json({ error: "Failed to Update Product data!" });
        }
    }
});

//delete
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete Products
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                      type: string
 *                      example: Product ID 65e03256dab7cfcee0a35f82 is Delete Successfully
 *                       
 *       500:
 *         description: Some error.
*/
router.delete('/:id', async (req, res) => {
    try {
        const products = await ProductModel.findByIdAndDelete(req.params.id);
        if (products) {
            res.status(200).json({ message: "Product ID " + req.params.id + " is Delete Successfully" });
        }
    } catch (error) {
        if (error.kind === "not_found!") {
            res.status(400).json("Product not found!")
        } else {
            res.status(500).json({ error: "Failed to Delete Product data!" });
        }
    }
});

module.exports = router;