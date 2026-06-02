import { Link } from "react-router-dom";

const Navbar = () => {
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link
          className="navbar-brand fw-bold"
          to="/"
        >
          🚗 AutoMart
        </Link>

        <div className="navbar-nav ms-auto align-items-center">

          <Link
            className="nav-link text-white"
            to="/"
          >
            Home
          </Link>

          {userInfo ? (
            <>
              <Link
                className="nav-link text-white"
                to="/cart"
              >
                Cart
              </Link>

              <Link
                className="nav-link text-white"
                to="/myorders"
              >
                My Orders
              </Link>

              <Link
                className="nav-link text-white"
                to="/admin"
              >
                Admin
              </Link>

              <span className="text-white mx-3">
                Welcome, {userInfo.name}
              </span>

              <button
                className="btn btn-danger btn-sm"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="nav-link text-white"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="nav-link text-white"
                to="/register"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;