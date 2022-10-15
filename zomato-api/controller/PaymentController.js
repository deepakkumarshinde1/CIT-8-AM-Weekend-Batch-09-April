const Razorpay = require("razorpay");
var crypto = require("crypto");

var instance = new Razorpay({
  key_id: "rzp_test_XD1PAxzXtFU5Ks",
  key_secret: "nmHKWDSWNnw0eiipd5UZI04P",
});
const PaymentController = {
  getOrderId: (request, response) => {
    let { amount } = request.body;
    var options = {
      amount: Number(amount) * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    instance.orders.create(options, function (err, order) {
      if (err) {
        response.status(500).send({ status: false });
      } else {
        response.status(200).send({ status: true, order });
      }
    });
  },
  verifyPayment: (request, response) => {
    let { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      request.body;
    let verifyingData = razorpay_order_id + "|" + razorpay_payment_id;

    var expectedSignature = crypto
      .createHmac("sha256", "nmHKWDSWNnw0eiipd5UZI04P")
      .update(verifyingData.toString())
      .digest("hex");
    console.log("sig received ", razorpay_signature);
    console.log("sig generated ", expectedSignature);

    if (expectedSignature === razorpay_signature) {
      response.status(200).send({ status: true });
    } else {
      response.status(200).send({ status: false });
    }
  },
};

module.exports = PaymentController;
