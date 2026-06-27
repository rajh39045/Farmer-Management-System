const sizes = {
  sm: "w-5 h-5 border-2",
  md: "w-10 h-10 border-4",
  lg: "w-16 h-16 border-4",
};

const colors = {
  primary: "border-green-600 border-t-transparent",
  white: "border-white border-t-transparent",
  gray: "border-gray-400 border-t-transparent",
};

const LoadingSpinner = ({
  size = "md",
  color = "primary",
  text = "",
  fullScreen = false,
}) => {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`
          rounded-full
          animate-spin
          ${sizes[size]}
          ${colors[color]}
        `}
      />

      {text && (
        <p className="text-gray-600 font-medium">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className="
          fixed
          inset-0
          z-[9999]
          flex
          items-center
          justify-center
          bg-white/80
          backdrop-blur-sm
        "
      >
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;