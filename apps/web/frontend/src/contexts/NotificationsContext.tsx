import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";

type NotificationType = "info" | "success" | "error" | "warning";

export type Notification = {
  id: string;
  message: string;
  type?: NotificationType;
  duration?: number; // ms, 0 = persist until dismissed
};

type NotificationsContextType = {
  notifications: Notification[];
  notify: (message: string, opts?: Partial<Omit<Notification, "id" | "message">>) => string;
  dismiss: (id: string) => void;
  clearAll: () => void;
};

export const NotificationsContext = createContext<NotificationsContextType | null>(null);

const DEFAULT_DURATION = 4000;

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const timersRef = useRef<Map<string, number>>(new Map());

  const scheduleDismiss = useCallback((id: string, duration: number) => {
    if (duration <= 0) return;
    const timer = window.setTimeout(() => {
      setNotifications((s) => s.filter((n) => n.id !== id));
      timersRef.current.delete(id);
    }, duration);
    timersRef.current.set(id, timer);
  }, []);

  const notify = useCallback(
    (message: string, opts?: Partial<Omit<Notification, "id" | "message">>) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const notif: Notification = {
        id,
        message,
        type: opts?.type ?? "info",
        duration: typeof opts?.duration === "number" ? opts.duration : DEFAULT_DURATION
      };
      setNotifications((s) => [notif, ...s]);
      scheduleDismiss(id, notif.duration ?? DEFAULT_DURATION);
      return id;
    },
    [scheduleDismiss]
  );

  const dismiss = useCallback((id: string) => {
    setNotifications((s) => s.filter((n) => n.id !== id));
    const timer = timersRef.current.get(id);
    if (timer !== undefined) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current.clear();
  }, []);

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
    };
  }, []);

  return (
    <NotificationsContext.Provider value={{ notifications, notify, dismiss, clearAll }}>
      {children}
    </NotificationsContext.Provider>
  );
}
