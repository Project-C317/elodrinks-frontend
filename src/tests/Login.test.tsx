import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Login from "../pages/Login";
import { publicApi } from "../services/api";

// Mocks
jest.mock("../services/api", () => ({
  publicApi: {
    loginUser: jest.fn(() =>
      Promise.resolve({ data: { token: "fake-token" } })
    ),
    registerUser: jest.fn(() => Promise.resolve()),
  },
}));

jest.mock("jwt-decode", () => jest.fn(() => ({ role: "user" })));

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe("Login component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  });

  test("renderiza campos de login e botão", () => {
    const loginForm = screen.getByTestId("login-form");
    const formUtils = within(loginForm);

    expect(formUtils.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(formUtils.getByPlaceholderText(/senha/i)).toBeInTheDocument();
    expect(
      formUtils.getByRole("button", { name: /entrar/i })
    ).toBeInTheDocument();
  });

  test("permite preencher os campos de email e senha", () => {
    const loginForm = screen.getByTestId("login-form");
    const formUtils = within(loginForm);

    const emailInput = formUtils.getByTestId("login-email");
    const senhaInput = formUtils.getByTestId("login-password");

    fireEvent.change(emailInput, { target: { value: "teste@teste.com" } });
    fireEvent.change(senhaInput, { target: { value: "123456" } });

    expect(emailInput).toHaveValue("teste@teste.com");
    expect(senhaInput).toHaveValue("123456");
  });

  test("alterna visibilidade da senha ao clicar no botão de mostrar senha", () => {
    const senhaInput = screen.getByTestId("login-password");
    const toggleButton = screen.getByTestId("toggle-password-visibility");

    expect(senhaInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);
    expect(senhaInput).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton);
    expect(senhaInput).toHaveAttribute("type", "password");
  });

  test("exibe 'Carregando...' ao enviar o formulário de login", async () => {
    const emailInput = screen.getByTestId("login-email");
    const senhaInput = screen.getByTestId("login-password");
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: "teste@front.com" } });
    fireEvent.change(senhaInput, { target: { value: "123456" } });

    fireEvent.click(submitButton);

    const botaoCarregando = await screen.findByRole("button", {
      name: /carregando/i,
    });
    expect(botaoCarregando).toBeInTheDocument();
  });
});

