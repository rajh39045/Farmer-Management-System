import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getMe,
  updateProfile,
  changePassword,
} from "../api/authApi";

const useProfile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getMe();
      const user = response?.user || response || {};

      setProfile({
        name: user?.fullName || user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load profile."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveProfile = async () => {
    try {
      setSaving(true);

      await updateProfile({
        ...profile,
        name: profile.name || "",
      });

      toast.success("Profile updated.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const updatePassword = async () => {
    if (
      passwords.newPassword !==
      passwords.confirmPassword
    ) {
      return toast.error(
        "Passwords do not match."
      );
    }

    try {
      setSaving(true);

      await changePassword(passwords);

      toast.success(
        "Password changed successfully."
      );

      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to change password."
      );
    } finally {
      setSaving(false);
    }
  };

  return {
    loading,
    saving,
    profile,
    passwords,
    handleChange,
    handlePasswordChange,
    saveProfile,
    updatePassword,
  };
};

export default useProfile;