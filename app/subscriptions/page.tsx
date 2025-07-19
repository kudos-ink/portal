"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  getSubscriptions,
  createSubscription,
  deleteSubscription,
  Subscription,
} from "@/api/core/subscriptions";

export default function SubscriptionsPage() {
  const { data: session } = useSession();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ purpose: "", stack_level: "", technology: "" });
  const [formMsg, setFormMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubs = async () => {
      if (!session?.accessToken) return setError("No token");
      setLoading(true);
      try {
        const subs = await getSubscriptions(session.accessToken as string);
        setSubscriptions(subs);
      } catch (e: any) {
        setError(e?.message || "Failed to fetch subscriptions");
      } finally {
        setLoading(false);
      }
    };
    fetchSubs();
  }, [session]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.accessToken) return;
    setFormMsg(null);
    setLoading(true);
    try {
      const data: any = {};
      if (form.purpose) data.purpose = form.purpose;
      if (form.stack_level) data.stack_level = form.stack_level;
      if (form.technology) data.technology = form.technology;
      if (!data.purpose && !data.stack_level && !data.technology) {
        setFormMsg("Please select at least one field.");
        setLoading(false);
        return;
      }
      const sub = await createSubscription(session.accessToken as string, data);
      setSubscriptions((prev) => [...prev, sub]);
      setForm({ purpose: "", stack_level: "", technology: "" });
      setFormMsg("Subscription added.");
    } catch (e: any) {
      setFormMsg(e?.message || "Failed to add subscription");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (sub: Subscription) => {
    if (!session?.accessToken) return;
    setLoading(true);
    setFormMsg(null);
    try {
      await deleteSubscription(session.accessToken as string, {
        purpose: sub.purpose || undefined,
        stack_level: sub.stack_level || undefined,
        technology: sub.technology || undefined,
      });
      setSubscriptions((prev) => prev.filter((s) => s.id !== sub.id));
      setFormMsg("Subscription deleted.");
    } catch (e: any) {
      setFormMsg(e?.message || "Failed to delete subscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto", padding: 24 }}>
      <h1 className="text-xl font-bold mb-4">Subscriptions</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-danger mb-4">{error}</div>}
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Purpose"
          value={form.purpose}
          onChange={e => setForm(f => ({ ...f, purpose: e.target.value }))}
          style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc', flex: 1 }}
        />
        <input
          type="text"
          placeholder="Stack Level"
          value={form.stack_level}
          onChange={e => setForm(f => ({ ...f, stack_level: e.target.value }))}
          style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc', flex: 1 }}
        />
        <input
          type="text"
          placeholder="Technology"
          value={form.technology}
          onChange={e => setForm(f => ({ ...f, technology: e.target.value }))}
          style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc', flex: 1 }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: 6, padding: '6px 16px', fontWeight: 600 }}
        >
          Add
        </button>
      </form>
      {formMsg && <div style={{ color: formMsg.includes('add') || formMsg.includes('deleted') ? 'green' : '#b91c1c', marginBottom: 16 }}>{formMsg}</div>}
      <h2 className="text-lg font-semibold mb-2">Current Subscriptions</h2>
      {subscriptions.length === 0 ? (
        <div>No subscriptions.</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {subscriptions.map((sub) => (
            <li key={sub.id} style={{
              background: '#2563eb',
              borderRadius: 8,
              marginBottom: 16,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}>
              <div><b>Purpose:</b> {sub.purpose || '-'}</div>
              <div><b>Stack Level:</b> {sub.stack_level || '-'}</div>
              <div><b>Technology:</b> {sub.technology || '-'}</div>
              <div style={{ color: '#888', fontSize: 12 }}>Created: {new Date(sub.created_at).toLocaleString()}</div>
              <button
                onClick={() => handleDelete(sub)}
                disabled={loading}
                style={{
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  padding: '4px 12px',
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  alignSelf: 'flex-end',
                  marginTop: 8,
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 