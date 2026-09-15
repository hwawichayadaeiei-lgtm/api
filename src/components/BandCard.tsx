"use client";

import Image from "next/image";
import type { Band } from "@/types/band";

type BandCardProps = {
  band: Band;
  isFollowing: boolean;
  likeCount: number;
  onToggleFollow: (id: number) => void;
  onLike: (id: number) => void;
};

export default function BandCard({
  band,
  isFollowing,
  likeCount,
  onToggleFollow,
  onLike,
}: BandCardProps) {
  return (
    <article className="band-card">
      {/* รูปวง */}
      <Image
        src={band.image}
        alt={band.name}
        width={400}
        height={300}
        sizes="(max-width: 768px) 100vw, 400px"
      />

      {/* ชื่อวง */}
      <h2>{band.name}</h2>

      {/* แนวเพลง */}
      <p>แนวเพลง: {band.genre}</p>

      {/* รายละเอียดวง */}
      <p>{band.description}</p>

      {/* จำนวนสมาชิก */}
      <p>สมาชิก {band.members.length} คน</p>

      {/* ปุ่มติดตามและ Like */}
      <div className="band-actions">
        <button
          type="button"
          className={`follow-button ${isFollowing ? "following" : ""}`}
          onClick={() => onToggleFollow(band.id)}
        >
          {isFollowing ? "✓ กำลังติดตาม" : "+ ติดตาม"}
        </button>

        <button
          type="button"
          className="like-button"
          onClick={() => onLike(band.id)}
        >
          ♥ Like {likeCount}
        </button>
      </div>

      {/* อัลบั้ม */}
      <h3>อัลบั้มแนะนำ</h3>

      <div className="album-grid">
        {band.albums.map((album) => (
          <div className="album-card" key={album.name}>
            <Image
              src={album.image}
              alt={album.name}
              width={120}
              height={120}
              sizes="120px"
            />

            <p>{album.name}</p>
          </div>
        ))}
      </div>

      {/* สมาชิก */}
      <h3>สมาชิก</h3>

      <div className="member-list">
        {band.members.map((member) => (
          <div className="member-card" key={member.name}>
            {member.image && (
              <Image
                src={member.image}
                alt={member.name}
                width={50}
                height={50}
                sizes="50px"
              />
            )}

            <div className="member-info">
              <strong>{member.name}</strong>
              <span>{member.role}</span>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}