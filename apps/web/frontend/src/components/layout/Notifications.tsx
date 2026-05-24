import "./Notifications.css";
import { useNotifications } from "../../contexts/NotificationsContext";

export function Notifications() {
  const { notifications, dismiss } = useNotifications();

  return (
    <div
      className="notifications-box"
      role="region"
      aria-live="polite"
      aria-label="Notifications"
    >
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`app-message app-message--${notif.type || "info"}`}
          onClick={() => dismiss(notif.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              dismiss(notif.id);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`${notif.type} notification: ${notif.message}`}
        >
          <p>{notif.message}</p>
          <button
            type="button"
            className="app-message__close"
            onClick={(e) => {
              e.stopPropagation();
              dismiss(notif.id);
            }}
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}