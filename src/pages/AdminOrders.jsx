import { useEffect, useState } from "react";
import API from "../services/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await API.get(
        "/orders/all",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setOrders(data);
    };

    fetchOrders();
  }, []);

const deliverHandler = async (id) => {
  try {
    await API.put(
      `/orders/${id}/deliver`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    alert("Order Delivered");

    window.location.reload();

  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Failed"
    );
  }
};

  return (
  <div className="container mt-4">
    <h1 className="mb-4">
      All Orders
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
              <th>Customer</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Delivery</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>

                <td>
                  {order._id}
                </td>

                <td>
                  {order.user?.name}
                </td>

                <td>
                  {order.user?.email}
                </td>

                <td>
                  ₹{order.totalPrice}
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

                <td>
                  {!order.isDelivered ? (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() =>
                        deliverHandler(order._id)
                      }
                    >
                      Mark Delivered
                    </button>
                  ) : (
                    <button
                      className="btn btn-success btn-sm"
                      disabled
                    >
                      Delivered
                    </button>
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

export default AdminOrders;