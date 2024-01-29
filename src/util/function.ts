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

export const switchPostCategory = (category: string) => {
  switch (category) {
    case "게임":
      return "game";
    case "반려동물":
      return "pet";
    case "잡담":
      return "chat";
    case "맛집":
      return "restaurant";
  }
};
