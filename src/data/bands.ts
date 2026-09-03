import type { Band } from "@/types/band";

export const bands: Band[] = [
  {
    id: 1,
    name: "Solitude Is Bliss",
    genre: "Alternative Rock / Psychedelic Rock",
    description:
      "ดนตรีที่เต็มไปด้วยบรรยากาศลุ่มลึกและอารมณ์หม่น ผสมผสาน Alternative Rock และ Psychedelic Rock เข้ากับเสียงดนตรีที่มีความซับซ้อนและละเอียดอ่อน เนื้อหามักถ่ายทอดความเหงา ความสัมพันธ์ ความรู้สึกภายใน และมุมมองต่อการใช้ชีวิต ทำให้บทเพลงมีทั้งความสวยงาม ความอึดอัด และความรู้สึกที่ชวนให้ผู้ฟังกลับมาทบทวนตัวเอง",
    image: "/images/bands/solitude.jpeg",

    albums: [
      {
        name: "Her Social Anxiety",
        image: "/images/bands/albums/s1.jpg",
      },
      {
        name: "Please Verify That You Are Not A Robot",
        image: "/images/bands/albums/s2.jpeg",
      },
      {
        name: "Such A Vast Sea",
        image: "/images/bands/albums/s3.jpg",
      },
    ],

    members: [
      {
        name: "เฟนเดอร์",
        role: "ร้องนำ / กีตาร์",
        image: "/images/bands/members/s_1.jpg",
      },
      {
        name: "เบียร์",
        role: "กีตาร์",
        image: "/images/bands/members/s_2.jpg",
      },
      {
        name: "โด่ง",
        role: "เบส",
        image: "/images/bands/members/s_3.jpg",
      },
      {
        name: "ปอนด์",
        role: "คีย์บอร์ด",
        image: "/images/bands/members/s_4.jpg",
      },
      {
        name: "แฟรงค์",
        role: "กลอง",
        image: "/images/bands/members/s_5.jpg",
      },
    ],
  },

  {
    id: 2,
    name: "Oasis",
    genre: "Britpop / Rock 'n' Roll",
    description:
      "เสียงกีตาร์ที่ทรงพลังและเมโลดี้ที่ติดหู ผสมผสาน Rock 'n' Roll เข้ากับ Britpop ได้อย่างโดดเด่น เนื้อหาเพลงพูดถึงความฝัน ความรัก การใช้ชีวิต และความรู้สึกที่อยู่ภายใน ถ่ายทอดออกมาด้วยน้ำเสียงที่เต็มไปด้วยความมั่นใจและทัศนคติที่ชัดเจน หลายบทเพลงจึงมีทั้งพลัง ความคลาสสิก และความรู้สึกที่ยังเข้าถึงผู้ฟังได้แม้เวลาจะผ่านไปนาน",
    image: "/images/bands/oasis.jpg",

    albums: [
      {
        name: "Definitely Maybe",
        image: "/images/bands/albums/o1.jpeg",
      },
      {
        name: "(What's the Story) Morning Glory?",
        image: "/images/bands/albums/o2.jpeg",
      },
      {
        name: "Be Here Now",
        image: "/images/bands/albums/o3.jpg",
      },
    ],

    members: [
      {
        name: "Liam Gallagher",
        role: "ร้องนำ",
        image: "/images/bands/members/o_1.jpeg",
      },
      {
        name: "Noel Gallagher",
        role: "กีตาร์หลัก / ร้องนำ / แต่งเพลง",
        image: "/images/bands/members/o_2.jpeg",
      },
      {
        name: "Gem Archer",
        role: "กีตาร์",
        image: "/images/bands/members/o_3.jpeg",
      },
      {
        name: "Andy Bell",
        role: "เบส",
        image: "/images/bands/members/o_4.jpeg",
      },
      {
        name: "Chris Sharrock",
        role: "กลอง",
        image: "/images/bands/members/o_5.jpeg",
      },
    ],
  },

  {
    id: 3,
    name: "Paradox",
    genre: "Alternative Pop-Rock / Indie Rock",
    description:
      "ดนตรี Alternative Rock ที่เต็มไปด้วยความสนุก ความสร้างสรรค์ และความคาดเดาไม่ได้ ผสมผสานเพลงที่มีเมโลดี้ติดหูเข้ากับจังหวะที่สนุกและการนำเสนอที่แปลกใหม่ การแสดงสดเต็มไปด้วยพลังและสีสัน สามารถเปลี่ยนจากช่วงเวลาที่ซาบซึ้งไปสู่ความสนุกแบบหลุดโลกได้อย่างลงตัว ทำให้บรรยากาศของเพลงและการแสดงมีความโดดเด่นและจดจำได้ง่าย",
    image: "/images/bands/paradox.jpg",

    albums: [
      {
        name: "Summer",
        image: "/images/bands/albums/p1.jpeg",
      },
      {
        name: "Freestyle",
        image: "/images/bands/albums/p2.jpeg",
      },
      {
        name: "X (Ten Years After)",
        image: "/images/bands/albums/p3.jpeg",
      },
    ],

    members: [
      {
        name: "ต้า",
        role: "ร้องนำ / กีตาร์",
        image: "/images/bands/members/p_1.webp",
      },
      {
        name: "สอง",
        role: "เบส",
        image: "/images/bands/members/p_2.jpeg",
      },
      {
        name: "บิ๊ก",
        role: "กีตาร์",
        image: "/images/bands/members/p_3.jpeg",
      },
      {
        name: "โจอี้",
        role: "กลอง",
        image: "/images/bands/members/p_4.jpeg",
      },
    ],
  },
];