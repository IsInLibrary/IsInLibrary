import { urlMapper, mappingFunctions } from "../url/checker";
import type { BookStore } from "../url/checker";
import fc from "fast-check";

interface ITestingDatum {
  base: string;
  path: string;
  expect: BookStore;
}

describe("check urlMapper", () => {
  const bases = [
    "https://www.amazon.com",
    "https://www.aladin.co.kr",
    "https://ssl.yes24.com",
    "http://order.kyobobook.co.kr",
  ];
  const paths = [
    "/gp/cart/view.html?ref_=nav_cart",
    "/shop/wbasket.aspx",
    "/Cart/Cart",
    "/cart/cartListMain",
  ];

  const testingData: ITestingDatum[] = mappingFunctions.map((e, idx) => {
    return {
      base: bases[idx],
      path: paths[idx],
      expect: e.name,
    } as ITestingDatum;
  });

  testingData.forEach((e) => {
    test(`check ${e.expect} mapping exists`, () => {
      expect<BookStore | null>(urlMapper(e.base, e.path)).toEqual<BookStore>(
        e.expect
      );
    });
  });

  it("check another mapping not exists", () => {
    fc.assert(
      fc.property(fc.string(), fc.string(), (base, path) => {
        const url = base + path;
        let idx: number;
        if (
          (idx = testingData.findIndex((e) =>
            url.startsWith(e.base + e.path)
          )) !== -1
        ) {
          const e = testingData[idx];
          return urlMapper(e.base, e.path) === e.expect;
        }
        return true;
      })
    );
    expect<BookStore>(
      urlMapper("https://www.amazon.com", "/gp/cart/view.html?ref_=nav_cart")
    ).toEqual<BookStore>("Amazon");
  });
});
