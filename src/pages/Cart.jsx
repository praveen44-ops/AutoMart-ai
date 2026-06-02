import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const fetchCart = async () => {
    try {
      const { data } = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      setCartItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeHandler = async (id) => {
    try {
      await API.delete(`/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      alert("Item Removed");

      fetchCart();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed To Remove Item"
      );
    }
  };

  const totalPrice = cartItems.reduce(
  (acc, item) =>
    acc +
    (item.product?.price || 0) *
      item.quantity,
  0
);

 return (
  <div className="container mt-4">
    <h1 className="mb-4">My Cart</h1>

    {cartItems.length === 0 ? (
      <div className="alert alert-warning">
        Cart is Empty
      </div>
    ) : (
      <>
        <table className="table table-bordered table-hover shadow">
          <thead className="table-dark">
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((item) => (
               <tr key={item._id}>
                 <td>
                   {item.product?.name ||
                      "Product Removed"}
                 </td>

                 <td>
                   ₹{item.product?.price || 0}
                 </td>

                 <td>
                   {item.quantity}
                 </td>

                 <td>
                   ₹
                   {(item.product?.price || 0) *
                     item.quantity}
                 </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      removeHandler(item._id)
                    }
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="card shadow p-3 mt-4">
          <h3>
            Grand Total: ₹{totalPrice}
          </h3>

          <button
            className="btn btn-success mt-2"
            onClick={() =>
              navigate("/checkout")
            }
          >
            Proceed To Checkout
          </button>
        </div>
      </>
    )}
  </div>
);
};

export default Cart;