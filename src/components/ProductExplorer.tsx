"use client";

import { useEffect, useState } from "react";

// นำเข้า API และค่าค้นหาเริ่มต้น
import {
    defaultQuery,
    fetchProducts,
} from "@/lib/products";

// นำเข้า Type ของข้อมูลสินค้า
import type {
    Product,
    ProductDraft,
    ProductList,
    SearchQuery,
} from "@/lib/products";

// นำเข้า Component ฟอร์มเพิ่ม/แก้ไข และฟอร์มค้นหา
import ProductForm from "./ProductForm";
import ProductSearchForm from "./ProductSearchForm";

// กำหนดสถานะของการโหลดข้อมูล
type LoadState =
    | "idle"
    | "loading"
    | "error"
    | "ready";

export default function ProductExplorer() {
    // เก็บรายการสินค้าที่แสดงบนหน้าเว็บ
    const [products, setProducts] =
        useState<Product[]>([]);

    // เก็บสถานะการโหลดข้อมูล
    const [status, setStatus] =
        useState<LoadState>("idle");

    // เก็บข้อความ Error เมื่อโหลดข้อมูลไม่สำเร็จ
    const [errorMessage, setErrorMessage] =
        useState("");

    // เก็บสินค้าที่กำลังแก้ไข
    const [editingProduct, setEditingProduct] =
        useState<Product | null>(null);

    // แสดงผลเมื่อโหลดข้อมูลสำเร็จ
    function showResult(list: ProductList) {
        setProducts(list.products);
        setStatus("ready");

        console.log(
            "พบสินค้า",
            list.products.length,
            "รายการ จากทั้งหมด",
            list.total,
            "รายการ",
        );
    }

    // แสดงข้อความ Error เมื่อเกิดข้อผิดพลาด
    function showError(error: unknown) {
        setErrorMessage(
            error instanceof Error
                ? error.message
                : "เรียกข้อมูลไม่สำเร็จ",
        );

        setStatus("error");
    }

    // โหลดสินค้าตามเงื่อนไขที่ผู้ใช้ค้นหา
    async function loadProducts(
        query: SearchQuery,
    ) {
        setStatus("loading");
        setErrorMessage("");

        try {
            // เรียกข้อมูลสินค้าจาก API
            const result =
                await fetchProducts(query);

            // นำข้อมูลที่ได้มาแสดง
            showResult(result);
        } catch (error) {
            // ถ้าเกิด Error ให้แสดงข้อความ
            showError(error);
        }
    }

    // โหลดข้อมูลเริ่มต้นเมื่อเปิดหน้าเว็บ
    useEffect(() => {
        fetchProducts(defaultQuery)
            .then(showResult)
            .catch(showError);
    }, []);

    // เพิ่มสินค้าใหม่ หรือแก้ไขสินค้าที่มีอยู่
    function saveProduct(
        draft: ProductDraft,
    ) {
        if (editingProduct) {
            // แก้ไขข้อมูลสินค้าที่เลือก
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id ===
                    editingProduct.id
                        ? {
                              ...product,
                              ...draft,
                          }
                        : product,
                ),
            );

            // ออกจากโหมดแก้ไข
            setEditingProduct(null);
        } else {
            // เพิ่มสินค้าใหม่เข้าไปในรายการ
            setProducts((prevProducts) => [
                ...prevProducts,
                {
                    ...draft,
                    id: Date.now(),
                    reviews: [],
                },
            ]);
        }

        // เปลี่ยนสถานะเป็นพร้อมแสดงผล
        setStatus("ready");
    }

    // ลบสินค้าตาม id
    function deleteProduct(id: number) {
        // ถ้าผู้ใช้ยกเลิกการลบ ให้หยุดการทำงาน
        if (
            !window.confirm(
                "ต้องการลบสินค้านี้หรือไม่?",
            )
        ) {
            return;
        }

        // ลบสินค้าที่มี id ตรงกัน
        setProducts((prevProducts) =>
            prevProducts.filter(
                (product) =>
                    product.id !== id,
            ),
        );
    }

    return (
        <main>
            {/* หัวข้อหลักของหน้า */}
            <h1>รายการสินค้า</h1>

            {/* ฟอร์มสำหรับเพิ่มหรือแก้ไขสินค้า */}
            <ProductForm
                key={
                    editingProduct?.id ??
                    "new"
                }
                editing={editingProduct}
                onSave={saveProduct}
                onCancel={() =>
                    setEditingProduct(null)
                }
            />

            {/* ฟอร์มสำหรับค้นหาสินค้า */}
            <ProductSearchForm
                onSearch={loadProducts}
            />

            {/* ปุ่มสำหรับโหลดข้อมูลเริ่มต้น */}
            <button
                type="button"
                onClick={() =>
                    loadProducts(defaultQuery)
                }
                disabled={
                    status === "loading"
                }
            >
                {status === "loading"
                    ? "กำลังโหลด..."
                    : "โหลดข้อมูล"}
            </button>

            {/* ส่วนแสดงสถานะและรายการสินค้า */}
            <section aria-live="polite">
                {/* แสดงเมื่อยังไม่มีการโหลดข้อมูล */}
                {status === "idle" && (
                    <p>
                        กรุณาคลิกปุ่มเพื่อโหลด
                        ข้อมูลสินค้า
                    </p>
                )}

                {/* แสดงระหว่างกำลังโหลดข้อมูล */}
                {status === "loading" && (
                    <p>
                        กำลังโหลดข้อมูล...
                    </p>
                )}

                {/* แสดงเมื่อเกิดข้อผิดพลาด */}
                {status === "error" && (
                    <p role="alert">
                        {errorMessage}
                    </p>
                )}

                {/* แสดงเมื่อค้นหาแล้วไม่พบสินค้า */}
                {status === "ready" &&
                    products.length === 0 && (
                        <p>
                            ไม่พบสินค้าที่ตรง
                            เงื่อนไข
                        </p>
                    )}

                {/* แสดงรายการสินค้าเมื่อโหลดสำเร็จ */}
                {status === "ready" &&
                    products.length > 0 && (
                        <div className="product-grid">
                            {products.map(
                                (item) => {
                                    // เตรียมข้อมูลรีวิว
                                    const reviews =
                                        item.reviews ??
                                        [];

                                    // คำนวณคะแนนรีวิวเฉลี่ย
                                    const averageRating =
                                        reviews.length >
                                        0
                                            ? (
                                                  reviews.reduce(
                                                      (
                                                          total,
                                                          review,
                                                      ) =>
                                                          total +
                                                          review.rating,
                                                      0,
                                                  ) /
                                                  reviews.length
                                              ).toFixed(
                                                  1,
                                              )
                                            : "ไม่มี";

                                    return (
                                        <article
                                            className="product-card"
                                            key={
                                                item.id
                                            }
                                        >
                                            {/* รูปภาพสินค้า */}
                                            <img
                                                src={
                                                    item.thumbnail
                                                }
                                                alt={
                                                    item.title
                                                }
                                                className="product-image"
                                                onError={(
                                                    event,
                                                ) => {
                                                    // ซ่อนรูปเมื่อโหลดรูปไม่สำเร็จ
                                                    event.currentTarget.style.display =
                                                        "none";

                                                    console.log(
                                                        "โหลดรูปไม่สำเร็จ:",
                                                        item.thumbnail,
                                                    );
                                                }}
                                            />

                                            <div className="product-card-content">
                                                {/* แสดงหมวดหมู่สินค้า */}
                                                <span className="product-category">
                                                    {
                                                        item.category
                                                    }
                                                </span>

                                                {/* ชื่อสินค้า */}
                                                <h2>
                                                    {
                                                        item.title
                                                    }
                                                </h2>

                                                {/* รายละเอียดสินค้า */}
                                                <p className="product-description">
                                                    {
                                                        item.description
                                                    }
                                                </p>

                                                {/* ราคาสินค้า */}
                                                <p>
                                                    <strong>
                                                        ราคา:
                                                    </strong>{" "}
                                                    {
                                                        item.price
                                                    }{" "}
                                                    บาท
                                                </p>

                                                {/* จำนวนสินค้าที่เหลือ */}
                                                <p>
                                                    <strong>
                                                        คงเหลือ:
                                                    </strong>{" "}
                                                    {
                                                        item.stock
                                                    }{" "}
                                                    ชิ้น
                                                </p>

                                                {/* คะแนนรีวิวเฉลี่ย */}
                                                <div className="review-tag">
                                                    ⭐{" "}
                                                    {
                                                        averageRating
                                                    }{" "}
                                                    / 5 (
                                                    {
                                                        reviews.length
                                                    }{" "}
                                                    รีวิว)
                                                </div>

                                                {/* แสดงรีวิวสูงสุด 2 รายการ */}
                                                {reviews.length >
                                                    0 && (
                                                    <div className="reviews">
                                                        <h3>
                                                            รีวิว
                                                        </h3>

                                                        {reviews
                                                            .slice(
                                                                0,
                                                                2,
                                                            )
                                                            .map(
                                                                (
                                                                    review,
                                                                    index,
                                                                ) => (
                                                                    <div
                                                                        className="review"
                                                                        key={`${item.id}-${index}`}
                                                                    >
                                                                        {/* คะแนนของรีวิว */}
                                                                        <p>
                                                                            ⭐{" "}
                                                                            {
                                                                                review.rating
                                                                            }{" "}
                                                                            / 5
                                                                        </p>

                                                                        {/* ข้อความรีวิว */}
                                                                        <p>
                                                                            {
                                                                                review.comment
                                                                            }
                                                                        </p>

                                                                        {/* ชื่อผู้รีวิว */}
                                                                        <small>
                                                                            {
                                                                                review.reviewerName
                                                                            }
                                                                        </small>
                                                                    </div>
                                                                ),
                                                            )}
                                                    </div>
                                                )}

                                                {/* ปุ่มแก้ไขและลบสินค้า */}
                                                <div className="product-actions">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setEditingProduct(
                                                                item,
                                                            )
                                                        }
                                                    >
                                                        แก้ไข
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            deleteProduct(
                                                                item.id,
                                                            )
                                                        }
                                                    >
                                                        ลบ
                                                    </button>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                },
                            )}
                        </div>
                    )}
            </section>
        </main>
    );
}

