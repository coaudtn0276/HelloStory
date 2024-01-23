export const switchCategory = (category: string) => {
  switch (category) {
    case "game":
      return "게임";
    case "pet":
      return "반려동물";
    case "chat":
      return "잡담";
    case "restaurant":
      return "맛집";
  }
};
