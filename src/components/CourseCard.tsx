"use client";

import type { Course } from "@/types/course";
import Link from "next/link";

type CourseCardProps = {
  course: Course;
  onEdit: () => void;
  onDelete: () => void;
};

export default function CourseCard({
  course,
  onEdit,
  onDelete,
}: CourseCardProps) {
  return (
    <article>
      <h2>
        <Link href={`/courses/${course.id}`}>
          {course.name}
        </Link>
      </h2>

      <p>{course.code}</p>

      <button type="button" onClick={onEdit}>
        แก้ไข
      </button>

      <button type="button" onClick={onDelete}>
        ลบ
      </button>
    </article>
  );
}