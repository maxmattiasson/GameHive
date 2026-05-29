import styles from "./Notifications.module.css";
import { useNotifications } from "../../hooks/useNotifications";

const typeClass: Record<string, string> = {
  info: styles.appMessageInfo,
  success: styles.appMessageSuccess,
  warning: styles.appMessageWarning,
  error: styles.appMessageError,
};

export function Notifications() {
  const { notifications, dismiss } = useNotifications();

  return (
    <div
      className={styles.notificationsBox}
      role="region"
      aria-live="polite"
      aria-label="Notifications"
    >
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`${styles.appMessage} ${typeClass[notif.type || "info"]}`}
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
            className={styles.appMessageClose}
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
