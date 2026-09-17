// นำเข้า Type Game เพื่อกำหนดรูปแบบข้อมูลเกม
import type { Game } from "@/types/game";

// ข้อมูลเกมเริ่มต้นสำหรับแสดงใน Game Backlog
export const games: Game[] = [
  {
    // รหัสประจำเกม
    id: "1",

    // ชื่อเกม
    name: "ROV",

    // แพลตฟอร์มที่ใช้เล่น
    platform: "Mobile",

    // จำนวนชั่วโมงที่คาดว่าจะเล่น
    hours: 20,

    // สถานะของเกม
    status: "ยังไม่เริ่ม",
  },

  {
    id: "2",
    name: "Roblox",
    platform: "PC",
    hours: 30,
    status: "กำลังเล่น",
  },

  {
    id: "3",
    name: "Hay Day",
    platform: "Mobile",
    hours: 15,
    status: "ยังไม่เริ่ม",
  },

  {
    id: "4",
    name: "PUBG",
    platform: "PC",
    hours: 40,
    status: "กำลังเล่น",
  },

  {
    id: "5",
    name: "Free Fire",
    platform: "Mobile",
    hours: 25,
    status: "เล่นจบแล้ว",
  },
];