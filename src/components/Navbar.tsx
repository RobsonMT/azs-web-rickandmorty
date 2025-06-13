import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg hover:underline">
        Rick and Morty
      </Link>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          Episódios
        </Link>
        <Link to="/favorites" className="hover:underline">
          Favoritos
        </Link>
      </div>
    </nav>
  );
}
