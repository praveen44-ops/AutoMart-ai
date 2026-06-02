import { useState } from "react";
import API from "../services/api";

const Register = () => {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } =
        await API.post(
          "/auth/register",
          {
            name,
            email,
            password,
          }
        );

      alert(
        "Registration Successful"
      );

      console.log(data);

      window.location.href =
        "/login";

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">

        <div className="col-md-6">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">
              Register
            </h2>

            <form
              onSubmit={submitHandler}
            >

              <div className="mb-3">
                <label className="form-label">
                  Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                />
              </div>

              <button
                type="submit"
                className="btn btn-success w-100"
              >
                Register
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Register;