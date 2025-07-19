"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getAllNotifications, deleteNotificationById, deleteAllNotifications, Notification } from "@/api/core/notifications";
import { getCurrentUser, updateCurrentUser, User } from "@/api/core/users";

export default function NotificationsPage() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [notifLoading, setNotifLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notifError, setNotifError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.accessToken) return setError("No token");
      setLoading(true);
      try {
        const [n, u] = await Promise.all([
          getAllNotifications(session.accessToken as string),
          getCurrentUser(session.accessToken as string),
        ]);
        setNotifications(n);
        setUser(u);
      } catch (e: any) {
        setError(e?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [session]);

  const handleToggleNotifications = async () => {
    if (!session?.accessToken || !user) return;
    setLoading(true);
    try {
      await updateCurrentUser(session.accessToken as string, !user.email_notifications_enabled);
      setUser({ ...user, email_notifications_enabled: !user.email_notifications_enabled });
    } catch (e: any) {
      setError(e?.message || "Failed to toggle notifications");
    } finally {
      setLoading(false);
    }
  };

  const handleDismissNotification = async (id: number) => {
    if (!session?.accessToken) return;
    setNotifLoading(true);
    try {
      await deleteNotificationById(id, session.accessToken as string);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (e: any) {
      setNotifError(e?.message || "Failed to dismiss notification");
    } finally {
      setNotifLoading(false);
    }
  };

  const handleDismissAll = async () => {
    if (!session?.accessToken) return;
    setNotifLoading(true);
    try {
      await deleteAllNotifications(session.accessToken as string);
      setNotifications([]);
    } catch (e: any) {
      setNotifError(e?.message || "Failed to dismiss all notifications");
    } finally {
      setNotifLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto", padding: 24 }}>
      <h1 className="text-xl font-bold mb-4">Notifications</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-danger mb-4">{error}</div>}
      {user && (
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={!!user.email_notifications_enabled}
              onChange={handleToggleNotifications}
              disabled={loading}
            />
            Email notifications: {user.email_notifications_enabled ? 'ON' : 'OFF'}
          </label>
        </div>
      )}
      <div style={{ marginBottom: 16 }}>
        <button
          onClick={handleDismissAll}
          disabled={notifLoading || notifications.length === 0}
          style={{
            background: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            padding: '6px 16px',
            fontWeight: 600,
            cursor: notifications.length === 0 ? 'not-allowed' : 'pointer',
            opacity: notifications.length === 0 ? 0.5 : 1,
          }}
        >
          Dismiss all
        </button>
      </div>
      {notifError && <div className="text-danger mb-2">{notifError}</div>}
      {notifications.length === 0 ? (
        <div>No notifications.</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {notifications.map((n) => (
            <li key={n.id} style={{
              background: '#2563eb',
              borderRadius: 8,
              marginBottom: 16,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}>
              <div style={{ fontWeight: 600 }}>{n.task.title || 'Untitled task'}</div>
              <div style={{ color: '#555', fontSize: 14 }}>{n.task.description}</div>
              <div style={{ color: '#888', fontSize: 12 }}>
                Task ID: {n.task_id} | Created: {new Date(n.created_at).toLocaleString()}
              </div>
              <button
                onClick={() => handleDismissNotification(n.id)}
                disabled={notifLoading}
                style={{
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  padding: '4px 12px',
                  fontWeight: 600,
                  cursor: notifLoading ? 'not-allowed' : 'pointer',
                  alignSelf: 'flex-end',
                  marginTop: 8,
                }}
              >
                Dismiss
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 