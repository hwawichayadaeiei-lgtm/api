import { z } from "zod";

// รายชื่อหมวดหมู่สินค้าจาก DummyJSON
export const CATEGORIES = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "motorcycle",
    "skin-care",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "tablets",
    "tops",
    "vehicle",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
] as const;

// Schema สำหรับตรวจสอบข้อมูลสินค้า
export const ProductSchema = z.object({
    id: z.number(),

    title: z
        .string()
        .trim()
        .min(1, "กรุณากรอกชื่อสินค้า"),

    price: z
        .number({ error: "กรุณากรอกราคา" })
        .min(0, "ราคาต้องไม่ติดลบ"),

    stock: z
        .number({ error: "กรุณากรอกจำนวนคงเหลือ" })
        .int("จำนวนคงเหลือต้องเป็นจำนวนเต็ม")
        .min(0, "จำนวนคงเหลือต้องไม่ติดลบ"),

    category: z.enum(CATEGORIES, {
        error: "กรุณาเลือกหมวดหมู่",
    }),

    // รายละเอียดสินค้า
    description: z
        .string()
        .trim()
        .optional(),

    // URL รูปภาพหลักของสินค้า
    thumbnail: z
        .string()
        .url("กรุณาใส่ URL รูปภาพให้ถูกต้อง"),

    // รายละเอียดรีวิวของสินค้า
    reviews: z
        .array(
            z.object({
                rating: z.number(),
                comment: z.string(),
                date: z.string(),
                reviewerName: z.string(),
                reviewerEmail: z.string(),
            }),
        )
        .optional(),
});

// Schema สำหรับตรวจสอบรายการสินค้าและข้อมูลรวม
export const ProductListSchema = z.object({
    products: z.array(ProductSchema),
    total: z.number(),
    skip: z.number(),
    limit: z.number(),
});

// Schema สำหรับเพิ่ม/แก้ไข โดยไม่ต้องใช้ id
export const ProductDraftSchema = ProductSchema.omit({
    id: true,
});

export type ProductDraft = z.infer<typeof ProductDraftSchema>;

// สร้าง Type จาก Schema
export type Product = z.infer<typeof ProductSchema>;
export type ProductList = z.infer<typeof ProductListSchema>;

const API_BASE = "https://dummyjson.com";

// ฟิลด์ที่สามารถใช้เรียงข้อมูลได้
export const SORT_FIELDS = [
    "title",
    "price",
    "stock",
] as const;

// Schema สำหรับตรวจสอบข้อมูลการค้นหา
export const SearchQuerySchema = z.object({
    q: z.string().trim(),

    limit: z
        .number({ error: "กรุณากรอกจำนวนรายการ" })
        .int("จำนวนรายการต้องเป็นจำนวนเต็ม")
        .min(1, "อย่างน้อย 1 รายการ")
        .max(30, "ไม่เกิน 30 รายการ"),

    sortBy: z.enum(SORT_FIELDS),
});

export type SearchQuery = z.infer<typeof SearchQuerySchema>;

// กำหนดค่าเริ่มต้นของการค้นหา
export const defaultQuery: SearchQuery = {
    q: "",
    limit: 10,
    sortBy: "title",
};

// สร้าง URL สำหรับเรียก API ตามเงื่อนไขการค้นหา
export function buildProductUrl(query: SearchQuery): string {
    const params = new URLSearchParams();

    params.set("q", query.q);

    // กำหนดจำนวนรายการที่ต้องการ
    params.set("limit", String(query.limit));

    // กำหนดฟิลด์ที่ใช้เรียงข้อมูล
    params.set("sortBy", query.sortBy);
    params.set("order", "asc");

    // เลือกเฉพาะข้อมูลสินค้าที่ต้องการ
    params.set(
        "select",
        "id,title,price,stock,category,description,thumbnail,reviews",
    );

    console.log(
        "เรียกข้อมูลจาก URL:",
        `${API_BASE}/products/search?${params.toString()}`,
    );

    console.log(
        "เรียกข้อมูลด้วย Query:",
        query,
    );

    return `${API_BASE}/products/search?${params.toString()}`;
}

// เรียก API และตรวจสอบข้อมูลที่ได้รับ
export async function fetchProducts(
    query: SearchQuery,
): Promise<ProductList> {
    const response = await fetch(buildProductUrl(query));

    console.log(
        "สถานะการตอบกลับจาก API:",
        response,
    );

    // ตรวจสอบว่า API ตอบกลับสำเร็จหรือไม่
    if (!response.ok) {
        throw new Error(
            `เรียกข้อมูลไม่สำเร็จ สถานะ ${response.status}`,
        );
    }

    // แปลงข้อมูลที่ได้รับเป็น JSON
    const data = await response.json();

    console.log(
        "ข้อมูลที่ได้รับจาก API:",
        data,
    );

    // ตรวจสอบรูปแบบข้อมูลด้วย Zod
    const result = ProductListSchema.safeParse(data);

    if (!result.success) {
        console.error(
            "ข้อมูลไม่ผ่านการตรวจสอบ:",
            result.error,
        );

        throw new Error(
            "รูปแบบข้อมูลที่ได้รับไม่ตรงกับที่กำหนดไว้",
        );
    }

    return result.data;
}