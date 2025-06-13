import { useQuery } from "@apollo/client";
import { GET_EPISODES } from "../graphql/queries";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useEpisodes } from "../context/EpisodesContext";
import type { Episode, EpisodesResponse } from "../types/episode";

export default function Home() {
  const [page, setPage] = useState(1);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const loader = useRef<HTMLDivElement | null>(null);

  const { favorites, seen, toggleFavorite, toggleSeen } = useEpisodes();

  const { data, loading, fetchMore, refetch } = useQuery<EpisodesResponse>(
    GET_EPISODES,
    {
      variables: { page: 1, name: "" },
      notifyOnNetworkStatusChange: true,
    }
  );

  // Buscar episódios com base no search
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    refetch({ page: 1, name: search }).then((res) => {
      setEpisodes(res.data.episodes.results);
    });
  }, [search, refetch]);

  // Carrega mais episódios quando chega no fim
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchMore({
            variables: { page: page + 1, name: search },
          }).then((res) => {
            const newEpisodes = res.data.episodes.results;
            setEpisodes((prev) => [...prev, ...newEpisodes]);
            setPage((prev) => prev + 1);
            if (!res.data.episodes.info.next) setHasMore(false);
          });
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [loader, hasMore, loading, fetchMore, page, search]);

  return (
    <div className="space-y-6">
      <input
        type="text"
        placeholder="Buscar episódio..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="border px-3 py-2 rounded w-full mb-4"
      />

      <ul className="space-y-4">
        {episodes.map((ep) => (
          <li
            key={ep.id}
            className="border rounded p-4 shadow transition transform duration-300 hover:shadow-lg hover:scale-[1.02] flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div className="flex items-center gap-4">
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
                  className="text-xl font-bold text-blue-700 hover:underline"
                >
                  {ep.name}
                </Link>
                <p className="text-sm">
                  {ep.episode} • {ep.air_date}
                </p>
                <p className="text-sm text-gray-600">
                  {ep.characters.length} personagem(ns)
                </p>
              </div>
            </div>
            <div className="mt-2 sm:mt-0 space-x-2">
              <button
                onClick={() => toggleFavorite(ep.id)}
                className={`px-3 py-1 rounded text-white ${
                  favorites.includes(ep.id) ? "bg-red-500" : "bg-gray-400"
                }`}
              >
                {favorites.includes(ep.id) ? "Desfavoritar" : "Favoritar"}
              </button>
              <button
                onClick={() => toggleSeen(ep.id)}
                className={`px-3 py-1 rounded text-white ${
                  seen.includes(ep.id) ? "bg-green-500" : "bg-gray-400"
                }`}
              >
                {seen.includes(ep.id) ? "Visto" : "Não visto"}
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div ref={loader} className="h-8"></div>
      {loading && <p className="text-center">Carregando mais episódios...</p>}
      {!hasMore && (
        <p className="text-center text-gray-500">
          Todos os episódios foram carregados.
        </p>
      )}
    </div>
  );
}
