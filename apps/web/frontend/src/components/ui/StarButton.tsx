import { useState } from "react";

export const StarButton = () => {
  const [filled, setFilled] = useState(false);
  return (
    <button
      onClick={() => setFilled(!filled)}
      aria-label={filled ? "remove from library" : "add to library"}
    >
      {filled ? "★" : "☆"}
    </button>
  );
};
export default StarButton;
