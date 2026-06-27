import LoadingSpinner from "../../components/ui/LoadingSpinner";
import PrimaryButton from "../../components/ui/PrimaryButton";

import NotificationCard from "../../components/notification/NotificationCard";

import useNotifications from "../../hooks/useNotifications";

const Notifications = () => {
  const {
    loading,
    notifications,
    readNotification,
    readAll,
    removeNotification,
  } = useNotifications();

  if (loading) {
    return (
      <LoadingSpinner
        fullScreen
        text="Loading Notifications..."
      />
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">

      <div className="max-w-5xl mx-auto px-4">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold">
            Notifications
          </h1>

          <PrimaryButton
            onClick={readAll}
          >
            Mark All Read
          </PrimaryButton>

        </div>

        <div className="space-y-5">

          {notifications.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-10 text-center">
              No notifications found.
            </div>
          ) : (
            notifications.map((notification) => (
              <NotificationCard
                key={notification._id}
                notification={notification}
                onRead={readNotification}
                onDelete={removeNotification}
              />
            ))
          )}

        </div>

      </div>

    </section>
  );
};

export default Notifications;