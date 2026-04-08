import type { BlogProfile } from "../types/blog";

type BlogProfileCardProps = {
  profile: BlogProfile;
};

export function BlogProfileCard({ profile }: BlogProfileCardProps) {
  return (
    <section className="blog-profile-card card">
      <div className="blog-profile-card__identity">
        <div className="blog-avatar">{profile.displayName.slice(0, 1)}</div>
        <div>
          <p className="blog-profile-card__eyebrow">@{profile.username}</p>
          <h1>{profile.blogTitle}</h1>
          <p>{profile.bio}</p>
        </div>
      </div>
      <div className="blog-profile-card__stats">
        <div>
          <strong>{profile.postCount}</strong>
          <span>게시글</span>
        </div>
        <div>
          <strong>{profile.followerCount}</strong>
          <span>구독자</span>
        </div>
        <div>
          <strong>{profile.todayVisitorCount}</strong>
          <span>오늘 방문</span>
        </div>
      </div>
    </section>
  );
}
