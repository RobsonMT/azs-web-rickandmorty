import { useQuery } from "@apollo/client";
import { GET_EPISODES } from "../graphql/queries";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useEpisodes } from "../context/EpisodesContext";
import type { Episode, EpisodesResponse } from "../types/episode";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { BsCalendarEvent } from "react-icons/bs";
import { useDebounce } from "../hooks/useDebounce";
import { motion } from "framer-motion";
import { RiGroupLine } from "react-icons/ri";

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

export default function Home() {
  const [page, setPage] = useState(1);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);
  const loader = useRef<HTMLDivElement | null>(null);
  const debouncedSearch = useDebounce(search, 500);

  const { favorites, seen, toggleFavorite, toggleSeen } = useEpisodes();

  const { loading, fetchMore, refetch } = useQuery<EpisodesResponse>(
    GET_EPISODES,
    {
      variables: { page: 1, name: "" },
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setEpisodes([]);

    refetch({ page: 1, name: debouncedSearch }).then((res) => {
      const results = res.data.episodes.results;
      const hasNext = res.data.episodes.info.next;
      if (results && results.length > 0) {
        setEpisodes(results);
        setHasMore(!!hasNext);
      } else {
        setEpisodes([]);
        setHasMore(false);
      }
    });
  }, [debouncedSearch, refetch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
          setLoadingMore(true);
          fetchMore({
            variables: { page: page + 1, name: debouncedSearch },
          }).then((res) => {
            const newEpisodes = res.data.episodes.results;
            const hasNext = res.data.episodes.info.next;

            if (newEpisodes && newEpisodes.length > 0) {
              setEpisodes((prev) => [...prev, ...newEpisodes]);
              setPage((prev) => prev + 1);
              setHasMore(!!hasNext);
            } else {
              setHasMore(false);
            }
            setLoadingMore(false);
          });
        }
      },
      { threshold: 1.0 }
    );

    const current = loader.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasMore, loading, loadingMore, fetchMore, page, debouncedSearch]);

  return (
    <div className="space-y-6 mt-18">
      <input
        type="text"
        placeholder="Buscar episódio..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border-b-gray-500 rounded-lg p-4 shadow-md px-3 py-2 w-full mb-4"
      />

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
                className={`px-3 py-1 rounded text-white flex items-center gap-2 cursor-pointer hover:brightness-110 transition ${
                  favorites.includes(ep.id) ? "bg-red-500" : "bg-gray-400"
                }`}
              >
                {favorites.includes(ep.id) ? <FaHeart /> : <FaRegHeart />}
                {favorites.includes(ep.id) ? "Desfavoritar" : "Favoritar"}
              </button>
              <button
                onClick={() => toggleSeen(ep.id)}
                className={`px-3 py-1 rounded text-white flex items-center gap-2 cursor-pointer hover:brightness-110 transition ${
                  seen.includes(ep.id) ? "bg-green-500" : "bg-gray-400"
                }`}
              >
                {seen.includes(ep.id) ? <MdVisibility /> : <MdVisibilityOff />}
                {seen.includes(ep.id) ? "Visto" : "Não visto"}
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div ref={loader} className="h-8"></div>

      {episodes.length === 0 && !loading && (
        <p className="text-center text-gray-500">Nenhum episódio encontrado.</p>
      )}

      {loadingMore && (
        <p className="text-center text-blue-500">
          Carregando mais episódios...
        </p>
      )}

      {!hasMore && episodes.length > 0 && (
        <p className="text-center text-gray-400">
          Todos os episódios foram carregados.
        </p>
      )}
    </div>
  );
}
