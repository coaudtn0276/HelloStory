import { ArrowType } from "@/src/type/types";

const RightArrow = ({ color }: ArrowType) => {
  return (
    <svg width="25" height="43" viewBox="0 0 25 43" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.36538 0L0 3.58333L17.7885 21.5L0 39.4167L3.36538 43L25 21.5L3.36538 0Z" fill={color} />
    </svg>
  );
};

export default RightArrow;
