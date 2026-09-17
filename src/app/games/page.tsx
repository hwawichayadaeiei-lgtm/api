// นำ Component GameExplorer มาใช้สำหรับแสดงและจัดการรายการเกม
import GameExplorer from "@/components/GameExplorer";

// นำข้อมูลเกมเริ่มต้นจากไฟล์ games.ts
import { games } from "@/data/games";

// หน้า Game Backlog ที่เส้นทาง /games
export default function GamesPage() {
  // ส่งข้อมูลเกมเริ่มต้นไปให้ GameExplorer ผ่าน Props
  return <GameExplorer initialGames={games} />;
}