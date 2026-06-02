import { useEffect, useState } from "react";
import API from "../services/api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get(
          "/orders/myorders",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
  <div className="container mt-4">
    <h1 className="mb-4">
      My Orders
    </h1>

    {orders.length === 0 ? (
      <div className="alert alert-warning">
        No Orders Found
      </div>
    ) : (
      <div className="table-responsive">
        <table className="table table-bordered table-hover shadow">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>Total Amount</th>
              <th>Items</th>
              <th>Payment</th>
              <th>Delivery</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  {order._id}
                </td>

                <td>
                  ₹{order.totalPrice}
                </td>

                <td>
                  {order.orderItems.length}
                </td>

                <td>
                  {order.isPaid ? (
                    <span className="badge bg-success">
                      Paid
                    </span>
                  ) : (
                    <span className="badge bg-danger">
                      Pending
                    </span>
                  )}
                </td>

                <td>
                  {order.isDelivered ? (
                    <span className="badge bg-success">
                      Delivered
                    </span>
                  ) : (
                    <span className="badge bg-warning text-dark">
                      Processing
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    )}
  </div>
);
};

export default MyOrders;