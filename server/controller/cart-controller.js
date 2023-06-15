const Cart = require('../models/cart');
const User = require('../models/user');

exports.getCart = async (req, res) => {
    try {
        const response = await Cart.findAll({ where: { userId: req.user.id } });
        console.log('My User=',req.user);
        res.status(200).json({response,name:req.user.firstName,address:req.user.address1,address1:req.user.address2});
    } catch (error) {
        res.status(400).json({ error: 'Error while calling Get Cart Api' });
    }
}

exports.addToCart = async (req, res) => {
    try {
        const { url, detailUrl, shortTitle, longTitle, mrp, cost, discount, quantity, description, discount1, tagline } = req.body;
        const userId = req.user.id;
        const response = await Cart.create({
            url: url,
            detailUrl: detailUrl,
            shortTitle: shortTitle,
            longTitle: longTitle,
            mrp: mrp,
            cost: cost,
            discount: discount,
            quantity: quantity,
            description: description,
            discount1: discount1,
            tagline: tagline,
            userId: userId
        });
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ error: 'Error while calling Add To Cart Api' });
    }
}

exports.deleteFromCart = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Cart.findByPk(id);
        await response.destroy({where:{userId:req.user.id}});
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: 'Error while calling Delete From Cart' });
    }
}

exports.updateAddress = async (req, res) => {
    try {
        const { address1, address2 } = req.body;
        const user = await User.findOne({ where: { email: req.user.email } });
        const response = await user.update({ address1: address1, address2: address2 });
        res.status(201).json({ response: response, message: 'Address Updated Successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error while Updating Address' });
    }
}