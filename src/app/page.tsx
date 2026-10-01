// นำเข้า Component สำหรับแสดงรายการสินค้า
import ProductExplorer from "@/components/ProductExplorer";

// Component หลักของหน้าแรก
export default function Home() {
  // แสดง ProductExplorer ในหน้าแรก
  return <ProductExplorer />;
}