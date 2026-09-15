"use client";

import { useState, type ChangeEvent } from "react";
import type { Course } from "@/types/course";
import CourseCard from "@/components/CourseCard";
import CourseForm, { type CourseDraft } from "./CourseForm";

type CourseExplorerProps = {
  initialCourses: Course[];
};

export default function CourseExplorer({
  initialCourses,
}: CourseExplorerProps) {
  const [keyword, setKeyword] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [editingId, setEditingId] = useState<string | null>(null);

  // ค้นหา
  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  // เพิ่มรายวิชา
  function handleCreate(draft: CourseDraft) {
    const newCourse: Course = {
      id: crypto.randomUUID(),
      code: draft.code.trim(),
      name: draft.name.trim(),
      credit: Number(draft.credit),
      instructor: draft.instructor.trim(),
    };

    setCourses((prevCourses) => [...prevCourses, newCourse]);
  }

  // ลบรายวิชา
  function handleDelete(id: string) {
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== id),
    );

    setFavoriteIds((prevIds) =>
      prevIds.filter((favoriteId) => favoriteId !== id),
    );
  }

  // แก้ไขรายวิชา
  function handleUpdate(id: string, draft: CourseDraft) {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id
          ? {
              ...course,
              code: draft.code.trim(),
              name: draft.name.trim(),
              credit: Number(draft.credit),
              instructor: draft.instructor.trim(),
            }
          : course,
      ),
    );

    setEditingId(null);
  }

  // บันทึก เพิ่มใหม่หรือแก้ไข
  function handleSave(draft: CourseDraft) {
    if (editingId === null) {
      handleCreate(draft);
      return;
    }

    handleUpdate(editingId, draft);
  }

  // Favorite
  function handleToggleFavorite(id: string) {
    setFavoriteIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((favoriteId) => favoriteId !== id)
        : [...prevIds, id],
    );
  }

  // ค้นหาจากชื่อวิชาหรือรหัสวิชา
  const searchText = keyword.trim().toLowerCase();

  const visibleCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchText) ||
      course.code.toLowerCase().includes(searchText),
  );

  // รายวิชาที่กำลังแก้ไข
  const editingCourse = courses.find(
    (course) => course.id === editingId,
  );

  return (
    <main className="page">
      <h1>รายวิชาทั้งหมด</h1>

      <CourseForm
        key={editingId ?? "new"}
        initialCourse={editingCourse}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />

      <div className="course-search">
        <input
          type="search"
          aria-label="ค้นหารายวิชา"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหาชื่อวิชาหรือรหัสวิชา"
        />

        <button
          type="button"
          className="clear-search-button"
          onClick={() => setKeyword("")}
        >
          ล้าง
        </button>
      </div>

      <p>
        รายวิชาทั้งหมด {courses.length} วิชา | Favorite{" "}
        {favoriteIds.length} วิชา
      </p>

      {visibleCourses.length === 0 ? (
        <div className="empty-state">
          <h2>ไม่พบรายวิชา</h2>

          <p>ไม่พบรายวิชาที่ตรงกับ "{keyword}"</p>

          <button
            type="button"
            className="clear-search-button"
            onClick={() => setKeyword("")}
          >
            แสดงรายวิชาทั้งหมด
          </button>
        </div>
      ) : (
        <section className="courseGrid">
          {visibleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isFavorite={favoriteIds.includes(course.id)}
              onToggleFavorite={handleToggleFavorite}
              onEdit={() => setEditingId(course.id)}
              onDelete={() => handleDelete(course.id)}
            />
          ))}
        </section>
      )}
    </main>
  );
}