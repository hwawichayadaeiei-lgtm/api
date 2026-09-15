import CourseExplorer from "@/components/CourseExplorer";
import type { Course } from "@/types/course";

const courses: Course[] = [
  {
    id: 1,
    code: "10301231",
    title: "Web Technology",
    credits: 3,
    isOpen: true,
  },
  {
    id: 2,
    code: "10301232",
    title: "Database Systems",
    credits: 3,
    isOpen: false,
  },
  {
    id: 3,
    code: "10301233",
    title: "Software Engineering",
    credits: 3,
    isOpen: true,
  },
  {
    id: 4,
    code: "10301234",
    title: "Computer Programming",
    credits: 3,
    isOpen: true,
  },
  {
    id: 5,
    code: "10301235",
    title: "Data Structures",
    credits: 3,
    isOpen: false,
  },
  {
    id: 6,
    code: "10301236",
    title: "Computer Networks",
    credits: 3,
    isOpen: true,
  },
];

export default function CoursesPage() {
  return <CourseExplorer courses={courses} />;
}