"use client";

import { Course } from "@/types/course";
import { ChangeEvent, FormEvent, useState } from "react";

// type ของข้อมูลในฟอร์ม
export type CourseDraft = {
  code: string;
  name: string;
  credit: string;
  instructor: string;
};

const emptyDraft: CourseDraft = {
  code: "",
  name: "",
  credit: "",
  instructor: "",
};

type CourseFormProps = {
  initialCourse?: Course;
  onSave: (draft: CourseDraft) => void;
  onCancel: () => void;
};

function toDraft(course?: Course): CourseDraft {
  if (!course) {
    return emptyDraft;
  }

  return {
    code: course.code ?? "",
    name: course.name ?? "",
    credit: String(course.credit ?? ""),
    instructor: course.instructor ?? "",
  };
}

type FormErrors = Partial<Record<keyof CourseDraft, string>>;

export default function CourseForm({
  initialCourse,
  onSave,
  onCancel,
}: CourseFormProps) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [draft, setDraft] = useState<CourseDraft>(
    toDraft(initialCourse),
  );

  // ฟังก์ชันตรวจสอบความถูกต้อง
  function validate(value: CourseDraft): FormErrors {
    const nextErrors: FormErrors = {};

    if (value.code.trim() === "") {
      nextErrors.code = "กรุณาระบุรหัสวิชา";
    }

    if (value.name.trim() === "") {
      nextErrors.name = "กรุณาระบุชื่อวิชา";
    }

    const credit = Number(value.credit);

    if (
      !Number.isInteger(credit) ||
      credit < 1 ||
      credit > 6
    ) {
      nextErrors.credit =
        "หน่วยกิตต้องเป็นจำนวนเต็มตั้งแต่ 1 ถึง 6";
    }

    return nextErrors;
  }

  // ฟังก์ชัน handle สำหรับการเปลี่ยนข้อมูล
  function handleChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const { name, value } = event.target;

    setDraft((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(draft);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSave(draft);
    setDraft(emptyDraft);
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="code">รหัสวิชา</label>
      <input
        id="code"
        name="code"
        type="text"
        value={draft.code}
        onChange={handleChange}
        aria-invalid={!!errors.code}
        aria-describedby={
          errors.code ? "code-error" : undefined
        }
      />

      {errors.code ? (
        <p id="code-error">{errors.code}</p>
      ) : null}

      <label htmlFor="name">ชื่อวิชา</label>
      <input
        id="name"
        name="name"
        type="text"
        value={draft.name}
        onChange={handleChange}
        aria-invalid={!!errors.name}
        aria-describedby={
          errors.name ? "name-error" : undefined
        }
      />

      {errors.name ? (
        <p id="name-error">{errors.name}</p>
      ) : null}

      <label htmlFor="credit">หน่วยกิต</label>
      <input
        id="credit"
        name="credit"
        type="number"
        inputMode="numeric"
        min="1"
        max="6"
        value={draft.credit}
        onChange={handleChange}
      />

      {errors.credit ? (
        <p id="credit-error">{errors.credit}</p>
      ) : null}

      <label htmlFor="instructor">ผู้สอน</label>
      <input
        id="instructor"
        name="instructor"
        type="text"
        value={draft.instructor}
        onChange={handleChange}
      />

      <button type="submit">บันทึก</button>

      {initialCourse ? (
        <button type="button" onClick={onCancel}>
          ยกเลิก
        </button>
      ) : null}
    </form>
  );
}