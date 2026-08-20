export default function HomePage() {
  const siteName: string = "Student Course Hub";

  const description: string =
    "เว็บไซต์รวบรวมข้อมูลรายวิชาและข้อมูลการเรียนสำหรับนักศึกษา";

  const courseCount: number = 6;
  const isOpen: boolean = true;

  const topics: string[] = [
    "HTML",
    "CSS",
    "TypeScript",
    "Next.js",
  ];

  type Course = {
    id: number;
    code: string;
    title: string;
    credits: number;
    isOpen: boolean;
  };

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

  return (
    <main className="homePage">
      <h1>{siteName}</h1>

      <p>{description}</p>

      <p>จำนวนรายวิชา: {courseCount}</p>

      <p>
        สถานะระบบ: {isOpen ? "เปิดใช้งาน" : "ปิดใช้งาน"}
      </p>

      <section>
        <h2>เว็บไซต์นี้เหมาะสำหรับใคร?</h2>

        <p>
          เหมาะสำหรับนักศึกษาที่ต้องการค้นหาข้อมูลรายวิชา
          ตรวจสอบรายละเอียดหลักสูตร และวางแผนการเรียน
        </p>
      </section>

      <section>
        <h2>หัวข้อที่เกี่ยวข้อง</h2>

        <ul>
          {topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </section>

      <section className="courseGrid">
        {courses.map((course) => (
          <article key={course.id} className="courseCard">
            <h2>{course.title}</h2>

            <p>รหัสวิชา: {course.code}</p>

            <p>{course.credits} หน่วยกิต</p>

            <p>
              {course.isOpen
                ? "เปิดลงทะเบียน"
                : "ปิดลงทะเบียน"}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
