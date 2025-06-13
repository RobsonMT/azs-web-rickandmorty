import { gql } from "@apollo/client";

export const GET_EPISODES = gql`
  query GetEpisodes($page: Int, $name: String) {
    episodes(page: $page, filter: { name: $name }) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        episode
        air_date
        characters {
          id
          name
          image
          species
          status
        }
      }
    }
  }
`;

export const GET_EPISODE_DETAIL = gql`
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      id
      name
      episode
      air_date
      characters {
        id
        name
        image
        species
        status
      }
    }
  }
`;
