import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get(
        `/products?keyword=${keyword}&category=${category}&page=${page}`
      );

      setProducts(data.products);
      setPages(data.pages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [keyword, category, page]);

return (
  <div className="container mt-4">
    <h1 className="text-center mb-4">
      AutoMart Products
    </h1>

    <div className="row mb-4">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <div className="col-md-3">
        <select
          className="form-select"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <option value="">
            All Categories
          </option>

          <option value="Accessories">
            Accessories
          </option>

          <option value="Interior">
            Interior
          </option>

          <option value="Exterior">
            Exterior
          </option>

          <option value="Electronics">
            Electronics
          </option>
        </select>
      </div>
    </div>

    {products.length === 0 ? (
      <h3 className="text-center">
        No Products Found
      </h3>
    ) : (
      <div className="row">
        {products.map((product) => (
          <div
            key={product._id}
            className="col-md-4 col-lg-3 mb-4"
          >
            <div className="card h-100 shadow-sm">
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

                <p className="card-text">
                  ₹{product.price}
                </p>

                <p className="card-text">
                  {product.category}
                </p>

                <p className="card-text">
                  ⭐ {product.rating}
                </p>

                <Link
                  to={`/product/${product._id}`}
                  className="btn btn-primary w-100"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

    <div className="text-center mt-4">
      <button
        className="btn btn-secondary me-2"
        disabled={page === 1}
        onClick={() =>
          setPage(page - 1)
        }
      >
        Previous
      </button>

      {[...Array(pages).keys()].map(
        (x) => (
          <button
            key={x + 1}
            className={
              page === x + 1
                ? "btn btn-primary mx-1"
                : "btn btn-outline-primary mx-1"
            }
            onClick={() =>
              setPage(x + 1)
            }
          >
            {x + 1}
          </button>
        )
      )}

      <button
        className="btn btn-secondary ms-2"
        disabled={page === pages}
        onClick={() =>
          setPage(page + 1)
        }
      >
        Next
      </button>
    </div>
  </div>
);
}

export default Home;