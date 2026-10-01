"use client";

// ใช้จัดการค่าฟอร์ม การ Submit และสถานะของฟอร์ม
import { useForm } from "react-hook-form";

// เชื่อม React Hook Form กับ Zod เพื่อตรวจสอบข้อมูล
import { zodResolver } from "@hookform/resolvers/zod";

// นำเข้าหมวดหมู่สินค้าและ Schema สำหรับตรวจสอบข้อมูล
import {
    CATEGORIES,
    ProductDraftSchema,
} from "@/lib/products";

// นำเข้า Type ของสินค้าและข้อมูลสำหรับเพิ่ม/แก้ไข
import type {
    Product,
    ProductDraft,
} from "@/lib/products";

// กำหนด Props ที่ Component รับเข้ามา
type ProductFormProps = {
    editing: Product | null;
    onSave: (draft: ProductDraft) => void;
    onCancel: () => void;
};

// Component สำหรับเพิ่มและแก้ไขสินค้า
export default function ProductForm({
    editing,
    onSave,
    onCancel,
}: ProductFormProps) {
    const {
        register,
        handleSubmit,
        reset,

        // errors = ข้อผิดพลาด, isDirty = มีการแก้ไขข้อมูล
        formState: {
            errors,
            isDirty,
        },
    } = useForm<ProductDraft>({
        // ตรวจสอบข้อมูลด้วย ProductDraftSchema
        resolver: zodResolver(
            ProductDraftSchema,
        ),

        // ตรวจสอบข้อมูลเมื่อผู้ใช้แตะและออกจากช่อง
        mode: "onTouched",

        // ถ้าแก้ไข ใช้ข้อมูลเดิม ถ้าเพิ่มใหม่ใช้ค่าว่าง
        defaultValues: editing
            ? {
                  title: editing.title,
                  price: editing.price,
                  stock: editing.stock,
                  category: editing.category,
                  thumbnail:
                      editing.thumbnail,
                  description:
                      editing.description ??
                      "",
              }
            : {
                  title: "",
                  price: undefined,
                  stock: undefined,
                  category: undefined,
                  thumbnail: "",
                  description: "",
              },
    });

    // รับข้อมูลจากฟอร์มแล้วส่งไปเพิ่มหรือแก้ไขสินค้า
    function saveProduct(
        values: ProductDraft,
    ) {
        onSave(values);

        // ล้างค่าฟอร์มหลังจากบันทึก
        reset({
            title: "",
            price: undefined,
            stock: undefined,
            category: undefined,
            thumbnail: "",
            description: "",
        });
    }

    return (
        <form
            className="product-form"
            onSubmit={handleSubmit(
                saveProduct,
            )}
            noValidate
        >
            {/* แสดงหัวข้อว่าเป็นการเพิ่มหรือแก้ไขสินค้า */}
            <h2>
                {editing
                    ? "แก้ไขสินค้า"
                    : "เพิ่มสินค้าใหม่"}
            </h2>

            {/* ชื่อสินค้า */}
            <div className="form-group">
                <label htmlFor="title">
                    ชื่อสินค้า
                </label>

                <input
                    id="title"
                    required
                    placeholder="กรอกชื่อสินค้า"
                    {...register("title")}
                    aria-invalid={
                        !!errors.title
                    }
                    aria-describedby="title-error"
                />

                {/* แสดง Error เมื่อชื่อสินค้าไม่ถูกต้อง */}
                {errors.title && (
                    <span
                        id="title-error"
                        className="form-error"
                        role="alert"
                    >
                        {errors.title.message}
                    </span>
                )}
            </div>

            {/* ราคา */}
            <div className="form-group">
                <label htmlFor="price">
                    ราคา
                </label>

                <input
                    id="price"
                    type="number"
                    step="0.01"
                    required
                    placeholder="กรอกราคา"
                    {...register("price", {
                        valueAsNumber: true,
                    })}
                    aria-invalid={
                        !!errors.price
                    }
                    aria-describedby="price-error"
                />

                {/* แสดง Error เมื่อราคาไม่ถูกต้อง */}
                {errors.price && (
                    <span
                        id="price-error"
                        className="form-error"
                        role="alert"
                    >
                        {errors.price.message}
                    </span>
                )}
            </div>

            {/* หมวดหมู่ */}
            <div className="form-group">
                <label htmlFor="category">
                    หมวดหมู่
                </label>

                <select
                    id="category"
                    required
                    {...register("category")}
                    aria-invalid={
                        !!errors.category
                    }
                    aria-describedby="category-error"
                >
                    <option value="">
                        กรุณาเลือกหมวดหมู่
                    </option>

                    {/* สร้างตัวเลือกจากรายการหมวดหมู่ */}
                    {CATEGORIES.map(
                        (name) => (
                            <option
                                key={name}
                                value={name}
                            >
                                {name}
                            </option>
                        ),
                    )}
                </select>

                {/* แสดง Error เมื่อไม่ได้เลือกหมวดหมู่ */}
                {errors.category && (
                    <span
                        id="category-error"
                        className="form-error"
                        role="alert"
                    >
                        {
                            errors.category
                                .message
                        }
                    </span>
                )}
            </div>

            {/* จำนวนสินค้า */}
            <div className="form-group">
                <label htmlFor="stock">
                    จำนวนคงเหลือ
                </label>

                <input
                    id="stock"
                    type="number"
                    required
                    placeholder="กรอกจำนวนสินค้า"
                    {...register("stock", {
                        valueAsNumber: true,
                    })}
                    aria-invalid={
                        !!errors.stock
                    }
                    aria-describedby="stock-error"
                />

                {/* แสดง Error เมื่อจำนวนสินค้าไม่ถูกต้อง */}
                {errors.stock && (
                    <span
                        id="stock-error"
                        className="form-error"
                        role="alert"
                    >
                        {errors.stock.message}
                    </span>
                )}
            </div>

            {/* รายละเอียดสินค้า */}
            <div className="form-group">
                <label htmlFor="description">
                    รายละเอียด
                </label>

                <textarea
                    id="description"
                    placeholder="กรอกรายละเอียดสินค้า"
                    {...register(
                        "description",
                    )}
                    aria-invalid={
                        !!errors.description
                    }
                    aria-describedby="description-error"
                />

                {/* แสดง Error เมื่อรายละเอียดไม่ถูกต้อง */}
                {errors.description && (
                    <span
                        id="description-error"
                        className="form-error"
                        role="alert"
                    >
                        {
                            errors.description
                                .message
                        }
                    </span>
                )}
            </div>

            {/* URL รูปภาพ */}
            <div className="form-group">
                <label htmlFor="thumbnail">
                    URL รูปภาพ
                </label>

                <input
                    id="thumbnail"
                    type="url"
                    required
                    placeholder="https://example.com/image.jpg"
                    {...register(
                        "thumbnail",
                    )}
                    aria-invalid={
                        !!errors.thumbnail
                    }
                    aria-describedby="thumbnail-error"
                />

                {/* แสดง Error เมื่อ URL รูปภาพไม่ถูกต้อง */}
                {errors.thumbnail && (
                    <span
                        id="thumbnail-error"
                        className="form-error"
                        role="alert"
                    >
                        {
                            errors.thumbnail
                                .message
                        }
                    </span>
                )}
            </div>

            {/* ปุ่มบันทึกและยกเลิก */}
            <div className="form-actions">
                <button
                    type="submit"
                    className="btn-save"
                    disabled={!isDirty}
                >
                    {editing
                        ? "บันทึกการแก้ไข"
                        : "เพิ่มสินค้า"}
                </button>

                {/* แสดงปุ่มยกเลิกเฉพาะตอนแก้ไข */}
                {editing && (
                    <button
                        type="button"
                        className="btn-cancel"
                        onClick={onCancel}
                    >
                        ยกเลิก
                    </button>
                )}
            </div>
        </form>
    );
}

