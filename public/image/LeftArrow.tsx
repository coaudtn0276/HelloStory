import { ArrowType } from "@/src/type/types";

const LeftArrow = ({ color }: ArrowType) => {
  return (
    <svg width="25" height="43" viewBox="0 0 25 43" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.6346 43L25 39.4167L7.21154 21.5L25 3.58334L21.6346 -2.94211e-07L1.87959e-06 21.5L21.6346 43Z" fill={color} />
    </svg>
  );
};

export default LeftArrow;
