import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { games } from "@/data/games";

type GamePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: GamePageProps): Promise<Metadata> {
  const { id } = await params;

  const game = games.find((item) => item.id === id);

  if (!game) {
    return {
      title: "ไม่พบเกม",
    };
  }

  return {
    title: game.name,
  };
}

export default async function GameDetailPage({
  params,
}: GamePageProps) {
  const { id } = await params;

  const game = games.find((item) => item.id === id);

  if (!game) {
    notFound();
  }

  return (
    <main className="page">
      <h1>{game.name}</h1>

      <article className="course-card">
        <p>ชื่อเกม: {game.name}</p>
        <p>แพลตฟอร์ม: {game.platform}</p>
        <p>
          จำนวนชั่วโมงที่คาดว่าจะเล่น: {game.hours} ชั่วโมง
        </p>
        <p>สถานะ: {game.status}</p>
      </article>
    </main>
  );
}