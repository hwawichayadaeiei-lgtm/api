"use client";

// useEffect ใช้ตรวจสอบและอัปเดตข้อมูลเมื่อเกมที่กำลังแก้ไขเปลี่ยน
// useState ใช้จัดการข้อมูลในฟอร์มและข้อความแจ้งเตือน
import { useEffect, useState } from "react";
import type { Game, GameStatus } from "@/types/game";

// กำหนดรูปแบบข้อมูลที่ใช้ในฟอร์ม
type GameDraft = {
  name: string;
  platform: string;
  hours: string;
  status: GameStatus;
};

// กำหนด Props ที่ GameForm รับมาจาก GameExplorer
type GameFormProps = {
  // ข้อมูลเกมเดิมที่ต้องการแก้ไข
  initialGame?: Game;

  // ฟังก์ชันที่ทำงานเมื่อกดบันทึก
  onSave: (draft: GameDraft) => void;

  // ฟังก์ชันที่ทำงานเมื่อกดยกเลิก
  onCancel: () => void;
};

// กำหนดรูปแบบของ Error ในแต่ละช่องของฟอร์ม
type FormErrors = Partial<Record<keyof GameDraft, string>>;

// กำหนดค่าเริ่มต้นของฟอร์ม
const emptyDraft: GameDraft = {
  name: "",
  platform: "",
  hours: "",
  status: "ยังไม่เริ่ม",
};

// Export Type เพื่อให้ GameExplorer สามารถนำไปใช้ได้
export type { GameDraft };

