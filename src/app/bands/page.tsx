"use client";

import { useState, type ChangeEvent } from "react";
import BandCard from "@/components/BandCard";
import { bands } from "@/data/bands";

export default function BandsPage() {
  // คำค้นหา
  const [keyword, setKeyword] = useState("");

  // วงที่ติดตาม
  const [followingIds, setFollowingIds] = useState<number[]>([]);

  // จำนวน Like ของแต่ละวง
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});

  // ค้นหาชื่อวง
  function handleKeywordChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    setKeyword(event.target.value);
  }

  // Follow / Unfollow
  function handleToggleFollow(id: number) {
    setFollowingIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((bandId) => bandId !== id);
      }

      return [...prev, id];
    });
  }

  // Like
  function handleLike(id: number) {
    setLikeCounts((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) + 1,
    }));
  }

  // Filter วงตามชื่อ
  const filteredBands = bands.filter((band) =>
    band.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <main className="bands-page">
      {/* หัวข้อ */}
      <h1>Favorite Bands</h1>

      {/* Search */}
      <div className="search-box">
        <input
          type="search"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหาชื่อวงดนตรี..."
        />

        <button
          type="button"
          className="clear-search-button"
          onClick={() => setKeyword("")}
        >
          ล้างการค้นหา
        </button>
      </div>

      {/* จำนวนวงที่ติดตาม */}
      <p className="following-count">
        ติดตามอยู่ <strong>{followingIds.length}</strong> วง
      </p>

      {/* Empty State */}
      {filteredBands.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">⌕</div>
          <h2>ไม่พบวงดนตรี</h2>
          <p>
            ไม่พบวงดนตรีที่ตรงกับ "{keyword}"
          </p>

          <button
            type="button"
            className="empty-clear-button"
            onClick={() => setKeyword("")}
          >
            แสดงวงดนตรีทั้งหมด
          </button>
        </div>
      ) : (
        <section className="band-grid">
          {filteredBands.map((band) => (
            <BandCard
              key={band.id}
              band={band}
              isFollowing={followingIds.includes(band.id)}
              likeCount={likeCounts[band.id] ?? 0}
              onToggleFollow={handleToggleFollow}
              onLike={handleLike}
            />
          ))}
        </section>
      )}
    </main>
  );
}