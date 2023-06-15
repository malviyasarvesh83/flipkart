const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./utils/database');
const userRoutes = require('./router/userRoutes');
const productRoutes = require('./router/productRoutes');
const cartRoutes = require('./router/cartRoutes');
const purchaseRoutes = require('./router/purchaseRoutes');
const Cart = require('./models/cart');
const User = require('./models/user');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is Successfully Running On Port: http://localhost:${port}`);
    database();
})

// Database Connection

const database = async () => {
    try {
        await sequelize.sync();
        console.log('Database Connected Successfully..!');
    } catch (error) {
        console.log('Error While Connecting Database..!',error);
    }
}

// Routes
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);
app.use('/purchase', purchaseRoutes);

User.hasMany(Cart);
Cart.belongsTo(User);