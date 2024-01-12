export type ButtonType = {
  children: React.ReactNode;
  bg: string;
  px: string;
  py?: string;
  textSize: string;
  textColor: string;
  handler?: () => void;
};

export type ArrowPropsTyps = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};
