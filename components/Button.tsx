import { ButtonType } from "@/src/type/types";

const Button: React.FC<ButtonType> = ({ children, bg, px, py, textSize, textColor, handler }) => {
  return (
    <div className={`font-b rounded-md ${bg && bg} ${px && px} ${py && py} ${textSize && textSize} ${textColor && textColor}`} onClick={handler}>
      {children}
    </div>
  );
};

export default Button;
