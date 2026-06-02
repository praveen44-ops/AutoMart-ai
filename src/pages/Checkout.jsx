import { useState } from "react";
import API from "../services/api";

const Checkout = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const placeOrderHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post(
        "/orders",
        {
          orderItems: [
            {
              product: "6a071f06e92cb87fc97a8827",
              quantity: 1,
            },
          ],
          shippingAddress: {
            address,
            city,
            postalCode,
            country,
          },
          totalPrice: 3500,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      localStorage.setItem(
        "currentOrderId",
        data._id
      );

      alert("Order Placed");

      window.location.href = "/payment";
    } catch (error) {
         console.log("FULL ERROR:", error);
        console.log("RESPONSE:", error.response?.data);

        alert(
          error.response?.data?.message ||
          "Order Failed"
        );
      }
    };
  return (
    <div>
      <h1>Checkout</h1>

      <form onSubmit={placeOrderHandler}>
        <input
          placeholder="Address"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
        />

        <br /><br />

        <input
          placeholder="City"
          value={city}
          onChange={(e) =>
            setCity(e.target.value)
          }
        />

        <br /><br />

        <input
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) =>
            setPostalCode(e.target.value)
          }
        />

        <br /><br />

        <input
          placeholder="Country"
          value={country}
          onChange={(e) =>
            setCountry(e.target.value)
          }
        />

        <br /><br />

        <button type="submit">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;