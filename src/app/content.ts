import { urlMapper, BookStore } from "../url/checker";

const main = async () => {
  let mapping: BookStore | null = urlMapper();

  if (!mapping) {
    return;
  }

  const message = `Your tab is in ${mapping} bookstore cart page!`;
  console.log(message);
};

main();
