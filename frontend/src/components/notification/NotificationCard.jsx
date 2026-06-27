import { FaTrash } from "../../utils/icons";

const NotificationCard = ({
  notification,
  onRead,
  onDelete,
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-md p-5 border-l-4 ${
        notification.read
          ? "border-gray-300"
          : "border-green-500"
      }`}
    >
      <div className="flex justify-between items-start">

        <div>

          <h3 className="font-semibold">
            {notification.title}
          </h3>

          <p className="text-gray-600 mt-2">
            {notification.message}
          </p>

          <p className="text-xs text-gray-400 mt-3">
            {new Date(
              notification.createdAt
            ).toLocaleString()}
          </p>

        </div>

        <button
          onClick={() =>
            onDelete(notification._id)
          }
          className="text-red-500"
        >
          <FaTrash />
        </button>

      </div>

      {!notification.read && (
        <button
          onClick={() =>
            onRead(notification._id)
          }
          className="text-green-600 mt-4"
        >
          Mark as Read
        </button>
      )}
    </div>
  );
};

export default NotificationCard;