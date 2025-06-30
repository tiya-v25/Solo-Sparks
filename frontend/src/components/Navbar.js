import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div class="container bg-dark text-light rounded shadow mt-2">
        {" "}
        <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          {" "}
          <a
            href="/"
            class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none text-light"
          >
            {" "}
            <span class="fs-4">Simple header</span>{" "}
          </a>{" "}
          <ul class="nav nav-pills pe-3 ">
            {" "}
            <li class="nav-item p-1 text-light">
              <Link
                to="/"
                style={{
                  marginRight: "1rem",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Home
              </Link>
            </li>{" "}
            <li class="nav-item p-1 text-light">
              <Link
                to="/login"
                style={{
                  marginRight: "1rem",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
            </li>{" "}
            <li class="nav-item p-1 text-light">
              <Link
                to="/register"
                style={{
                  marginRight: "1rem",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Register
              </Link>
            </li>{" "}
            <li class="nav-item p-1 text-light">
              <Link
                to="/dashboard"
                style={{
                  marginRight: "1rem",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Dashboard
              </Link>
            </li>{" "}
            <li class="nav-item p-1 text-light">
              <Link
                to="/quests"
                style={{
                  marginRight: "1rem",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Quests
              </Link>
            </li>{" "}
          </ul>{" "}
        </header>{" "}
      </div>
      ;
    </nav>
  );
}

export default Navbar;
