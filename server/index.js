const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const productRouter = require("./routes/product.router")
const cartRouter = require("./routes/cart.router")
const userRouter = require("./routes/user.router")
const jwt = require("jsonwebtoken")
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = {
  openapi: '3.0.1',
  info: {
    title: 'RESTful API for SE Shop',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Niti Surakongka',
      url: 'https://github.com/031-niti',
    },
  },
  externalDocs: {
    description: "Download Swagger.josn",
    url: "/swagger.json",
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Development server',
    },
  ],
};
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);

const PORT = 4000;
const app = express();

// .env
require('dotenv').config()
const URL = process.env.MONGODB_CONNECT_URL
const CLIENT_URL = process.env.CLIENT_URL

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
// No need for useNewUrlParser anymore
mongoose.connect(URL, {
})
  .then(() => {
    console.log("Successfully connected to MongoDB!!");
  })
  .catch((error) => {
    console.log("Connection error", error)
    process.exit();
  })

//middleware
app.use(cors({ credentials: true, origin: CLIENT_URL }));
app.use(express.json());
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/swagger.json', (req, res) => {
  res.header("Content-Type", "application/josn");
  res.send(swaggerSpec);
})

app.get('/', (req, res) => {
  res.send('<h1>Hello Wellcome To MERN SE SHOP</h1>')
});

//router
app.use("/products", productRouter)
app.use("/carts", cartRouter)
app.use("/users", userRouter)

app.post("/jwt", async (req, res) => {
  // create and return JWT
  const user = req.body;
  const token = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{
    expiresIn :"1h"
})
res.send({ token })
})

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});

