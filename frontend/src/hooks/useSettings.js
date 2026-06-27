import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getSettings,
  updateSettings,
} from "../api/settingsApi";

const defaultSettings = {
  darkMode: false,
  emailNotifications: true,
  pushNotifications: true,
  language: "English",
};

const useSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] =
    useState(defaultSettings);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);

      const response =
        await getSettings();

      setSettings(
        response.settings ||
          defaultSettings
      );
    } catch {
      setSettings(defaultSettings);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleChange = (
    name,
    value
  ) => {
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const save = async () => {
    try {
      setSaving(true);

      await updateSettings(settings);

      toast.success(
        "Settings updated."
      );
    } catch {
      toast.error(
        "Unable to update settings."
      );
    } finally {
      setSaving(false);
    }
  };

  return {
    loading,
    saving,
    settings,
    handleChange,
    save,
  };
};

export default useSettings;