import { Link } from "react-router-dom";
import { useEpisodes } from "../context/EpisodesContext";

interface Props {
  id: string;
  episode: string;
  name: string;
  air_date: string;
  charactersCount: number;
}

export default function EpisodeCard({
  id,
  episode,
  name,
  air_date,
  charactersCount,
}: Props) {
  const { favorites, seen, toggleFavorite, toggleSeen } = useEpisodes();

  const isFav = favorites.includes(id);
  const isSeen = seen.includes(id);

  return (
    <div className="border rounded-md p-4 shadow hover:shadow-md transition relative bg-white">
      <Link to={`/episode/${id}`}>
        <h2 className="font-semibold text-lg">
          {episode} - {name}
        </h2>
      </Link>
      <p>
        <strong>Data de exibição:</strong> {air_date}
      </p>
      <p>
        <strong>Personagens:</strong> {charactersCount}
      </p>

      <div className="absolute top-2 right-2 flex space-x-2">
        <button
          aria-label={isFav ? "Desfavoritar" : "Favoritar"}
          onClick={() => toggleFavorite(id)}
          className={`text-xl ${
            isFav ? "text-yellow-400" : "text-gray-300 hover:text-yellow-400"
          }`}
          type="button"
        >
          ★
        </button>
        <button
          aria-label={isSeen ? "Marcar como não visto" : "Marcar como visto"}
          onClick={() => toggleSeen(id)}
          className={`text-xl ${
            isSeen ? "text-green-500" : "text-gray-300 hover:text-green-500"
          }`}
          type="button"
        >
          👁
        </button>
      </div>
    </div>
  );
}
