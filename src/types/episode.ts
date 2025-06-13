export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
}

export interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: Character[];
}

export interface EpisodeInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface EpisodesResponse {
  episodes: {
    info: EpisodeInfo;
    results: Episode[];
  };
}

export interface EpisodeDetailResponse {
  episode: Episode;
}
