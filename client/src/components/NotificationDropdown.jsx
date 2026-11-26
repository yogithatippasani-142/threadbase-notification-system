import { useNotifications } from "../context/NotificationContext.jsx";
import NotificationItem from "./NotificationItem.jsx";

export default function NotificationDropdown({ onClose }) {
  const { state, dispatch } = useNotifications();
  const notifications = state.notifications;

  function handleMarkAllRead() {
    dispatch({ type: "MARK_ALL_READ" });
  }

  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: "40px",
        width: "340px",
        maxHeight: "400px",
        overflowY: "auto",
        background: "#fff",
        color: "#111",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px",
          borderBottom: "1px solid #eee",
        }}
      >
        <strong>Notifications</strong>

        {state.unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            style={{
              background: "none",
              border: "none",
              color: "#2563eb",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <p style={{ padding: "16px", textAlign: "center", color: "#666" }}>
          No notifications yet.
        </p>
      ) : (
        notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClose={onClose}
          />
        ))
      )}
    </div>
  );
}