describe("Signup form", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    // Alterado para clicar no botão toggle correto que ativa o formulário de signup
    fireEvent.click(screen.getByTestId("toggle-signup"));
  });

  test("renderiza todos os campos de cadastro", () => {
    expect(screen.getByTestId("signup-name-input")).toBeInTheDocument();
    expect(screen.getByTestId("signup-surname")).toBeInTheDocument();
    expect(screen.getByTestId("signup-age")).toBeInTheDocument();
    expect(screen.getByTestId("signup-cpf")).toBeInTheDocument();
    expect(screen.getByTestId("signup-phone")).toBeInTheDocument();
    expect(screen.getByTestId("signup-email")).toBeInTheDocument();
    expect(screen.getByTestId("signup-password")).toBeInTheDocument();
    expect(screen.getByTestId("signup-confirm-password")).toBeInTheDocument();
    expect(screen.getByTestId("signup-role")).toBeInTheDocument();
    expect(screen.getByTestId("signup-submit-btn")).toBeInTheDocument();
  });

  test("permite preencher todos os campos", () => {
    fireEvent.change(screen.getByTestId("signup-name-input"), {
      target: { value: "Maria" },
    });
    fireEvent.change(screen.getByTestId("signup-surname"), {
      target: { value: "Silva" },
    });
    fireEvent.change(screen.getByTestId("signup-age"), {
      target: { value: "25" },
    });
    fireEvent.change(screen.getByTestId("signup-cpf"), {
      target: { value: "111.222.333-44" },
    });
    fireEvent.change(screen.getByTestId("signup-phone"), {
      target: { value: "(11) 98765-4321" },
    });
    fireEvent.change(screen.getByTestId("signup-email"), {
      target: { value: "maria@teste.com" },
    });
    fireEvent.change(screen.getByTestId("signup-password"), {
      target: { value: "senha123" },
    });
    fireEvent.change(screen.getByTestId("signup-confirm-password"), {
      target: { value: "senha123" },
    });
    fireEvent.change(screen.getByTestId("signup-role"), {
      target: { value: "admin" },
    });

    expect(screen.getByTestId("signup-name-input")).toHaveValue("Maria");
    expect(screen.getByTestId("signup-surname")).toHaveValue("Silva");
    expect(screen.getByTestId("signup-age")).toHaveValue("25");
    expect(screen.getByTestId("signup-cpf")).toHaveValue("111.222.333-44");
    expect(screen.getByTestId("signup-phone")).toHaveValue("(11) 98765-4321");
    expect(screen.getByTestId("signup-email")).toHaveValue("maria@teste.com");
    expect(screen.getByTestId("signup-password")).toHaveValue("senha123");
    expect(screen.getByTestId("signup-confirm-password")).toHaveValue(
      "senha123"
    );
    expect(screen.getByTestId("signup-role")).toHaveValue("admin");
  });

  test("exibe mensagem de erro quando as senhas não coincidem", async () => {
    // Formulário já renderizado e toggle clicado no beforeEach
    const signupForm = screen.getByTestId("signup-form");

    fireEvent.change(within(signupForm).getByTestId("signup-name-input"), {
      target: { value: "João" },
    });
    fireEvent.change(within(signupForm).getByTestId("signup-surname"), {
      target: { value: "Silva" },
    });
    fireEvent.change(within(signupForm).getByTestId("signup-age"), {
      target: { value: "25" },
    });
    fireEvent.change(within(signupForm).getByTestId("signup-cpf"), {
      target: { value: "123.456.789-00" },
    });
    fireEvent.change(within(signupForm).getByTestId("signup-phone"), {
      target: { value: "11999999999" },
    });
    fireEvent.change(within(signupForm).getByTestId("signup-email"), {
      target: { value: "joao@email.com" },
    });
    fireEvent.change(within(signupForm).getByTestId("signup-password"), {
      target: { value: "senha123" },
    });
    fireEvent.change(
      within(signupForm).getByTestId("signup-confirm-password"),
      {
        target: { value: "diferente123" },
      }
    );

    fireEvent.click(within(signupForm).getByTestId("signup-submit-btn"));

    expect(
      await screen.findByText("As senhas não coincidem!")
    ).toBeInTheDocument();
  });

  test("chama registerUser ao enviar dados válidos", async () => {
    fireEvent.change(screen.getByTestId("signup-name-input"), {
      target: { value: "Maria" },
    });
    fireEvent.change(screen.getByTestId("signup-surname"), {
      target: { value: "Silva" },
    });
    fireEvent.change(screen.getByTestId("signup-age"), {
      target: { value: "25" },
    });
    fireEvent.change(screen.getByTestId("signup-cpf"), {
      target: { value: "111.222.333-44" },
    });
    fireEvent.change(screen.getByTestId("signup-phone"), {
      target: { value: "(11) 98765-4321" },
    });
    fireEvent.change(screen.getByTestId("signup-email"), {
      target: { value: "maria@teste.com" },
    });
    fireEvent.change(screen.getByTestId("signup-password"), {
      target: { value: "senha123" },
    });
    fireEvent.change(screen.getByTestId("signup-confirm-password"), {
      target: { value: "senha123" },
    });
    fireEvent.change(screen.getByTestId("signup-role"), {
      target: { value: "admin" },
    });

    fireEvent.click(screen.getByTestId("signup-submit-btn"));

    await waitFor(() => {
      expect(publicApi.registerUser).toHaveBeenCalledTimes(1);
      expect(publicApi.registerUser).toHaveBeenCalledWith(
        expect.objectContaining({
          Name: "Maria",
          Surname: "Silva",
          Age: "25",
          Cpf: "111.222.333-44",
          Phone: "(11) 98765-4321",
          Email: "maria@teste.com",
          Password: "senha123",
          Role: "admin",
        })
      );
    });
  });
});
