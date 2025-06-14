import { useQuery } from "@apollo/client";
import { GET_EPISODES } from "../graphql/queries";
import { useEpisodes } from "../context/EpisodesContext";
import type { EpisodesResponse } from "../types/episode";
import EpisodeCard from "../components/EpisodeCard";

export default function Seen() {
  const { seen } = useEpisodes();
  const { data, loading, error } = useQuery<EpisodesResponse>(GET_EPISODES);

  if (loading) return <p>Carregando...</p>;
  if (error || !data) return <p>Erro ao carregar episódios.</p>;

  const filtered = data.episodes.results.filter((ep) => seen.includes(ep.id));

  return (
    <div className="space-y-4 mt-18">
      <h1 className="text-2xl font-bold">Episódios Vistos</h1>
      {filtered.length === 0 && (
        <p>Nenhum episódio marcado como visto ainda.</p>
      )}
      <EpisodeCard episodes={filtered} />
    </div>
  );
}
