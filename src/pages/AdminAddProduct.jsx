import { useState } from "react";
import API from "../services/api";

const AdminAddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const uploadFileHandler = async (e) => {
  const file = e.target.files[0];

  const formData = new FormData();

  formData.append("image", file);

  try {
    setUploading(true);

    const { data } = await API.post(
      "/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    setImage(data.imageUrl);

    setUploading(false);

    alert("Image Uploaded");

  } catch (error) {
    setUploading(false);

    alert("Image Upload Failed");
  }
};

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/products",
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

      alert("Product Added");

      setName("");
      setPrice("");
      setDescription("");
      setImage("");
      setCategory("");
      setStock("");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed To Add Product"
      );
    }
  };

  return (
    <div>
      <h1>Add Product</h1>

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
  readOnly
/>

<br /><br />

<input
  type="file"
  onChange={uploadFileHandler}
/>

{uploading && (
  <p>Uploading...</p>
)}

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
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;