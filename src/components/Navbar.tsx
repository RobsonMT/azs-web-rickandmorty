import { FaRegHeart } from "react-icons/fa";
import { LuTv } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useEpisodes } from "../context/EpisodesContext";
import { IoEyeOutline } from "react-icons/io5";

export default function Navbar() {
  const { favorites, seen } = useEpisodes();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/30 text-blue-700 border-b border-white/20 shadow-md px-4 py-3 flex justify-between items-center">
      <div className="inline-flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="w-8 h-8 hidden md:block" />
        <Link
          to="/"
          className="hidden md:block font-bold text-lg hover:underline"
        >
          <p className="text-black font-bold">Rick and Morty</p>
        </Link>
      </div>

      <div className="inline-flex space-x-4 text-sm md:text-base">
        <div className="inline-flex items-center space-x-1">
          <LuTv className="mb-1" />
          <Link to="/" className="hover:underline">
            Episódios
          </Link>
        </div>

        <div className="inline-flex items-center space-x-1">
          <FaRegHeart className="mb-1" />
          <Link to="/favorites" className="hover:underline">
            Favoritos
          </Link>
          <p className="bg-blue-50 rounded-3xl px-2 text-xs">
            {favorites.length}
          </p>
        </div>

        <div className="inline-flex items-center space-x-1">
          <IoEyeOutline className="mb-1" />
          <Link to="/seen" className="hover:underline">
            Vistos
          </Link>
          <p className="bg-blue-50 rounded-3xl px-2 text-xs">{seen.length}</p>
        </div>
      </div>
    </nav>
  );
}
