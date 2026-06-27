import LoadingSpinner from "../../components/ui/LoadingSpinner";

import ProfileAvatar from "../../components/profile/ProfileAvatar";
import EditProfileForm from "../../components/profile/EditProfileForm";
import ChangePassword from "../../components/profile/ChangePassword";

import useProfile from "../../hooks/useProfile";

const Profile = () => {
  const {
    loading,
    saving,
    profile,
    passwords,
    handleChange,
    handlePasswordChange,
    saveProfile,
    updatePassword,
  } = useProfile();

  if (loading) {
    return (
      <LoadingSpinner
        fullScreen
        text="Loading Profile..."
      />
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">

      <div className="max-w-6xl mx-auto px-4">

        <div className="grid lg:grid-cols-3 gap-8">

          <div>

            <ProfileAvatar
              name={profile.name}
            />

          </div>

          <div className="lg:col-span-2 space-y-8">

            <EditProfileForm
              profile={profile}
              handleChange={handleChange}
              saveProfile={saveProfile}
              saving={saving}
            />

            <ChangePassword
              passwords={passwords}
              handlePasswordChange={
                handlePasswordChange
              }
              updatePassword={
                updatePassword
              }
              saving={saving}
            />

          </div>

        </div>

      </div>

    </section>
  );
};

export default Profile;