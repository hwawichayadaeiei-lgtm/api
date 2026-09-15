import CourseExplorer from "@/components/CourseExplorer";
import type { Course } from "@/types/course";

const courses: Course[] = [
  {
    id: "1",
    code: "10301231",
    name: "Web Technology",
    credit: 3,
    instructor: "อาจารย์ผู้สอนรายวิชา",
  },
  {
    id: "2",
    code: "10301232",
    name: "Database Systems",
    credit: 3,
    instructor: "อาจารย์ผู้สอนรายวิชา",
  },
  {
    id: "3",
    code: "10301233",
    name: "Software Engineering",
    credit: 3,
    instructor: "อาจารย์ผู้สอนรายวิชา",
  },
  {
    id: "4",
    code: "10301234",
    name: "Computer Programming",
    credit: 3,
    instructor: "อาจารย์ผู้สอนรายวิชา",
  },
  {
    id: "5",
    code: "10301235",
    name: "Data Structures",
    credit: 3,
    instructor: "อาจารย์ผู้สอนรายวิชา",
  },
  {
    id: "6",
    code: "10301236",
    name: "Computer Networks",
    credit: 3,
    instructor: "อาจารย์ผู้สอนรายวิชา",
  },
];

export default function CoursesPage() {
  return <CourseExplorer initialCourses={courses} />;
}