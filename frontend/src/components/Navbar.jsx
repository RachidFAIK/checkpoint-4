import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <div>
      <nav id="navbar">
        <ul className="menu">
          <li id="logo" title="Made by Johnny Stiwerson">
            <Link to="/">
              <img src={logo} alt="logo" className="logo" />
            </Link>
          </li>
          <li id="trigram" tabIndex="-1">
            <div>Menu</div>
          </li>
          <span id="responsive-menu">
            <ul className="menu">
              <li className="menu-option">
                <Link to="/">
                  <p>Home</p>
                </Link>
              </li>

              <li className="menu-option">
                <Link to="/upload">
                  <p>Submit a vision</p>
                </Link>
              </li>
              <li id="sign-in">
                <Link to="/login">
                  <p>Sign in</p>
                </Link>
              </li>
              <li id="sign-up">
                <Link to="/register">
                  <p>Sign up</p>
                </Link>
              </li>
            </ul>
          </span>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
