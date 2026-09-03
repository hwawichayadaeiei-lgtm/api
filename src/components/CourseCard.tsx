import type { Course } from "@/types/course";

type CourseCardProps = {
  course: Course;
  description?: string;
};

export default function CourseCard({
  course,
  description,
}: CourseCardProps) {
  return (
    <article className="course-card">
      <h2>{course.title}</h2>
      <p>รหัสวิชา: {course.code}</p>
      {description && <p>{description}</p>}
    </article>
  );
}
