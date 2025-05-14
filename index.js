const sequelize= require("./config/database");
const express= require("express");
const app= express();
const bodyParser=require("body-parser");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes=require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const publicRoutes    = require("./routes/publicRoutes");
const addressRoutes = require("./routes/addressRoutes");
const orderRoutes = require("./routes/orderRoutes");
app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  require("./controllers/webhookController").handleStripeWebhook
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(categoryRoutes);
app.use(authRoutes);
app.use(productRoutes);
app.use(publicRoutes);
const cartRoutes = require("./routes/cartRoutes");
app.use(cartRoutes);
app.use(addressRoutes);
app.use(orderRoutes);
app.use((req, res) => res.status(404).json({ error: "Not found" }));

const PORT = process.env.PORT || 8000;
sequelize.sync({ alter: true })  
  .then(() => {
    app.listen(PORT, () => console.log(`E-com API running on ${PORT}`))
  })
  .catch(console.error);
