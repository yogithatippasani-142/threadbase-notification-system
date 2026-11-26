import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../context/NotificationContext.jsx";
import { apiClient } from "../api/apiClient.js";

export default function NotificationItem({ notification, onClose }) {
  const { dispatch } = useNotifications();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (id) => {
      return apiClient.patch(`/api/notifications/${id}/read`);
    },

    onMutate: (id) => {
      dispatch({ type: "MARK_READ", payload: id });
    },

    onError: async () => {
      try {
        const response = await apiClient.get("/api/notifications");

        dispatch({
          type: "LOAD_NOTIFICATIONS",
          payload: response.data,
        });
      } catch (error) {
        console.error("Failed to reload notifications", error);
      }
    },
  });

  function handleClick() {
    if (!notification.isRead) {
      mutation.mutate(notification.id);
    }

    onClose();

    if (notification.threadId) {
      navigate(`/threads/${notification.threadId}`);
    }
  }

  return (
    <div
      onClick={handleClick}
      style={{
        padding: "12px",
        borderBottom: "1px solid #eee",
        cursor: "pointer",
        background: notification.isRead ? "#fff" : "#eff6ff",
        display: "flex",
        gap: "10px",
        alignItems: "flex-start",
      }}
    >
      {!notification.isRead && (
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#2563eb",
            marginTop: "6px",
            flexShrink: 0,
          }}
        />
      )}

      <div>
        <p style={{ margin: "0 0 4px", fontWeight: "600" }}>
          {notification.title || "New notification"}
        </p>

        <p style={{ margin: 0, fontSize: "0.85rem", color: "#666" }}>
          {notification.message}
        </p>
      </div>
    </div>
  );
}