export default function GameForm({
  initialGame,
  onSave,
  onCancel,
}: GameFormProps) {
  // State ก้อนเดียวสำหรับเก็บข้อมูลทุกฟิลด์ในฟอร์ม
  const [draft, setDraft] = useState<GameDraft>(emptyDraft);

  // State สำหรับเก็บข้อความ Error ของแต่ละฟิลด์
  const [errors, setErrors] = useState<FormErrors>({});

  // ทำงานเมื่อ initialGame เปลี่ยน
  // ใช้สำหรับนำข้อมูลเดิมกลับมาแสดงในฟอร์มตอนแก้ไข
  useEffect(() => {
    if (initialGame) {
      setDraft({
        name: initialGame.name,
        platform: initialGame.platform,
        hours: String(initialGame.hours),
        status: initialGame.status,
      });
    } else {
      // ถ้าไม่ได้แก้ไข ให้ใช้ค่าเริ่มต้นของฟอร์ม
      setDraft(emptyDraft);
    }

    // ล้างข้อความ Error เมื่อเปลี่ยนเกม
    setErrors({});
  }, [initialGame]);

  // ฟังก์ชันตรวจสอบความถูกต้องของข้อมูลก่อนบันทึก
  function validate(value: GameDraft): FormErrors {
    const nextErrors: FormErrors = {};

    // ตรวจสอบว่าชื่อเกมไม่เป็นค่าว่าง
    if (value.name.trim() === "") {
      nextErrors.name = "กรุณาระบุชื่อเกม";
    }

    // ตรวจสอบว่ามีการเลือกแพลตฟอร์ม
    if (value.platform === "") {
      nextErrors.platform = "กรุณาเลือกแพลตฟอร์ม";
    }

    // แปลงจำนวนชั่วโมงจาก String เป็น Number
    const hours = Number(value.hours);

    // ตรวจสอบว่าจำนวนชั่วโมงเป็นจำนวนเต็มบวก
    if (!Number.isInteger(hours) || hours <= 0) {
      nextErrors.hours =
        "จำนวนชั่วโมงต้องเป็นจำนวนเต็มบวก";
    }

    return nextErrors;
  }

  // Event Handler สำหรับรับค่าจาก Input และ Select
  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >,
  ) {
    // ดึงชื่อฟิลด์และค่าที่ผู้ใช้กรอก
    const { name, value } = event.target;

    // อัปเดต State โดยเก็บข้อมูลฟิลด์อื่นไว้เหมือนเดิม
    setDraft((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Event Handler เมื่อผู้ใช้กดปุ่มบันทึก
  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    // ป้องกันไม่ให้ Form รีโหลดหน้าเว็บ
    event.preventDefault();

    // ตรวจสอบข้อมูลก่อนบันทึก
    const nextErrors = validate(draft);

    // เก็บ Error ที่ตรวจพบไว้ใน State
    setErrors(nextErrors);

    // ถ้ามี Error ให้หยุดการทำงานและไม่บันทึก
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    // ส่งข้อมูลที่ผ่านการตรวจสอบกลับไปให้ GameExplorer
    onSave(draft);

    // ถ้าเป็นการเพิ่มเกมใหม่ ให้ล้างข้อมูลในฟอร์ม
    if (!initialGame) {
      setDraft(emptyDraft);
    }
  }

  return (
    // Form สำหรับเพิ่มหรือแก้ไขเกม
    <form className="game-form" onSubmit={handleSubmit} noValidate>
      {/* เปลี่ยนหัวข้อตามโหมดเพิ่มหรือแก้ไข */}
      <h2>{initialGame ? "แก้ไขเกม" : "เพิ่มเกม"}</h2>

      {/* ช่องกรอกชื่อเกม */}
      <div className="form-field">
        <label htmlFor="game-name">ชื่อเกม</label>

        <input
          id="game-name"
          name="name"
          type="text"
          value={draft.name}
          onChange={handleChange}
          placeholder="เช่น ROV"
        />

        {/* แสดง Error ถ้าชื่อเกมไม่ถูกต้อง */}
        {errors.name && (
          <p className="form-error">{errors.name}</p>
        )}
      </div>

      {/* ช่องเลือกแพลตฟอร์ม */}
      <div className="form-field">
        <label htmlFor="platform">แพลตฟอร์ม</label>

        <select
          id="platform"
          name="platform"
          value={draft.platform}
          onChange={handleChange}
          className="game-select"
        >
          <option value="">เลือกแพลตฟอร์ม</option>
          <option value="Mobile">Mobile</option>
          <option value="PC">PC</option>
          <option value="PlayStation">PlayStation</option>
          <option value="Xbox">Xbox</option>
          <option value="Nintendo Switch">
            Nintendo Switch
          </option>
        </select>

        {/* แสดง Error ถ้ายังไม่ได้เลือกแพลตฟอร์ม */}
        {errors.platform && (
          <p className="form-error">{errors.platform}</p>
        )}
      </div>

      {/* ช่องกรอกจำนวนชั่วโมง */}
      <div className="form-field">
        <label htmlFor="hours">
          จำนวนชั่วโมงที่คาดว่าจะเล่น
        </label>

        <input
          id="hours"
          name="hours"
          type="number"
          min="1"
          step="1"
          value={draft.hours}
          onChange={handleChange}
          placeholder="เช่น 20"
        />

        {/* แสดง Error ถ้าจำนวนชั่วโมงไม่ถูกต้อง */}
        {errors.hours && (
          <p className="form-error">{errors.hours}</p>
        )}
      </div>

      {/* ช่องเลือกสถานะของเกม */}
      <div className="form-field">
        <label htmlFor="status">สถานะ</label>

        <select
          id="status"
          name="status"
          value={draft.status}
          onChange={handleChange}
          className="game-select"
        >
          <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
          <option value="กำลังเล่น">กำลังเล่น</option>
          <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
        </select>
      </div>

      <div className="game-form-actions">
        {/* ปุ่มเพิ่มเกมหรือบันทึกการแก้ไข */}
        <button type="submit" className="add-game-button">
          {initialGame ? "บันทึกการแก้ไข" : "เพิ่มเกม"}
        </button>

        {/* แสดงปุ่มยกเลิกเฉพาะตอนแก้ไข */}
        {initialGame && (
          <button
            type="button"
            className="cancel-game-button"
            onClick={onCancel}
          >
            ยกเลิก
          </button>
        )}
      </div>
    </form>
  );
}