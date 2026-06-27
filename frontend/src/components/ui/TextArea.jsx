const TextArea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false,
  className = "",
}) => {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
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
  );
};

export default TextArea;
