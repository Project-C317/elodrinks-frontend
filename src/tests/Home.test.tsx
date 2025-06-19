import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Home from "../../src/pages/Home";

// mock do componente UserControl e ServiceList
jest.mock("../../src/pages/UserControl", () => () => null);
jest.mock("../../src/pages/ServiceList", () => () => null);

// mock do IntersectionObserver
beforeAll(() => {
  class IntersectionObserverMock {
    constructor(_cb: IntersectionObserverCallback) {
      // não precisa armazenar o callback se não usar
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

describe("Banner rotativo (useEffect + setInterval)", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    // Ajuda a ver o que está renderizado
    screen.debug();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("avança currentIndex 0→1→2→0 a cada 5 segundos + 300ms de fade", () => {
    // Usar getByAltText pois o getByRole pode falhar se imagem estiver oculta temporariamente
    expect(screen.getByAltText(/Banner 1/i)).toBeInTheDocument();

    // Avança 5 segundos (início do fade-out)
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Pode ser necessário aguardar a re-renderização após o timeout interno do fade
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(screen.getByAltText(/Banner 2/i)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(5000 + 300);
    });

    expect(screen.getByAltText(/Banner 3/i)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(5000 + 300);
    });

    expect(screen.getByAltText(/Banner 1/i)).toBeInTheDocument();
  });
});
