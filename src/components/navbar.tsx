import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b-2">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link href="/">Home</Link>
        </li>
        <li className="navbar-item">
          <Link href="/blog">Blog</Link>
        </li>
        <li className="navbar-item">
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}
