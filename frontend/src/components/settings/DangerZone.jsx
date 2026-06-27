import { logoutUser } from "../../api/authApi";

import PrimaryButton from "../ui/PrimaryButton";

const DangerZone = () => {
  const logout = async () => {
    await logoutUser();

    localStorage.clear();

    window.location.href = "/login";
  };

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6">

      <h2 className="text-xl font-bold text-red-600">
        Danger Zone
      </h2>

      <p className="mt-3 text-gray-600">
        Logout from your account.
      </p>

      <PrimaryButton
        className="mt-6"
        onClick={logout}
      >
        Logout
      </PrimaryButton>

    </div>
  );
};

export default DangerZone;