import { useEffect, useState } from "react";

import { IMAGE_PLACEHOLDER } from "../../utils/images";

const SafeImage = ({
  src,
  alt,
  className = "",
  fallback = IMAGE_PLACEHOLDER,
  loading = "lazy",
}) => {
  const [currentSrc, setCurrentSrc] = useState(
    src?.trim() || fallback
  );

  useEffect(() => {
    setCurrentSrc(src?.trim() || fallback);
  }, [src, fallback]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => {
        if (currentSrc !== fallback) {
          setCurrentSrc(fallback);
        }
      }}
    />
  );
};

export default SafeImage;
