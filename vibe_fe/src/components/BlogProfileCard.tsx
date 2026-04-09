import type { BlogProfile } from "../types/blog";
import { SubscriptionButton } from "./SubscriptionButton";

type BlogProfileCardProps = {
  profile: BlogProfile;
  subscriptionLoading?: boolean;
  subscriptionError?: string | null;
  onToggleSubscription?: () => void;
};

export function BlogProfileCard({
  profile,
  subscriptionLoading = false,
  subscriptionError = null,
  onToggleSubscription
}: BlogProfileCardProps) {
  return (
    <section className="blog-profile-card card">
      <div className="blog-profile-card__identity">
        <div className="blog-avatar">{profile.displayName.slice(0, 1)}</div>
        <div>
          <p className="blog-profile-card__eyebrow">@{profile.username}</p>
          <div className="blog-profile-card__title-row">
            <h1>{profile.blogTitle}</h1>
            {profile.isOwner ? <span className="blog-profile-card__owner-badge">내 블로그</span> : null}
          </div>
          <p>{profile.bio ?? "아직 소개글이 없습니다."}</p>
        </div>
        {!profile.isOwner && onToggleSubscription ? (
          <div className="blog-profile-card__subscription">
            <SubscriptionButton
              subscribed={profile.subscribedByMe}
              loading={subscriptionLoading}
              onClick={onToggleSubscription}
            />
            {subscriptionError ? <p className="helper-text blog-profile-card__subscription-error">{subscriptionError}</p> : null}
          </div>
        ) : null}
      </div>
      <div className="blog-profile-card__stats">
        <div>
          <strong>{profile.postCount}</strong>
          <span>게시글</span>
        </div>
        <div>
          <strong>{profile.subscriberCount}</strong>
          <span>구독자</span>
        </div>
      </div>
    </section>
  );
}
