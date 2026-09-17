// กำหนดสถานะของเกมที่สามารถเลือกได้ 3 แบบ
export type GameStatus =
  | "ยังไม่เริ่ม"
  | "กำลังเล่น"
  | "เล่นจบแล้ว";

// กำหนดโครงสร้างข้อมูลของเกม
export type Game = {
  // รหัสประจำเกม
  id: string;

  // ชื่อเกม
  name: string;

  // แพลตฟอร์มที่ใช้เล่น
  platform: string;

  // จำนวนชั่วโมงที่คาดว่าจะเล่น
  hours: number;

  // สถานะของเกม
  status: GameStatus;
};