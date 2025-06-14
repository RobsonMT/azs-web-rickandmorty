import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EPISODE_DETAIL } from "../graphql/queries";
import type { EpisodeDetailResponse } from "../types/episode";
import { BsCalendarEvent } from "react-icons/bs";
import { RiGroupLine } from "react-icons/ri";
import { motion } from "framer-motion";

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
    <div className="space-y-2 mt-18">
      <h1 className="text-2xl font-bold">{ep.name}</h1>
      <p className="bg-blue-50 rounded-3xl flex justify-center max-w-[80px]">
        {ep.episode}
      </p>
      <p className="text-sm flex items-center gap-1 text-gray-700">
        <BsCalendarEvent className="mr-1" /> {ep.air_date}
      </p>
      <p className="text-sm flex items-center gap-1 text-gray-700">
        <RiGroupLine className="mr-1" /> {ep.characters.length} Personagens
      </p>

      <h2 className="text-xl font-semibold mt-4">
        Personagens({ep.characters.length})
      </h2>
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 "
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {ep.characters.map((char) => (
          <motion.div
            key={char.id}
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="border-b-gray-600 rounded-lg p-4 shadow-md"
          >
            <img
              src={char.image}
              alt={char.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="font-bold text-lg">{char.name}</h3>
            <div className="flex items-center gap-2">
              <span
                className={`h-3 w-3 rounded-full ${
                  char.status === "Alive"
                    ? "bg-green-500"
                    : char.status === "Dead"
                    ? "bg-red-500"
                    : "bg-gray-400"
                }`}
              ></span>
              <span className="text-sm text-gray-700">{char.status}</span>
            </div>
            <p className="text-sm text-gray-600">{char.species}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
