import type { Metadata } from "next";

// นำ notFound() มาใช้สำหรับกรณีที่ไม่พบเกมตาม ID
import { notFound } from "next/navigation";

// นำข้อมูลเกมมาใช้ค้นหาเกมตาม ID
import { games } from "@/data/games";

// กำหนดรูปแบบ Props ที่รับ ID ของเกมจาก Dynamic Route
type GamePageProps = {
  params: Promise<{
    id: string;
  }>;
};

// กำหนด Metadata ของหน้าเว็บแบบ Dynamic
// ใช้ชื่อเกมเป็นชื่อแท็บของหน้าเว็บ
export async function generateMetadata({
  params,
}: GamePageProps): Promise<Metadata> {
  // ดึง ID จาก URL
  const { id } = await params;

  // ค้นหาเกมจาก ID ที่ได้รับจาก URL
  const game = games.find((item) => item.id === id);

  // ถ้าไม่พบเกม ให้กำหนดชื่อแท็บเป็น "ไม่พบเกม"
  if (!game) {
    return {
      title: "ไม่พบเกม",
    };
  }

  // ถ้าพบเกม ให้ใช้ชื่อเกมเป็นชื่อแท็บ
  return {
    title: game.name,
  };
}

// หน้าแสดงรายละเอียดของเกม
export default async function GameDetailPage({
  params,
}: GamePageProps) {
  // ดึง ID ของเกมจาก URL
  const { id } = await params;

  // ค้นหาเกมที่มี ID ตรงกับ URL
  const game = games.find((item) => item.id === id);

  // ถ้าไม่พบข้อมูลเกม ให้เรียก notFound() เพื่อแสดงหน้า 404
  if (!game) {
    notFound();
  }

  return (
    <main className="page">
      {/* แสดงชื่อเกม */}
      <h1>{game.name}</h1>

      {/* แสดงรายละเอียดของเกม */}
      <article className="course-card">
        {/* แสดงชื่อเกม */}
        <p>ชื่อเกม: {game.name}</p>

        {/* แสดงแพลตฟอร์ม */}
        <p>แพลตฟอร์ม: {game.platform}</p>

        {/* แสดงจำนวนชั่วโมงที่คาดว่าจะเล่น */}
        <p>
          จำนวนชั่วโมงที่คาดว่าจะเล่น: {game.hours} ชั่วโมง
        </p>

        {/* แสดงสถานะของเกม */}
        <p>สถานะ: {game.status}</p>
      </article>
    </main>
  );
}