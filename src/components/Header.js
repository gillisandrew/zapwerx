import React from 'react';
import { Link } from 'gatsby';
const Header = () => (
  <header id="header">
    <Link className="title" to="/">
      Hyperspace
    </Link>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/elements">Elements</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
