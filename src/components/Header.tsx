import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="container">
      <Link to="/">Link</Link>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/categories">Categories</NavLink>
        <NavLink to="/register">Register</NavLink>
      </nav>
    </header>
  );
}
