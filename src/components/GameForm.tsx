"use client";

import { useEffect, useState } from "react";
import type { Game, GameStatus } from "@/types/game";

type GameDraft = {
  name: string;
  platform: string;
  hours: string;
  status: GameStatus;
};

type GameFormProps = {
  initialGame?: Game;
  onSave: (draft: GameDraft) => void;
  onCancel: () => void;
};

type FormErrors = Partial<Record<keyof GameDraft, string>>;

const emptyDraft: GameDraft = {
  name: "",
  platform: "",
  hours: "",
  status: "ยังไม่เริ่ม",
};

export type { GameDraft };

export default function GameForm({
  initialGame,
  onSave,
  onCancel,
}: GameFormProps) {
  const [draft, setDraft] = useState<GameDraft>(emptyDraft);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (initialGame) {
      setDraft({
        name: initialGame.name,
        platform: initialGame.platform,
        hours: String(initialGame.hours),
        status: initialGame.status,
      });
    } else {
      setDraft(emptyDraft);
    }

    setErrors({});
  }, [initialGame]);

  function validate(value: GameDraft): FormErrors {
    const nextErrors: FormErrors = {};

    if (value.name.trim() === "") {
      nextErrors.name = "กรุณาระบุชื่อเกม";
    }

    if (value.platform === "") {
      nextErrors.platform = "กรุณาเลือกแพลตฟอร์ม";
    }

    const hours = Number(value.hours);

    if (!Number.isInteger(hours) || hours <= 0) {
      nextErrors.hours =
        "จำนวนชั่วโมงต้องเป็นจำนวนเต็มบวก";
    }

    return nextErrors;
  }

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = event.target;

    setDraft((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const nextErrors = validate(draft);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSave(draft);

    if (!initialGame) {
      setDraft(emptyDraft);
    }
  }

  return (
    <form className="game-form" onSubmit={handleSubmit} noValidate>
      <h2>{initialGame ? "แก้ไขเกม" : "เพิ่มเกม"}</h2>

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

        {errors.name && (
          <p className="form-error">{errors.name}</p>
        )}
      </div>

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

        {errors.platform && (
          <p className="form-error">{errors.platform}</p>
        )}
      </div>

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

        {errors.hours && (
          <p className="form-error">{errors.hours}</p>
        )}
      </div>

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
        <button type="submit" className="add-game-button">
          {initialGame ? "บันทึกการแก้ไข" : "เพิ่มเกม"}
        </button>

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