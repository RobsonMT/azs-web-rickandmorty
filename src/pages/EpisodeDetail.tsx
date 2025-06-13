import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EPISODE_DETAIL } from "../graphql/queries";
import type { EpisodeDetailResponse } from "../types/episode";

export default function EpisodeDetail() {
  const { id } = useParams();
  const { data, loading, error } = useQuery<EpisodeDetailResponse>(
    GET_EPISODE_DETAIL,
    {
      variables: { id },
    }
  );

  if (loading) return <p>Carregando...</p>;
  if (error || !data) return <p>Erro ao carregar detalhes.</p>;

  const ep = data.episode;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{ep.name}</h1>
      <p className="text-sm text-gray-600">
        {ep.episode} • {ep.air_date}
      </p>

      <h2 className="text-xl font-semibold mt-4">Personagens:</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ep.characters.map((char) => (
          <div key={char.id} className="border rounded p-3 shadow">
            <img
              src={char.image}
              alt={char.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="font-bold text-lg">{char.name}</h3>
            <p className="text-sm text-gray-600">
              {char.species} • {char.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
