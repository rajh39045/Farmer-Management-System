import LoadingSpinner from "../../components/ui/LoadingSpinner";
import PrimaryButton from "../../components/ui/PrimaryButton";

import AccountSettings from "../../components/settings/AccountSettings";
import AppearanceSettings from "../../components/settings/AppearanceSettings";
import DangerZone from "../../components/settings/DangerZone";

import useSettings from "../../hooks/useSettings";

const Settings = () => {
  const {
    loading,
    saving,
    settings,
    handleChange,
    save,
  } = useSettings();

  if (loading) {
    return (
      <LoadingSpinner
        fullScreen
      />
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">

      <div className="max-w-5xl mx-auto px-4">

        <h1 className="text-4xl font-bold mb-8">
          Settings
        </h1>

        <div className="space-y-8">

          <AccountSettings
            settings={settings}
            handleChange={handleChange}
          />

          <AppearanceSettings
            settings={settings}
            handleChange={handleChange}
          />

          <PrimaryButton
            loading={saving}
            onClick={save}
          >
            Save Settings
          </PrimaryButton>

          <DangerZone />

        </div>

      </div>

    </section>
  );
};

export default Settings;