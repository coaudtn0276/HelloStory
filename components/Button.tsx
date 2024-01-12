import { ButtonType } from "@/src/type/types";

const Button: React.FC<ButtonType> = ({ children, bg, px, textSize, textColor, handler }) => {
  return (
    <div className={`flex items-center font-b rounded-md cursor-pointer h-8 ${bg && bg} ${px && px} ${textSize && textSize} ${textColor && textColor}`} onClick={handler}>
      {children}
    </div>
  );
};

export default Button;
