import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EpisodeDetail from "./pages/EpisodeDetail";
import Favorites from "./pages/Favorites";
import Seen from "./pages/Seen";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/episode/:id" element={<EpisodeDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/seen" element={<Seen />} />
        </Routes>
      </main>
    </div>
  );
}
