"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getCurrentUser, updateCurrentUser, User } from "@/api/core/users";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [updateMsg, setUpdateMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.accessToken) return setError("No token");
      setLoading(true);
      try {
        const u = await getCurrentUser(session.accessToken as string);
        setUser(u);
      } catch (e: any) {
        setError(e?.message || "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [session]);

  const handleToggleNotifications = async () => {
    if (!session?.accessToken || !user) return;
    setLoading(true);
    setUpdateMsg(null);
    try {
      await updateCurrentUser(session.accessToken as string, !user.email_notifications_enabled);
      setUser({ ...user, email_notifications_enabled: !user.email_notifications_enabled });
      setUpdateMsg("Notification preference updated successfully.");
    } catch (err: any) {
      setUpdateMsg(err?.message || "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: 24 }}>
      <h1 className="text-xl font-bold mb-4">Profile</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-danger mb-4">{error}</div>}
      {user && (
        <div style={{
          background: "#2563eb",
          padding: 24,
          borderRadius: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}>
          <img
            src={user.avatar}
            alt={user.username + "'s avatar"}
            style={{ width: 96, height: 96, borderRadius: "50%", border: "2px solid #ccc" }}
          />
          <div style={{ fontSize: 20, fontWeight: 600 }}>{user.username}</div>
          <div style={{ color: "#555", fontWeight: 500 }}>
            Email: {user.email}
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={!!user.email_notifications_enabled}
              onChange={handleToggleNotifications}
              disabled={loading}
            />
            Email notifications: {user.email_notifications_enabled ? 'ON' : 'OFF'}
          </label>
          {updateMsg && <div style={{ color: updateMsg.includes('success') ? 'green' : '#b91c1c', marginTop: 4 }}>{updateMsg}</div>}
          <div style={{ color: "#555" }}>
            <span style={{ fontWeight: 500 }}>GitHub ID:</span> {user.github_id}
          </div>
          <div style={{ color: "#888", fontSize: 12 }}>
            <span>Created at: {new Date(user.created_at).toLocaleString()}</span>
            <br />
            <span>Updated at: {user.updated_at ? new Date(user.updated_at).toLocaleString() : "-"}</span>
          </div>
        </div>
      )}
    </div>
  );
} 