import GameExplorer from "@/components/GameExplorer";
import { games } from "@/data/games";

export default function GamesPage() {
  return <GameExplorer initialGames={games} />;
}