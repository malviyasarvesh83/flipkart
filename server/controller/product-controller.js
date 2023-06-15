const TopProduct = require('../models/topProducts');
const Product = require('../models/products');

exports.getTopProduct = async (req, res) => {
    try {
        const response = await TopProduct.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: 'Error While calling Get Top Product Api' });
    }
}

exports.getMainProduct = async (req, res) => {
    try {
        const response = await Product.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: 'Error while calling Get Main Product Api' });
    }
}

exports.getProductDetails = async (req, res) => {
    try {
        const id=req.params.id;
        const response = await Product.findByPk(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: 'Error While calling Get Product Details Api' });
    }
}