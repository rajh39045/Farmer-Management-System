import PrimaryButton from "../ui/PrimaryButton";

const ChangePassword = ({
  passwords,
  handlePasswordChange,
  updatePassword,
  saving,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Change Password
      </h2>

      <div className="space-y-5">

        <input
          type="password"
          className="input"
          name="currentPassword"
          placeholder="Current Password"
          value={passwords.currentPassword}
          onChange={handlePasswordChange}
        />

        <input
          type="password"
          className="input"
          name="newPassword"
          placeholder="New Password"
          value={passwords.newPassword}
          onChange={handlePasswordChange}
        />

        <input
          type="password"
          className="input"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={passwords.confirmPassword}
          onChange={handlePasswordChange}
        />

      </div>

      <PrimaryButton
        loading={saving}
        onClick={updatePassword}
        className="mt-6"
      >
        Update Password
      </PrimaryButton>

    </div>
  );
};

export default ChangePassword;