import React, { useState } from "react";

// Renders an <img>, but hides itself on load failure instead of showing a
// broken-image icon. This also protects html-to-image's toBlob() capture,
// which otherwise rejects with a raw error Event when it can't rasterize
// a broken image reference.
const SafeImage = ({ src, alt, className, style }) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return null;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setFailed(true)}
    />
  );
};

export default SafeImage;