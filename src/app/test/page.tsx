"use client";

import { useState } from "react";
import CourseForm, {
  type CourseDraft,
} from "@/components/CourseForm";

export default function CourseFormPage() {
  const [message, setMessage] = useState("");

  function handleSave(draft: CourseDraft) {
    setMessage(
      `บันทึกสำเร็จ: ${draft.code} - ${draft.name}`,
    );
  }

  function handleCancel() {
    setMessage("ยกเลิกการกรอกข้อมูล");
  }

  return (
    <main className="page">
      <h1>Test Course Form</h1>

      <CourseForm
        onSave={handleSave}
        onCancel={handleCancel}
      />

      {message && <p>{message}</p>}
    </main>
  );
}