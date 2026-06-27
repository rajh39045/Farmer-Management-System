import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import AuthHeader from "./AuthHeader";
import PasswordInput from "./PasswordInput";

import PrimaryButton from "../ui/PrimaryButton";

import useAuth from "../../hooks/useAuth";

const RegisterForm = () => {
  const { register } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "customer",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await register({
        name: form.name,
        email: form.email,
        phone: form.phone,
        role: form.role,
        password: form.password,
      });

      toast.success("Registration successful.");

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthHeader
        title="Create Account 🌱"
        subtitle="Join Krishi Market and buy or sell fresh farm products."
        linkText="Already have an account?"
        linkLabel="Login"
        linkTo="/login"
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Name */}

        <div>
          <label className="block mb-2 font-medium">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
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
            required
            placeholder="Enter your email"
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

        {/* Phone */}

        <div>
          <label className="block mb-2 font-medium">
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="Enter phone number"
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

        {/* Role */}

        <div>
          <label className="block mb-2 font-medium">
            Register As
          </label>

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
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
          >
            <option value="customer">
              Customer
            </option>

            <option value="farmer">
              Farmer
            </option>
          </select>
        </div>

        {/* Password */}

        <PasswordInput
          label="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
          showStrength
        />

        {/* Confirm Password */}

        <PasswordInput
          label="Confirm Password"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({
              ...form,
              confirmPassword: e.target.value,
            })
          }
        />

        <PrimaryButton
          type="submit"
          loading={loading}
          fullWidth
        >
          Create Account
        </PrimaryButton>
      </form>
    </>
  );
};

export default RegisterForm;