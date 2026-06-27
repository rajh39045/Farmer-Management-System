import PrimaryButton from "../ui/PrimaryButton";

const EditProfileForm = ({
  profile,
  handleChange,
  saveProfile,
  saving,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Personal Information
      </h2>

      <div className="space-y-5">

        <input
          className="input"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Full Name"
        />

        <input
          className="input"
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          className="input"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          placeholder="Phone"
        />

      </div>

      <PrimaryButton
        loading={saving}
        onClick={saveProfile}
        className="mt-6"
      >
        Save Changes
      </PrimaryButton>

    </div>
  );
};

export default EditProfileForm;