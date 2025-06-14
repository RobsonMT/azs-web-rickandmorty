import { useQuery } from "@apollo/client";
import { GET_EPISODES } from "../graphql/queries";
import { useEffect, useRef, useState } from "react";
import type { Episode, EpisodesResponse } from "../types/episode";
import { useDebounce } from "../hooks/useDebounce";
import EpisodeCard from "../components/EpisodeCard";

export default function Home() {
  const [page, setPage] = useState(1);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);
  const loader = useRef<HTMLDivElement | null>(null);
  const debouncedSearch = useDebounce(search, 500);

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

      <EpisodeCard episodes={episodes} />

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
