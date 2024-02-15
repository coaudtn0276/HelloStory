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

export const findImgTag = (content: string) => {
  let parser = new DOMParser();
  let doc = parser.parseFromString(content, "text/html");
  let imgTags = doc.getElementsByTagName("img");

  return imgTags;
};

export const changeDate = (value: string) => {
  let date = new Date(value);

  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  let formattedDate = `${year}.${month}.${day}`;

  return formattedDate;
};
