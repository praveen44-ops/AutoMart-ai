import API from "../services/api";

const Payment = () => {

  const payNow = async () => {
    try {
const userInfo = JSON.parse(
  localStorage.getItem("userInfo")
);

const { data: order } = await API.post(
  "/payment",
  {
    amount: 500,
  },
  {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
);

      const options = {
        key: "rzp_test_SvrMXqF2vOvBTn",

        amount: order.amount,

        currency: order.currency,

        name: "AutoMart",

        description: "Car Accessories",

        order_id: order.id,

        handler: async function (response) {

          const verify = await API.post(
            "/payment/verify",
            response,
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            }
        );

        const orderId =
          localStorage.getItem("currentOrderId");

        await API.put(
          `/orders/${orderId}/pay`,
          {},
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        localStorage.removeItem(
          "currentOrderId"
        );

        alert(
          "Payment Verified & Order Paid"
        );
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.open();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Payment</h1>

      <button onClick={payNow}>
        Pay ₹500
      </button>
    </div>
  );
};

export default Payment;