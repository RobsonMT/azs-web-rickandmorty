import { Link } from "react-router-dom";
import { useEpisodes } from "../context/EpisodesContext";
import { motion } from "framer-motion";
import { BsCalendarEvent } from "react-icons/bs";
import { RiGroupLine } from "react-icons/ri";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import type { Episode } from "../types/episode";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

type Props = {
  episodes: Episode[];
};

export default function EpisodeCard({ episodes }: Props) {
  const { favorites, seen, toggleFavorite, toggleSeen } = useEpisodes();

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {episodes.map((ep) => (
        <motion.div
          key={ep.id}
          variants={cardVariants}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
          className="border-b-gray-500 rounded-lg p-4 shadow-md flex flex-col justify-between bg-white"
        >
          <div className="flex items-center gap-4 mb-4">
            {ep.characters.length > 0 && ep.characters[0].image ? (
              <img
                src={ep.characters[0].image}
                alt={ep.characters[0].name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 text-sm">
                Sem imagem
              </div>
            )}
            <div>
              <Link
                to={`/episode/${ep.id}`}
                className="text-xl font-bold text-black hover:underline hover:text-blue-700 line-clamp-2"
              >
                {ep.name}
              </Link>
              <p className="bg-blue-50 rounded-3xl flex justify-center max-w-[80px]">
                {ep.episode}
              </p>
              <p className="text-sm flex items-center gap-1 text-gray-700 mt-1">
                <BsCalendarEvent className="mr-1" /> {ep.air_date}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <RiGroupLine className="mr-1" /> {ep.characters.length}{" "}
                personagens
              </p>
            </div>
          </div>

          <div className="space-x-2 flex justify-end">
            <button
              onClick={() => toggleFavorite(ep.id)}
              className={`px-3 py-1 rounded-2xl text-white flex items-center gap-2 cursor-pointer hover:brightness-110 transition ${
                favorites.includes(ep.id) ? "bg-red-400" : "bg-gray-400"
              }`}
            >
              {favorites.includes(ep.id) ? <FaHeart /> : <FaRegHeart />}
              {favorites.includes(ep.id) ? "Desfavoritar" : "Favoritar"}
            </button>
            <button
              onClick={() => toggleSeen(ep.id)}
              className={`px-3 py-1 rounded-2xl text-white flex items-center gap-2 cursor-pointer hover:brightness-110 transition ${
                seen.includes(ep.id) ? "bg-green-400" : "bg-gray-400"
              }`}
            >
              {seen.includes(ep.id) ? <MdVisibility /> : <MdVisibilityOff />}
              {seen.includes(ep.id) ? "Visto" : "Não visto"}
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
