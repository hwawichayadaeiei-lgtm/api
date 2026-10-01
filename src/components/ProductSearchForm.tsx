"use client";

// ใช้สร้างและจัดการฟอร์ม พร้อมตรวจสอบข้อมูลด้วย Zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// นำเข้า Schema สำหรับตรวจสอบข้อมูล
// และค่าที่ใช้สำหรับเรียงข้อมูลกับค่าเริ่มต้นของฟอร์ม
import {
    SORT_FIELDS,
    SearchQuerySchema,
    defaultQuery,
} from "@/lib/products";

// นำเข้า Type ของข้อมูลการค้นหา
import type { SearchQuery } from "@/lib/products";

// กำหนด Props ของฟอร์มค้นหา
// onSearch ใช้ส่งค่าที่ผู้ใช้กรอกไปค้นหาสินค้า
type ProductSearchFormProps = {
    onSearch: (query: SearchQuery) => Promise<void>;
};

// Component สำหรับสร้างฟอร์มค้นหาสินค้า
export default function ProductSearchForm({
    onSearch,
}: ProductSearchFormProps) {
    // สร้างฟอร์มและเชื่อมกับ Zod Schema
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<SearchQuery>({
        resolver: zodResolver(SearchQuerySchema),
        mode: "onTouched",
        defaultValues: defaultQuery,
    });

    return (
        // เมื่อกดค้นหา จะส่งข้อมูลไปยัง onSearch
        <form
            className="product-search-form"
            onSubmit={handleSubmit(onSearch)}
        >
            {/* ช่องสำหรับกรอกคำค้นหา */}
            <div className="search-group">
                <label htmlFor="q">
                    คำค้น
                </label>

                <input
                    id="q"
                    {...register("q")}
                    placeholder="phone"
                />
            </div>

            {/* ช่องกำหนดจำนวนสินค้าที่ต้องการแสดง */}
            <div className="search-group">
                <label htmlFor="limit">
                    จำนวนรายการ
                </label>

                <input
                    id="limit"
                    type="number"
                    {...register("limit", {
                        valueAsNumber: true,
                    })}
                />

                {/* แสดงข้อความเมื่อจำนวนรายการไม่ถูกต้อง */}
                {errors.limit && (
                    <span
                        id="limit-error"
                        className="search-error"
                        role="alert"
                    >
                        {errors.limit.message}
                    </span>
                )}
            </div>

            {/* ช่องเลือกฟิลด์สำหรับเรียงข้อมูล */}
            <div className="search-group">
                <label htmlFor="sortBy">
                    เรียงตาม
                </label>

                <select
                    id="sortBy"
                    {...register("sortBy")}
                >
                    {/* สร้างตัวเลือกจาก SORT_FIELDS */}
                    {SORT_FIELDS.map(
                        (field) => (
                            <option
                                key={field}
                                value={field}
                            >
                                {field}
                            </option>
                        ),
                    )}
                </select>
            </div>

            {/* ปุ่มค้นหา */}
            <button
                type="submit"
                className="search-button"
                disabled={isSubmitting}
            >
                {isSubmitting
                    ? "กำลังค้นหา"
                    : "ค้นหา"}
            </button>
        </form>
    );
}


