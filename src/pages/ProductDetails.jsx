import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);

        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCartHandler = async () => {
    if (!userInfo) {
      alert("Please login first");
      return;
    }

    try {
      await API.post(
        "/cart",
        {
          product: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      alert("Product Added To Cart");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed To Add Cart"
      );
    }
  };

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <img
        src={product.image}
        alt={product.name}
        width="300"
      />

      <h1>{product.name}</h1>

      <h3>₹{product.price}</h3>

      <p>{product.description}</p>

      <p>Category: {product.category}</p>

      <p>Stock: {product.stock}</p>

      <p>Rating: ⭐ {product.rating}</p>

      <p>Reviews: {product.numReviews}</p>

      <button onClick={addToCartHandler}>
        Add To Cart
      </button>
    </div>
  );
};

export default ProductDetails;