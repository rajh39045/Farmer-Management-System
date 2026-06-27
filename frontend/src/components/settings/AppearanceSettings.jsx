const AppearanceSettings = ({
  settings,
  handleChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-xl font-bold mb-6">
        Appearance
      </h2>

      <label className="flex justify-between">

        <span>Dark Mode</span>

        <input
          type="checkbox"
          checked={settings.darkMode}
          onChange={(e) =>
            handleChange(
              "darkMode",
              e.target.checked
            )
          }
        />

      </label>

    </div>
  );
};

export default AppearanceSettings;