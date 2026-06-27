import { useState } from "react";
import toast from "react-hot-toast";

import AuthHeader from "./AuthHeader";
import PrimaryButton from "../ui/PrimaryButton";

import { forgotPassword } from "../../api/authApi";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await forgotPassword({
        email,
      });

      toast.success(
        response.message ||
          "Password reset link sent successfully."
      );
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to send reset link."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthHeader
        title="Forgot Password?"
        subtitle="Enter your registered email address and we'll send you a password reset link."
        linkText="Remember your password?"
        linkLabel="Login"
        linkTo="/login"
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Email */}

        <div>
          <label className="block mb-2 font-medium">
            Email Address
          </label>

          <input
            type="email"
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter your registered email"
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              px-4
              py-3
              outline-none
              focus:border-green-500
              focus:ring-4
              focus:ring-green-200
            "
          />
        </div>

        <PrimaryButton
          type="submit"
          loading={loading}
          fullWidth
        >
          Send Reset Link
        </PrimaryButton>
      </form>
    </>
  );
};

export default ForgotPasswordForm;