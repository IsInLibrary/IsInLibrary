export type BookStore = "Amazon" | "Aladin" | "Yes24" | "Kyobo";

export interface IMappingElement {
  predicate: URLFinder;
  name: BookStore;
}

export type URLFinder = (base: string, path: string) => boolean;

const checkRegex = (re: RegExp, href: string) => re.test(href);

const isInAmazonCart: URLFinder = (base: string, path: string) =>
  checkRegex(
    /^https?:\/\/www.amazon.com\/gp\/cart\/view.html[?]ref_=nav_cart/,
    base + path
  );

const isInAladinCart: URLFinder = (base: string, path: string) =>
  checkRegex(/^https?:\/\/www.aladin.co.kr\/shop\/wbasket.aspx/, base + path);

const isInYes24Cart: URLFinder = (base: string, path: string) =>
  checkRegex(/^https?:\/\/ssl.yes24.com\/Cart\/Cart/, base + path);

const isInKyoboCart: URLFinder = (base: string, path: string) =>
  checkRegex(
    /^https?:\/\/order.kyobobook.co.kr\/cart\/cartListMain/,
    base + path
  );

export const mappingFunctions: IMappingElement[] = [
  {
    predicate: isInAmazonCart,
    name: "Amazon",
  },
  {
    predicate: isInAladinCart,
    name: "Aladin",
  },
  {
    predicate: isInYes24Cart,
    name: "Yes24",
  },
  {
    predicate: isInKyoboCart,
    name: "Kyobo",
  },
];

export const urlMapper = (
  base = window.location.origin,
  path = window.location.pathname
): BookStore | null => {
  return mappingFunctions
    .map((e) => e.name)
    .reduce((prev, elem, idx) => {
      const predicate = mappingFunctions[idx].predicate;
      if (!prev && predicate(base, path)) {
        return elem;
      }
      return prev;
    }, null);
};
