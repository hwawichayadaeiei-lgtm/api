"use client";

import type { Course } from "@/types/course";
import Link from "next/link";

type CourseCardProps = {
  course: Course;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function CourseCard({
  course,
  isFavorite,
  onToggleFavorite,
  onEdit,
  onDelete,
}: CourseCardProps) {
  return (
    <article className="course-card">
      <h2>
        <Link href={`/courses/${course.id}`}>
          {course.name}
        </Link>
      </h2>

      <p>รหัสวิชา: {course.code}</p>
      <p>หน่วยกิต: {course.credit}</p>
      <p>ผู้สอน: {course.instructor}</p>

      <div className="course-actions">
        <button
          type="button"
          className={`favorite-button ${
            isFavorite ? "is-favorite" : ""
          }`}
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite(course.id)}
        >
          {isFavorite
            ? "♥ อยู่ในรายการโปรด"
            : "♡ เพิ่มเป็นรายการโปรด"}
        </button>

        <button type="button" onClick={onEdit}>
          แก้ไข
        </button>

        <button type="button" onClick={onDelete}>
          ลบ
        </button>
      </div>
    </article>
  );
}