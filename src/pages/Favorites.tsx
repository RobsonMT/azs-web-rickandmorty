import { useQuery } from "@apollo/client";
import { GET_EPISODES } from "../graphql/queries";
import { useEpisodes } from "../context/EpisodesContext";
import { Link } from "react-router-dom";
import type { EpisodesResponse } from "../types/episode";

export default function Favorites() {
  const { favorites } = useEpisodes();
  const { data, loading, error } = useQuery<EpisodesResponse>(GET_EPISODES);

  if (loading) return <p>Carregando...</p>;
  if (error || !data) return <p>Erro ao carregar episódios.</p>;

  const filtered = data.episodes.results.filter((ep) =>
    favorites.includes(ep.id)
  );

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Episódios Favoritos</h1>
      {filtered.length === 0 && <p>Nenhum episódio favoritado ainda.</p>}
      <ul className="space-y-4">
        {filtered.map((ep) => (
          <li key={ep.id} className="border rounded p-4 shadow">
            <Link
              to={`/episode/${ep.id}`}
              className="text-lg font-semibold text-blue-700 hover:underline"
            >
              {ep.name} ({ep.episode})
            </Link>
            <p className="text-sm text-gray-600">{ep.air_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
