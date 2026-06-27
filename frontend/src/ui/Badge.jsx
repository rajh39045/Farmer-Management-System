const variants = {
  success:
    "bg-green-100 text-green-700 border border-green-200",

  warning:
    "bg-yellow-100 text-yellow-700 border border-yellow-200",

  error:
    "bg-red-100 text-red-700 border border-red-200",

  info:
    "bg-blue-100 text-blue-700 border border-blue-200",

  primary:
    "bg-emerald-100 text-emerald-700 border border-emerald-200",

  secondary:
    "bg-gray-100 text-gray-700 border border-gray-200",
};

const sizes = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
  lg: "px-4 py-2 text-base",
};

const Badge = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
}) => {
  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        rounded-full
        font-medium
        whitespace-nowrap
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;