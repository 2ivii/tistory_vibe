type SubscriptionButtonProps = {
  subscribed: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

export function SubscriptionButton({
  subscribed,
  loading = false,
  disabled = false,
  onClick
}: SubscriptionButtonProps) {
  const label = loading ? "처리중..." : subscribed ? "구독중" : "구독";
  const className = `subscribe-button${subscribed ? " subscribe-button--active" : ""}`;

  return (
    <button type="button" className={className} onClick={onClick} disabled={disabled || loading} aria-pressed={subscribed}>
      {label}
    </button>
  );
}
