import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({});

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo") || "null"
  );

  const fetchStats = async () => {
  try {
    console.log("TOKEN:", userInfo.token);

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    console.log("CONFIG:", config);

    const { data } = await API.get(
      "/admin/stats",
      config
    );

    setStats(data);
  } catch (error) {
    console.log(error);
  }
};

const fetchProducts = async () => {
  try {
    const { data } = await API.get("/products");
    setProducts(data.products || data);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchProducts();
  fetchStats();
}, []);


  const deleteHandler = async (id) => {
    if (
      !window.confirm(
        "Delete this product?"
      )
    )
      return;

    try {
      await API.delete(
        `/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      alert("Product Deleted");

      fetchProducts();
      fetchStats();

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Delete Failed"
      );
    }
  };

  return (
  <div className="container mt-4">
    <h1 className="text-center mb-4">
      Admin Dashboard
    </h1>

    <div className="row mb-4">

      <div className="col-md-3">
        <div className="card text-center bg-primary text-white shadow">
          <div className="card-body">
            <h5>Total Users</h5>
            <h2>
              {stats.totalUsers || 0}
            </h2>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card text-center bg-success text-white shadow">
          <div className="card-body">
            <h5>Total Products</h5>
            <h2>
              {stats.totalProducts || 0}
            </h2>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card text-center bg-warning text-dark shadow">
          <div className="card-body">
            <h5>Total Orders</h5>
            <h2>
              {stats.totalOrders || 0}
            </h2>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card text-center bg-danger text-white shadow">
          <div className="card-body">
            <h5>Revenue</h5>
            <h2>
              ₹{stats.totalRevenue || 0}
            </h2>
          </div>
        </div>
      </div>

    </div>

    <div className="mb-4">

      <Link to="/admin/add-product">
        <button className="btn btn-success me-2">
          Add Product
        </button>
      </Link>

      <Link to="/admin/orders">
        <button className="btn btn-primary">
          View Orders
        </button>
      </Link>

    </div>

    <h2 className="mb-3">
      Products
    </h2>

    <div className="row">

      {products.map((product) => (
        <div
          key={product._id}
          className="col-md-4 col-lg-3 mb-4"
        >
          <div className="card h-100 shadow">

            <img
              src={product.image}
              alt={product.name}
              className="card-img-top"
              style={{
                height: "200px",
                objectFit: "cover",
              }}
            />

            <div className="card-body">

              <h5 className="card-title">
                {product.name}
              </h5>

              <p>
                <strong>
                  ₹{product.price}
                </strong>
              </p>

              <p>
                Stock:
                {" "}
                {product.stock}
              </p>

              <Link
                to={`/admin/product/${product._id}/edit`}
              >
                <button className="btn btn-warning me-2">
                  Edit
                </button>
              </Link>

              <button
                className="btn btn-danger"
                onClick={() =>
                  deleteHandler(
                    product._id
                  )
                }
              >
                Delete
              </button>

            </div>

          </div>
        </div>
      ))}

    </div>
  </div>
);
};

export default AdminDashboard;