const AccountSettings = ({
  settings,
  handleChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-xl font-bold mb-6">
        Account
      </h2>

      <div className="space-y-5">

        <label className="flex justify-between">

          <span>Email Notifications</span>

          <input
            type="checkbox"
            checked={
              settings.emailNotifications
            }
            onChange={(e) =>
              handleChange(
                "emailNotifications",
                e.target.checked
              )
            }
          />

        </label>

        <label className="flex justify-between">

          <span>Push Notifications</span>

          <input
            type="checkbox"
            checked={
              settings.pushNotifications
            }
            onChange={(e) =>
              handleChange(
                "pushNotifications",
                e.target.checked
              )
            }
          />

        </label>

      </div>

    </div>
  );
};

export default AccountSettings;