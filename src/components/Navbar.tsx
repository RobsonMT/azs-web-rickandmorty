import { FaRegHeart } from "react-icons/fa";
import { LuTv } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useEpisodes } from "../context/EpisodesContext";
import { IoEyeOutline } from "react-icons/io5";

export default function Navbar() {
  const { favorites, seen } = useEpisodes();

  return (
    <nav className="p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/30 text-blue-700 border-b border-white/20 shadow-md px-4 py-3">
      <div className="inline-flex">
        <img src="/logo.png" alt="" />
        <Link to="/" className="font-bold text-lg hover:underline">
          <p className="text-black font-bold px-4 mt-3">Rick and Morty</p>
        </Link>
      </div>

      <div className="inline-flex space-x-4">
        <div className="inline-flex space-x-2">
          <LuTv className="mt-0.5" />
          <Link to="/" className="hover:underline">
            Episódios
          </Link>
        </div>
        <div className="inline-flex space-x-2">
          <FaRegHeart className="mt-0.5" />
          <Link to="/favorites" className="hover:underline">
            Favoritos
          </Link>
          <p className="bg-blue-50 rounded-3xl flex justify-center max-w-[80px] px-2">
            {favorites.length}
          </p>
        </div>
        <div className="inline-flex space-x-2">
          <IoEyeOutline className="mt-0.5" />
          <Link to="/seen" className="hover:underline">
            Vistos
          </Link>
          <p className="bg-blue-50 rounded-3xl flex justify-center max-w-[80px] px-2">
            {seen.length}
          </p>
        </div>
      </div>
    </nav>
  );
}
