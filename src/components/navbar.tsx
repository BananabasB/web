import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="border-b-2 p-2 flex flex-row">
      <h1 className="text-7xl font-bold">bananabas</h1>
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
