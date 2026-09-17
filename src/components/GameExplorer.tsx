"use client";

// ใช้ Link สำหรับเปลี่ยนหน้า และ useState สำหรับจัดการ State
import Link from "next/link";
import { useState } from "react";

// นำ Type Game และ Component GameForm มาใช้งาน
import type { Game } from "@/types/game";
import GameForm, { type GameDraft } from "./GameForm";

// กำหนด Props ที่รับข้อมูลเกมเริ่มต้นเข้ามา
type GameExplorerProps = {
  initialGames: Game[];
};

export default function GameExplorer({
  initialGames,
}: GameExplorerProps) {
  // State สำหรับเก็บรายการเกมทั้งหมด
  const [games, setGames] = useState<Game[]>(initialGames);

  // State สำหรับเก็บ ID ของเกมที่กำลังแก้ไข
  // ถ้าเป็น null หมายถึงไม่ได้อยู่ในโหมดแก้ไข
  const [editingId, setEditingId] = useState<string | null>(null);

  // ฟังก์ชันสำหรับเพิ่มเกมใหม่
  function handleCreate(draft: GameDraft) {
    // สร้าง Object ของเกมใหม่จากข้อมูลใน Form
    const newGame: Game = {
      // สร้าง ID ใหม่ให้กับเกม
      id: crypto.randomUUID(),

      // trim() ใช้ตัดช่องว่างหน้าและหลังชื่อเกม
      name: draft.name.trim(),

      // เก็บแพลตฟอร์ม
      platform: draft.platform,

      // แปลงจำนวนชั่วโมงจาก String เป็น Number
      hours: Number(draft.hours),

      // เก็บสถานะของเกม
      status: draft.status,
    };

    // เพิ่มเกมใหม่ต่อท้ายรายการเกมเดิม
    setGames((prevGames) => [...prevGames, newGame]);
  }

  // ฟังก์ชันสำหรับแก้ไขข้อมูลเกม
  function handleUpdate(id: string, draft: GameDraft) {
    // ใช้ map() เพื่อค้นหาเกมที่มี ID ตรงกัน
    setGames((prevGames) =>
      prevGames.map((game) =>
        game.id === id
          ? {
              // คงข้อมูลเดิมไว้ และเปลี่ยนข้อมูลที่แก้ไข
              ...game,
              name: draft.name.trim(),
              platform: draft.platform,
              hours: Number(draft.hours),
              status: draft.status,
            }
          : game,
      ),
    );

    // หลังจากบันทึกแล้ว ออกจากโหมดแก้ไข
    setEditingId(null);
  }

  // ฟังก์ชันสำหรับบันทึกข้อมูลจาก Form
  function handleSave(draft: GameDraft) {
    // ถ้าไม่มี editingId แสดงว่าเป็นการเพิ่มเกมใหม่
    if (editingId === null) {
      handleCreate(draft);
      return;
    }

    // ถ้ามี editingId แสดงว่าเป็นการแก้ไขเกม
    handleUpdate(editingId, draft);
  }

  // ฟังก์ชันสำหรับลบเกม
  function handleDelete(id: string) {
    // ใช้ filter() เพื่อเอาเกมที่มี ID ตรงกับที่ต้องการลบออก
    setGames((prevGames) =>
      prevGames.filter((game) => game.id !== id),
    );
  }

  // ค้นหาเกมที่กำลังแก้ไขจาก ID
  const editingGame = games.find(
    (game) => game.id === editingId,
  );

  return (
    <main className="page">
      <h1>Game Backlog</h1>

      {/* ส่งข้อมูลเกมที่กำลังแก้ไขไปยัง GameForm */}
      {/* onSave ใช้รับข้อมูลเมื่อกดบันทึก */}
      {/* onCancel ใช้ยกเลิกการแก้ไข */}
      <GameForm
        key={editingId ?? "new"}
        initialGame={editingGame}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />

      {/* แสดงจำนวนเกมทั้งหมด */}
      <p>เกมทั้งหมด {games.length} เกม</p>

      {/* ถ้าไม่มีเกม ให้แสดงข้อความแจ้งเตือน */}
      {games.length === 0 ? (
        <div className="empty-state">
          <h2>ยังไม่มีเกม</h2>
          <p>ลองเพิ่มเกมที่ต้องการเล่น</p>
        </div>
      ) : (
        // ถ้ามีเกม ให้แสดงรายการเกมทั้งหมด
        <section className="courseGrid">
          {games.map((game) => (
            <article className="course-card" key={game.id}>
              {/* คลิกชื่อเกมเพื่อไปหน้ารายละเอียด */}
              <h2 className="game-title">
                <Link href={`/games/${game.id}`}>
                  {game.name}
                </Link>
              </h2>

              {/* แสดงแพลตฟอร์มของเกม */}
              <p>แพลตฟอร์ม: {game.platform}</p>

              {/* แสดงจำนวนชั่วโมงที่คาดว่าจะเล่น */}
              <p>
                จำนวนชั่วโมงที่คาดว่าจะเล่น: {game.hours} ชั่วโมง
              </p>

              {/* แสดงสถานะของเกม */}
              <p>สถานะ: {game.status}</p>

              <div className="course-actions">
                {/* ปุ่มไปหน้ารายละเอียดเกม */}
                <Link
                  href={`/games/${game.id}`}
                  className="detail-button"
                >
                  ดูรายละเอียด
                </Link>

                {/* ปุ่มแก้ไข โดยส่ง ID ของเกมไปเก็บใน State */}
                <button
                  type="button"
                  onClick={() => setEditingId(game.id)}
                >
                  แก้ไข
                </button>

                {/* ปุ่มลบ โดยส่ง ID ของเกมไปยัง handleDelete */}
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