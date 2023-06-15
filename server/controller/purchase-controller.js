const RazorPay = require('razorpay');

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

exports.placeOrder = async (req, res) => {
  try {
    const totalAmount = req.header('totalAmount');
    const rzp = new RazorPay({
      key_id: keyId,
      key_secret: keySecret,
    });
    const amount = totalAmount * 100;

    rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
    //   await req.user.createOrder({ orderid: order.id, status: "PENDING" });
      return res.status(201).json({ order, key_id: rzp.key_id });
    });
  } catch (error) {
    console.log(error);
    res
      .status(403)
      .json({ message: "Something went Wrong", error: error.message });
  }
};