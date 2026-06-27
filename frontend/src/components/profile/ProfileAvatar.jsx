const ProfileAvatar = ({
  name,
}) => {
  const initials = name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="flex flex-col items-center">

      <div
        className="
          w-32
          h-32
          rounded-full
          bg-green-600
          text-white
          text-4xl
          font-bold
          flex
          items-center
          justify-center
        "
      >
        {initials}
      </div>

      <h2 className="mt-5 text-2xl font-bold">
        {name}
      </h2>

    </div>
  );
};

export default ProfileAvatar;