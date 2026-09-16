"use client";

import Link from "next/link";
import { useState } from "react";
import type { Game } from "@/types/game";
import GameForm, { type GameDraft } from "./GameForm";

type GameExplorerProps = {
  initialGames: Game[];
};

export default function GameExplorer({
  initialGames,
}: GameExplorerProps) {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleCreate(draft: GameDraft) {
    const newGame: Game = {
      id: crypto.randomUUID(),
      name: draft.name.trim(),
      platform: draft.platform,
      hours: Number(draft.hours),
      status: draft.status,
    };

    setGames((prevGames) => [...prevGames, newGame]);
  }

  function handleUpdate(id: string, draft: GameDraft) {
    setGames((prevGames) =>
      prevGames.map((game) =>
        game.id === id
          ? {
              ...game,
              name: draft.name.trim(),
              platform: draft.platform,
              hours: Number(draft.hours),
              status: draft.status,
            }
          : game,
      ),
    );

    setEditingId(null);
  }

  function handleSave(draft: GameDraft) {
    if (editingId === null) {
      handleCreate(draft);
      return;
    }

    handleUpdate(editingId, draft);
  }

  function handleDelete(id: string) {
    setGames((prevGames) =>
      prevGames.filter((game) => game.id !== id),
    );
  }

  const editingGame = games.find(
    (game) => game.id === editingId,
  );

  return (
    <main className="page">
      <h1>Game Backlog</h1>

      <GameForm
        key={editingId ?? "new"}
        initialGame={editingGame}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />

      <p>เกมทั้งหมด {games.length} เกม</p>

      {games.length === 0 ? (
        <div className="empty-state">
          <h2>ยังไม่มีเกม</h2>
          <p>ลองเพิ่มเกมที่ต้องการเล่น</p>
        </div>
      ) : (
        <section className="courseGrid">
          {games.map((game) => (
            <article className="course-card" key={game.id}>
              <h2 className="game-title">
                <Link href={`/games/${game.id}`}>
                  {game.name}
                </Link>
              </h2>

              <p>แพลตฟอร์ม: {game.platform}</p>

              <p>
                จำนวนชั่วโมงที่คาดว่าจะเล่น: {game.hours} ชั่วโมง
              </p>

              <p>สถานะ: {game.status}</p>

              <div className="course-actions">
                <Link
                  href={`/games/${game.id}`}
                  className="detail-button"
                >
                  ดูรายละเอียด
                </Link>

                <button
                  type="button"
                  onClick={() => setEditingId(game.id)}
                >
                  แก้ไข
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(game.id)}
                >
                  ลบ
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}