import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  FaEye,
  FaEyeSlash,
} from "../../utils/icons";

import { fadeUp } from "../../animations/framerVariants";

const PasswordInput = ({
  label = "Password",
  value,
  onChange,
  placeholder = "Enter password",
  error = "",
  required = false,
  showStrength = false,
}) => {
  const [showPassword, setShowPassword] =
    useState(false);

  const strength = useMemo(() => {
    if (!showStrength) return null;

    let score = 0;

    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    if (score <= 1)
      return {
        label: "Weak",
        color: "bg-red-500",
        width: "25%",
      };

    if (score === 2)
      return {
        label: "Medium",
        color: "bg-yellow-500",
        width: "50%",
      };

    if (score === 3)
      return {
        label: "Strong",
        color: "bg-green-500",
        width: "75%",
      };

    return {
      label: "Very Strong",
      color: "bg-emerald-600",
      width: "100%",
    };
  }, [value, showStrength]);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="space-y-2"
    >
      <label className="font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">

        <input
          type={
            showPassword
              ? "text"
              : "password"
          }
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`
            w-full
            rounded-xl
            border
            px-4
            py-3
            pr-14
            outline-none
            transition-all

            ${
              error
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-green-500 focus:ring-4 focus:ring-green-200"
            }
          `}
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword(
              !showPassword
            )
          }
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-gray-500
            hover:text-green-600
          "
        >
          {showPassword ? (
            <FaEyeSlash />
          ) : (
            <FaEye />
          )}
        </button>

      </div>

      {showStrength &&
        value.length > 0 &&
        strength && (
          <>

            <div
              className="
                h-2
                bg-gray-200
                rounded-full
                overflow-hidden
              "
            >
              <div
                className={`
                  h-full
                  transition-all
                  ${strength.color}
                `}
                style={{
                  width: strength.width,
                }}
              />
            </div>

            <p
              className="
                text-sm
                text-gray-600
              "
            >
              Password Strength:
              <span className="font-semibold">
                {" "}
                {strength.label}
              </span>
            </p>

          </>
        )}

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </motion.div>
  );
};

export default PasswordInput;