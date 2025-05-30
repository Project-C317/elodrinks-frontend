import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicApi } from "../services/api";
import { FiLock, FiUnlock } from "react-icons/fi";
import { jwtDecode } from "jwt-decode";

type User = {
  id: number;
  name: string;
  surname: string;
  age: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
  createdAt: string;
};

function getInitialUsers(): User[] {
  const users = localStorage.getItem("users");
  if (users) return JSON.parse(users);
  const demoUsers: User[] = [
    {
      id: 1,
      name: "João",
      surname: "Silva",
      age: "30",
      cpf: "123.456.789-00",
      email: "joao@exemplo.com",
      phone: "(11) 91234-5678",
      password: "123456",
      createdAt: new Date().toISOString(),
    },
  ];
  localStorage.setItem("users", JSON.stringify(demoUsers));
  return demoUsers;
}

// CSS-in-JS string
const style = `
  /* Vídeo atrás */
  .video-bg {
    position: fixed; top: 0; left: 0;
    width: 100%; height: 100%;
    object-fit: cover; z-index: -1; opacity: 0.3;
  }

  /* Container do form com overlay escuro */
  .container {
    position: relative; z-index: 1;
    display: flex; justify-content: center; display: flex; justify-content: flex-end; align-items: center;
    min-height: 100vh; padding: 20px;
    padding-right: 3%;
    background: rgba(0,0,0,0.25);
  }

  /* Card glassmorphism */
  .form-container {
    position: relative; z-index: 2;
    width: 500px; max-width: 100%; padding: 40px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255,255,255,0.2);
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    backdrop-filter: blur(10px);
    transition: transform 0.3s ease;
  }
  .form-container:hover {
    transform: translateY(-4px);
  }

  .form-toggle {
    display: flex; position: relative; overflow: hidden;
    background: rgba(255,255,255,0.25); border-radius: 50px;
    margin-bottom: 30px;
  }
  .toggle-btn {
    flex: 1; padding: 12px 20px; text-align: center;
    background: none; border: none; cursor: pointer;
    font-weight: 600; color: #fff; transition: color 0.3s;
    position: relative; z-index: 2;
  }
  .toggle-btn.active { color: #101820; }
  .toggle-slider {
    position: absolute; top: 0; left: 0;
    width: 50%; height: 100%;
    background: rgba(224, 206, 170);
    border-radius: 50px; transition: transform 0.3s;
    z-index: 1;
  }
  .toggle-slider.signup { transform: translateX(100%); }

  .form-group { margin-bottom: 10px; position: relative; display: flex; justify-content: center;}
  .form-input {
    width: 100%; padding: 15px 20px;
    border: 1px solid rgba(255,255,255,0.4);
    border-radius: 12px; background: rgba(255,255,255,0.25);
    color: #fff; font-size: 16px; transition: border-color 0.3s;
  }
  .form-input::placeholder { color: rgba(255,255,255,0.7);}
  .form-input:focus {
    outline: none; border-color: #fff;
    box-shadow: 0 0 0 3px rgba(255,255,255,0.3);
  }

  .submit-btn {
    width: 100%; padding: 15px;
    background: rgba(224, 206, 170,0.5);
    color: #101820; border: 1px solid rgba(255,255,255,0.4);
    border-radius: 12px; font-size: 16px; font-weight: 600;
    cursor: pointer; transition: background 0.3s;
    margin-top: 10px;
  }
  .submit-btn:hover {
    background: rgba(255,255,255,0.7);
  }

  .forgot-password {
    text-align: center; margin-top: 20px;
  }
  .forgot-password a {
    color: #fff; text-decoration: none; font-size: 14px;
    transition: color 0.3s;
  }
  .forgot-password a:hover {
    color: rgba(255,255,255,0.9);
  }

  .form-section { display: none; animation: fadeIn 0.3s ease; }
  .form-section.active { display: block; }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .error-message, .success-message {
    padding: 10px 15px; border-radius: 8px; margin-bottom: 20px;
    font-size: 14px; display: none;
    background: rgba(255,255,255,0.3); color: #101820;
    border: 1px solid rgba(255,255,255,0.5);
  }

  .show-password {
    position: absolute; right: 15px; top: 50%;
    transform: translateY(-50%);
    background: none; border: none; color: #fff;
    cursor: pointer; font-size: 14px;
  }

  @media (max-width: 480px) {
    .form-container { padding: 30px 20px; width: auto; }
  }
`;

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupSurname, setSignupSurname] = useState("");
  const [signupAge, setSignupAge] = useState("");
  const [signupCpf, setSignupCpf] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupRole, setSignupRole] = useState("user"); // padrão: user
  const [users] = useState<User[]>(getInitialUsers);
  const navigate = useNavigate();

  const handleToggle = (login: boolean) => {
    setIsLogin(login);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleShowPassword = (field: string) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await publicApi.loginUser({
        Email: loginEmail,
        Password: loginPassword,
      });

      const { token } = response.data;

      // Salva o token no localStorage
      localStorage.setItem("token", token);

      // Decodifica o token para obter o role
      const decodedToken = jwtDecode<{ role: string }>(token);

      setErrorMessage("");

      setTimeout(() => {
        if (decodedToken.role === "admin") {
          navigate("/config");
        } else {
          navigate("/home");
        }
      }, 1500);
    } catch {
      setErrorMessage("Email ou senha incorretos!");
      setSuccessMessage("");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signupPassword !== signupConfirmPassword) {
      setErrorMessage("As senhas não coincidem!");
      return;
    }

    try {
      const newUser = {
        Name: signupName,
        Surname: signupSurname,
        Age: signupAge,
        Cpf: signupCpf,
        Email: signupEmail,
        Phone: signupPhone,
        Password: signupPassword,
        Role: signupRole,
      };

      await publicApi.registerUser(newUser);

      setSuccessMessage(
        "Conta criada com sucesso! Você pode fazer login agora."
      );
      setErrorMessage("");

      // Limpa os campos
      setSignupName("");
      setSignupSurname("");
      setSignupAge("");
      setSignupCpf("");
      setSignupEmail("");
      setSignupPhone("");
      setSignupPassword("");
      setSignupConfirmPassword("");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch {
      setErrorMessage(
        "Erro ao criar conta. Verifique os dados e tente novamente."
      );
      setSuccessMessage("");
    }
  };

  const handleForgotPassword = () => {
    const email = prompt("Digite seu email para recuperação de senha:");
    if (email) {
      const user = users.find((u) => u.email === email);
      if (user) {
        setSuccessMessage("Instruções de recuperação enviadas para seu email!");
        setErrorMessage("");
      } else {
        setErrorMessage("Email não encontrado!");
        setSuccessMessage("");
      }
    }
  };

  return (
    <>
      <style>{style}</style>

      {/* Vídeo full-screen atrás */}
      <video className="video-bg" autoPlay muted loop playsInline>
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>

      {/* Container com SVG ao lado do form */}
      <div className="container with-svg">
        {/* coluna do SVG */}
        <div className="svg-wrapper">
          <img src="/logoMaior.svg" alt="Logo Elo Drinks" />
        </div>

        {/* coluna do formulário */}
        <div className="form-container">
          <div className="form-toggle">
            <button
              className={`toggle-btn${isLogin ? " active" : ""}`}
              onClick={() => handleToggle(true)}
            >
              Login
            </button>
            <button
              className={`toggle-btn${!isLogin ? " active" : ""}`}
              onClick={() => handleToggle(false)}
            >
              Cadastrar
            </button>
            <div className={`toggle-slider${!isLogin ? " signup" : ""}`} />
          </div>

          <div
            className="success-message"
            style={{ display: successMessage ? "block" : "none" }}
          >
            {successMessage}
          </div>
          <div
            className="error-message"
            style={{ display: errorMessage ? "block" : "none" }}
          >
            {errorMessage}
          </div>

          {/* Login Form */}
          <div className={`form-section${isLogin ? " active" : ""}`}>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <input
                  type="email"
                  className="form-input"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type={showPassword.loginPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="Senha"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="show-password"
                  onClick={() => handleShowPassword("loginPassword")}
                >
                  {showPassword.loginPassword ? <FiUnlock /> : <FiLock />}
                </button>
              </div>
              <button type="submit" className="submit-btn">
                Entrar
              </button>
            </form>
            <div className="forgot-password">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleForgotPassword();
                }}
              >
                Esqueceu a senha?
              </a>
            </div>
          </div>

          {/* Signup Form */}
          <div className={`form-section${!isLogin ? " active" : ""}`}>
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Nome"
                  required
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Sobrenome"
                  required
                  value={signupSurname}
                  onChange={(e) => setSignupSurname(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Idade"
                  required
                  value={signupAge}
                  onChange={(e) => setSignupAge(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="CPF"
                  required
                  value={signupCpf}
                  onChange={(e) => setSignupCpf(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Telefone"
                  required
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-input"
                  placeholder="Email"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type={showPassword.signupPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="Senha"
                  required
                  minLength={6}
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="show-password"
                  onClick={() => handleShowPassword("signupPassword")}
                >
                  {showPassword.signupPassword ? <FiUnlock /> : <FiLock />}
                </button>
              </div>
              <div className="form-group">
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="Confirmar senha"
                  required
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="show-password"
                  onClick={() => handleShowPassword("confirmPassword")}
                >
                  {showPassword.confirmPassword ? <FiUnlock /> : <FiLock />}
                </button>
              </div>
              <div className="form-group">
                <select
                  className="form-input"
                  value={signupRole}
                  onChange={(e) => setSignupRole(e.target.value)}
                >
                  <option value="user">Usuário</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <button type="submit" className="submit-btn">
                Criar Conta
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
