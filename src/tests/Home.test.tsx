import { render, screen, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../src/pages/Home";

// mock do componente UserControl e ServiceList
jest.mock("../../src/pages/UserControl", () => () => null);
jest.mock("../../src/pages/ServiceList", () => () => null);

// mock do IntersectionObserver
let observerCallback: IntersectionObserverCallback;

beforeAll(() => {
  class IntersectionObserverMock {
    constructor(cb: IntersectionObserverCallback) {
      observerCallback = cb;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: IntersectionObserverMock,
  });

  Object.defineProperty(window, "requestAnimationFrame", {
    writable: true,
    configurable: true,
    value: (cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    },
  });
  Object.defineProperty(window, "cancelAnimationFrame", {
    writable: true,
    configurable: true,
    value: () => {},
  });
});

afterAll(() => {
  jest.useRealTimers();
});

// teste unitário -> banner rotativo
describe("Banner rotativo (useEffect + setInterval)", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    render(<Home />);
  });
  afterEach(() => {
    jest.clearAllTimers();
  });

  it("avança currentIndex 0→1→2→0 a cada 5 segundos", () => {
    const img1 = screen.getByRole("img", { name: /Banner 1/i });
    expect(img1).toHaveAttribute("src", "/images/banner1.jpg");

    act(() => jest.advanceTimersByTime(5000));
    const img2 = screen.getByRole("img", { name: /Banner 2/i });
    expect(img2).toHaveAttribute("src", "/images/banner2.jpg");

    act(() => jest.advanceTimersByTime(5000));
    const img3 = screen.getByRole("img", { name: /Banner 3/i });
    expect(img3).toHaveAttribute("src", "/images/banner3.jpg");

    act(() => jest.advanceTimersByTime(5000));
    const imgAgain = screen.getByRole("img", { name: /Banner 1/i });
    expect(imgAgain).toHaveAttribute("src", "/images/banner1.jpg");
  });
});

// teste unitário -> contador animado
describe("Count-up animado (IntersectionObserver)", () => {
  let counters: HTMLHeadingElement[];
  let section: HTMLElement;

  beforeEach(() => {
    render(<Home />);
    section = screen
      .getByText(/O SABOR DA ELEGÂNCIA EM CADA GOLE/i)
      .closest("section")!;
    counters = Array.from(
      section.querySelectorAll("h3[data-target]")
    ) as HTMLHeadingElement[];
  });

  it("altera os counters de '0' para algum valor maior que zero ao entrar na view", async () => {
    act(() => {
      observerCallback(
        [
          {
            isIntersecting: true,
            target: section,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRatio: 1,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: null,
            time: Date.now(),
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      );
    });

    await waitFor(() => {
      counters.forEach(h3 => {
        expect(h3.textContent).not.toBe("0");
      });
    });
  });

  it("reseta para '0' quando sai da view", async () => {
    act(() => {
      observerCallback(
        [
          {
            isIntersecting: true,
            target: section,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRatio: 1,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: null,
            time: Date.now(),
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      );
    });

    act(() => {
      observerCallback(
        [
          {
            isIntersecting: false,
            target: section,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRatio: 0,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: null,
            time: Date.now(),
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      );
    });

    await waitFor(() => {
      counters.forEach(h3 => {
        expect(h3.textContent).toBe("0");
      });
    });
  });
});
