import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface EpisodesContextType {
  favorites: string[];
  seen: string[];
  toggleFavorite: (id: string) => void;
  toggleSeen: (id: string) => void;
}

const EpisodesContext = createContext<EpisodesContextType | undefined>(
  undefined
);

const STORAGE_FAVORITES = "favorites";
const STORAGE_SEEN = "seen";

const getFromStorage = (key: string): string[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const setToStorage = (key: string, data: string[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const EpisodesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>(() =>
    getFromStorage(STORAGE_FAVORITES)
  );
  const [seen, setSeen] = useState<string[]>(() =>
    getFromStorage(STORAGE_SEEN)
  );

  useEffect(() => {
    setToStorage(STORAGE_FAVORITES, favorites);
  }, [favorites]);

  useEffect(() => {
    setToStorage(STORAGE_SEEN, seen);
  }, [seen]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((ep) => ep !== id) : [...prev, id]
    );
  };

  const toggleSeen = (id: string) => {
    setSeen((prev) =>
      prev.includes(id) ? prev.filter((ep) => ep !== id) : [...prev, id]
    );
  };

  return (
    <EpisodesContext.Provider
      value={{ favorites, seen, toggleFavorite, toggleSeen }}
    >
      {children}
    </EpisodesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEpisodes = () => {
  const context = useContext(EpisodesContext);
  if (!context)
    throw new Error("useEpisodes must be used within EpisodesProvider");
  return context;
};
