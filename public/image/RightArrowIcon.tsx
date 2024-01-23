import { ArrowType } from "@/src/type/types";

const RightArrowIcon = ({ color }: ArrowType) => {
  return (
    <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 15V0L13 7.5L0 15Z" fill={color} />
    </svg>
  );
};

export default RightArrowIcon;
