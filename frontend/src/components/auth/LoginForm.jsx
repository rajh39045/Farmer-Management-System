import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import AuthHeader from "./AuthHeader";
import PasswordInput from "./PasswordInput";

import PrimaryButton from "../ui/PrimaryButton";

import useAuth from "../../hooks/useAuth";

const LoginForm = () => {
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await login({
        email: form.email,
        password: form.password,
      });

      toast.success("Login successful.");

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthHeader
        title="Welcome Back 👋"
        subtitle="Login to continue shopping fresh products directly from farmers."
        linkText="Don't have an account?"
        linkLabel="Register"
        linkTo="/register"
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Email */}

        <div>

          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              px-4
              py-3
              outline-none
              focus:ring-4
              focus:ring-green-200
              focus:border-green-500
            "
          />

        </div>

        {/* Password */}

        <PasswordInput
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        {/* Remember */}

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
            />

            Remember Me

          </label>

          <Link
            to="/forgot-password"
            className="
              text-green-600
              hover:underline
            "
          >
            Forgot Password?
          </Link>

        </div>

        <PrimaryButton
          type="submit"
          loading={loading}
          fullWidth
        >
          Login
        </PrimaryButton>

      </form>
    </>
  );
};

export default LoginForm;