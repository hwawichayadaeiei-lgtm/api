// นำ Component ProductExplorer มาใช้สำหรับแสดงรายการสินค้า
import ProductExplorer from "@/components/ProductExplorer";

// หน้าแสดงรายการสินค้า ที่เส้นทาง /products
export default function ProductsPage() {
    // แสดง ProductExplorer ในหน้ารายการสินค้า
    return <ProductExplorer />;
}