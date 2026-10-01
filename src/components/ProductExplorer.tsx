"use client";

import { useEffect, useState } from "react";
import { defaultQuery, fetchProducts } from "@/lib/products";
import type {
    Product,
    ProductDraft,
    ProductList,
    SearchQuery,
} from "@/lib/products";
import ProductSearchForm from "./ProductSearchForm";
import ProductForm from "./ProductForm";

type LoadState = "idle" | "loading" | "error" | "ready";

export default function ProductExplorer() {
    const [products, setProducts] = useState<Product[]>([]);
    const [status, setStatus] = useState<LoadState>("idle");
    const [errorMessage, setErrorMessage] = useState("");

    // เก็บสินค้าที่กำลังแก้ไข
    const [editingProduct, setEditingProduct] =
        useState<Product | null>(null);

    function showResult(list: ProductList) {
        setProducts(list.products);
        setStatus("ready");

        // console.log('พบสินค้า', list.products.length, 'รายการ จากทั้งหมด', list.total, 'รายการ');
        console.log(products);
    }

    function showError(error: unknown) {
        setErrorMessage(
            error instanceof Error
                ? error.message
                : "เรียกข้อมูลไม่สำเร็จ",
        );
        setStatus("error");
    }

    async function loadProducts(query: SearchQuery) {
        setStatus("loading");
        setErrorMessage("");

        try {
            showResult(await fetchProducts(query));
        } catch (error) {
            showError(error);
        }
    }

    useEffect(() => {
        fetchProducts(defaultQuery)
            .then(showResult)
            .catch(showError);
    }, []);

    function saveProduct(draft: ProductDraft) {
        // ถ้ามีสินค้าที่กำลังแก้ไข
        if (editingProduct) {
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === editingProduct.id
                        ? {
                              ...product,
                              ...draft,
                          }
                        : product,
                ),
            );

            setEditingProduct(null);
        } else {
            // เพิ่มสินค้าใหม่
            setProducts((prevProducts) => [
                ...prevProducts,
                {
                    ...draft,
                    id: Date.now(),
                    thumbnail:
                        "https://dummyjson.com/image/200x200",
                    description: "",
                    reviews: [],
                },
            ]);
        }

        setStatus("ready");
    }

    // ลบสินค้า
    function deleteProduct(id: number) {
        if (!window.confirm("ต้องการลบสินค้านี้หรือไม่?")) {
            return;
        }

        setProducts((prevProducts) =>
            prevProducts.filter(
                (product) => product.id !== id,
            ),
        );
    }

    return (
        <main>
            <h1>รายการสินค้า</h1>

            <ProductSearchForm onSearch={loadProducts} />

            <button
                type="button"
                onClick={() => loadProducts(defaultQuery)}
                disabled={status === "loading"}
            >
                {status === "loading"
                    ? "กำลังโหลด..."
                    : "โหลดข้อมูล"}
            </button>

            {/* ส่วนแสดงผล เขียนเพิ่มในหัวข้อ 1.7 */}
            <section aria-live="polite">
                {status === "idle" && (
                    <p>กรุณาคลิกปุ่มเพื่อโหลดข้อมูลสินค้า</p>
                )}

                {status === "loading" && (
                    <p>กำลังโหลดข้อมูล...</p>
                )}

                {status === "error" && (
                    <p role="alert">{errorMessage}</p>
                )}

                {status === "ready" && products.length === 0 && (
                    <p>ไม่พบสินค้าที่ตรงเงื่อนไข</p>
                )}

                {status === "ready" && products.length > 0 && (
                    <div className="product-grid">
                        {products.map((item) => {
                            const reviews = item.reviews ?? [];

                            const averageRating =
                                reviews.length > 0
                                    ? (
                                          reviews.reduce(
                                              (total, review) =>
                                                  total +
                                                  review.rating,
                                              0,
                                          ) /
                                          reviews.length
                                      ).toFixed(1)
                                    : "ไม่มี";

                            return (
                                <article
                                    className="product-card"
                                    key={item.id}
                                >
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="product-image"
                                    />

                                    <div className="product-card-content">
                                        <span className="product-category">
                                            {item.category}
                                        </span>

                                        <h2>
                                            {item.title}
                                        </h2>

                                        <p className="product-description">
                                            {item.description}
                                        </p>

                                        <p>
                                            <strong>
                                                ราคา:
                                            </strong>{" "}
                                            {item.price} บาท
                                        </p>

                                        <p>
                                            <strong>
                                                คงเหลือ:
                                            </strong>{" "}
                                            {item.stock} ชิ้น
                                        </p>

                                        <div className="review-tag">
                                            ⭐{" "}
                                            {averageRating} / 5
                                            {" "}
                                            ({reviews.length} รีวิว)
                                        </div>

                                        {reviews.length > 0 && (
                                            <div className="reviews">
                                                <h3>รีวิว</h3>

                                                {reviews
                                                    .slice(0, 2)
                                                    .map(
                                                        (
                                                            review,
                                                            index,
                                                        ) => (
                                                            <div
                                                                className="review"
                                                                key={`${item.id}-${index}`}
                                                            >
                                                                <p>
                                                                    ⭐{" "}
                                                                    {
                                                                        review.rating
                                                                    }{" "}
                                                                    / 5
                                                                </p>

                                                                <p>
                                                                    {
                                                                        review.comment
                                                                    }
                                                                </p>

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
                        })}
                    </div>
                )}
            </section>

            <div>
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
            </div>
        </main>
    );
}