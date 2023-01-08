import React from "react";
import { Link } from "react-router-dom";
import Counter from "./Counter";

const Header = () => {
  return (
    <header className="Header">
      <h1>Redux Blog</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/posts">New post</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          {/* <Counter /> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
