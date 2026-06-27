import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthHeader from "./AuthHeader";
import PasswordInput from "./PasswordInput";
import PrimaryButton from "../ui/PrimaryButton";

import { resetPassword } from "../../api/authApi";

const ResetPasswordForm = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await resetPassword(token, { password });

      toast.success("Password reset successfully.");

      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthHeader
        title="Reset Password"
        subtitle="Enter your new password below."
        linkText="Back to"
        linkLabel="Login"
        linkTo="/login"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="New Password"
        />

        <PasswordInput
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          label="Confirm Password"
        />

        <PrimaryButton
          type="submit"
          loading={loading}
          fullWidth
        >
          Reset Password
        </PrimaryButton>
      </form>
    </>
  );
};

export default ResetPasswordForm;
