import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const AdminEditProduct = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await API.get(
        `/products/${id}`
      );

      setName(data.name);
      setPrice(data.price);
      setDescription(data.description);
      setImage(data.image);
      setCategory(data.category);
      setStock(data.stock);
    };
  
    fetchProduct();
  }, [id]);

  const submitHandler = async (e) => {
  e.preventDefault();

  try {
    await API.put(
      `/products/${id}`,
      {
        name,
        price,
        description,
        image,
        category,
        stock,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    alert("Product Updated");

  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Update Failed"
    );
  }
};


return (
  <div>
    <h1>Edit Product</h1>

    <form onSubmit={submitHandler}>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <br /><br />

      <input
        placeholder="Price"
        value={price}
        onChange={(e) =>
          setPrice(e.target.value)
        }
      />

      <br /><br />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <br /><br />

      <input
        placeholder="Image URL"
        value={image}
        onChange={(e) =>
          setImage(e.target.value)
        }
      />

      <br /><br />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      />

      <br /><br />

      <input
        placeholder="Stock"
        value={stock}
        onChange={(e) =>
          setStock(e.target.value)
        }
      />

      <br /><br />

      <button type="submit">
        Update Product
      </button>
    </form>
  </div>
);
};

export default AdminEditProduct;